require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const auth = req.headers?.authorization;
    if (!auth || auth.split(' ').length < 2) {
        return res.status(403).send('UNAUTH');
    }
    const token = auth.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    } catch (e) {
        return res.status(403).send('UNAUTH');
    }
}