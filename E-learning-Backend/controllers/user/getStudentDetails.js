const getStudentDetails = (req, res) => {
  try {
    const { fullName, email, phoneNumber, discordId, coins, rank, badge } =
      req.user;
    res.status(200).json({
      fullName,
      email,
      phoneNumber,
      discordId,
      coins,
      rank,
      badge,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = getStudentDetails;
