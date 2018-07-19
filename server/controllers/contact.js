const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

const configs = require('../configs')

const User = require('../models/User')

class ContactController {
    async getList (ctx) {
        const contacts = await User.findOne(id)
        ctx.body = contacts
        ctx.status = 200
    }
    async search (ctx) {
        const {key} = ctx.request.body
        const res = await User.find({username: key})
        ctx.body = {
            code: 0,
            flag: 0,
            data: res ? res : null,
            message: res ? `搜索到${res.length}位好友` : '未搜索到任何好友'
        }
        ctx.status = 200
    }
    async add (ctx) {
        const {_id} = ctx.request.body
        const contact = await User.findOne({_id})
        if (contact) {
            const token = ctx.header.authorization
            const payload = await verify(token.split(' ')[1], configs.secret)  // // 解密，获取payload
            const {username} = payload
            const me = await User.findOne({username})
            const isExist = await me.contacts.some(item => item._id == _id)
            if (isExist) {
                ctx.body = {
                    code: 0,
                    flag: 1,
                    message: '该好友已存在'
                }
                ctx.status = 200
            } else {
                await User.findOneAndUpdate({username}, {$push: {contacts: {
                    _id: contact._id,
                    name: contact.name,
                    icon: contact.icon
                }}})
                const res = await User.findOne({username})
                ctx.body = {
                    code: 0,
                    flag: 0,
                    data: res.contacts,
                    message: '添加好友成功'
                }
                ctx.status = 200
            }
        } else {
            ctx.body = {
                code: 1,
                flag: 1,
                message: '参数错误'
            }
            ctx.status = 401
        }
    }
}

module.exports = new ContactController