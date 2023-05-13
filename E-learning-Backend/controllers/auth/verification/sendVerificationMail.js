const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Token = require('../../../models/tokenSchema');

const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    OAUTH_PLAYGROUND
);

const generateAndSaveToken = async (userId) => {
    try {
        const token = await new Token({
            userId: userId,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        return token;
    } catch(err) {
        throw err;
    }
};

const generateAndSendMail = async (verificationToken, userId, userEmail) => {
    try {
        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
        });
        const accessToken = oauth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: process.env.ADMIN_EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const verificationLink = `${process.env.CLIENT_URL}/verification/email/confirm?id=${userId}&token=${verificationToken}`;
        const text = `Welcome to E-Learning. We are happy to have you on this amazing journey. Please verify your email by clicking this link: ${verificationLink}`;
        const mailOptions = {
            from: {
                name: "E-Learning",
                address: process.env.ADMIN_EMAIL
            },
            to: userEmail,
            subject: "E-Learning: Email Verification",
            text: text,
        };
        await transporter.sendMail(mailOptions);
    } catch (err) {
        throw err;
    }
}

const sendVerificationMail = async (req, res) => {
    try {
        const { _id: userId, email: userEmail } = req.user;
        const generatedToken = await generateAndSaveToken(userId);
        await generateAndSendMail(generatedToken.token, userId, userEmail);
        res.status(200).json({
            success: true,
            message: 'Verification mail sent successfully'
        });
    } catch (err) {
        res.status(500).send(err);
    }
}   

module.exports = sendVerificationMail;