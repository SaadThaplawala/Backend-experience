const jwt = require('jsonwebtoken');




async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    try {
        if (!token) {
            return res.status(401).json({ message: 'Access Denied. Token missing.' });
        }

        jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token.' });
    }

    const userExists = await models.Users.findOne({
        where: { id: userId }, include: [{
            model: models.Logins,
            attribute: ['email'],
            as: 'Login'
        }]
    });

    if (userExists && userExists.Login.email === token.email) {
        req.headers.userId = userExists.dataValues.id;
    };
    next();

}

module.exports(authenticateToken);