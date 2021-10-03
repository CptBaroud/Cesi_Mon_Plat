let jwt = require('jsonwebtoken');

module.exports = {
    generatedToken: function (data) {
        return jwt.sign({
            mail: data.email,
            id: data.id,
            role: data.role,
            createdAt: new Date()
        }, process.env.JWT_SECRET_SIGN, {
            expiresIn: '365d'
        })
    }
};
