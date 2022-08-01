require('dotenv').config()

var jwt = require('jsonwebtoken');
const JWT_Sec = process.env.JWT_Sec

const verify = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        data = jwt.verify(token, JWT_Sec);
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = verify;