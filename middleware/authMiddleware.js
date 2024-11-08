const jwt = require('jsonwebtoken')
const print = require('../utils/utilFuncs')
const User = require('../models/User')


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

// check the current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if(token) {
        jwt.verify(token, process.env.JWTsecretPrivateKey, async (err, decodedToken) => {
            if(err) {
                print(err.message)
                res.locals.user = null
                next()
            } else {
                print(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }    
        })
    } else {
        res.locals.user = null
        next()
    } 
}

module.exports = { requireAuth, checkUser }