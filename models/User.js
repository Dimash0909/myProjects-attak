const mongoose = require('mongoose')
const { isEmail } = require('validator')

const print = (...vals) => {
    console.log(...vals)
} 

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
        minlength: [6, 'Minimum password length s 6 characters']
    }
})

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) { // post here is not related to POST request, the function operates after 'save'
    console.log('new user was created & saved', doc)
    next()
}) 

// fire a function before doc saved to db
userSchema.pre('save', function (next) {
    print('user about to be created & saved', this)
    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User