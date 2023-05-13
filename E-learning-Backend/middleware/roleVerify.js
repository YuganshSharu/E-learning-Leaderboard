const roleVerify = (rolesToBeSelected) => {
    return (req, res, next) => {
        const role = req.user.__t;
        // console.log(role);
        // console.log(rolesToBeSelected);
        if(rolesToBeSelected.includes(role)) {
            next();
        } else {
            res.status(400).json({
                success: false,
                name: 'UnauthorizedAccess',
                message: 'Role not authorised'
            });
        }
    }
}

module.exports = roleVerify;