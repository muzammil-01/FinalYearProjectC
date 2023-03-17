var jwt = require('jsonwebtoken')
const JWT_SECRET = "Mynameismuzammil"

const fetchuser = (req, res, next) => {
    console.log("-----------------",req.body)
    const token = req.headers['auth-token']
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid tokens" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user

    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    next();
}

module.exports = fetchuser