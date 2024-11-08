const jwt = require('jsonwebtoken')
const print = require('../utils/utilFuncs')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    
    // check whether json web token exists & is verified
    if(token) {
        jwt.verify(token, process.env.JWTsecretPrivateKey, (err, decodedToken) => {
            if(err) {
                print(err.message)
                res.redirect('/login')
            } else {
                print(decodedToken)
                next()
            }    
        })
    } else {
        res.redirect('/login')
    }
}

module.exports = { requireAuth }