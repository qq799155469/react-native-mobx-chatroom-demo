const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    from: {
        userId: {
            required: true,
            type: String
        },
        icon: {
            type: String
        },
        name: {
            required: true,
            type: String
        }
    },
    to: {
        userId: {
            required: true,
            type: String
        },
        icon: {
            type: String
        },
        name: {
            required: true,
            type: String
        }
    },
    createTime: {
        type: String,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    content: {
        required: true,
        type: String
    }
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message