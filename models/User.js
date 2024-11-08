const mongoose = require('mongoose')
const { isEmail } = require('validator')
const print = require('../utils/utilFuncs')
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({  // defines the structure
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) { // post here is not related to POST request, the function operates after 'save'
    console.log('new user was created & saved', doc)
    next()
}) 

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    print('user about to be created & saved', this)
    const salt = await bcryptjs.genSalt()
    this.password = await bcryptjs.hash(this.password, salt)
    next()
})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if(user) {
        const auth = await bcryptjs.compare(password, user.password)
        if(auth) {
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema)

module.exports = User