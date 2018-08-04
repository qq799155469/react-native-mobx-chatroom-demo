const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    sex: {
        type: Number
    },
    online: {
        type: Boolean
    },
    icon: {
        type: String
    },
    contacts: {
        type: Array
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User