const mongoose = require('mongoose')
const schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new schema({
  username: String,
  email: String,
  password: String,
  bio: String

})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User