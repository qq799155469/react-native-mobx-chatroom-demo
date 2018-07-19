const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

const configs = require('../configs')

const Message = require('../models/Message')

class MessageController {
    async add (ctx) {
        const result = await Message(ctx.request.body).save()
        ctx.body = Object.assign({
            code: 0,
            flag: 0,
            data: result,
            message: '消息发送成功'
        })
        ctx.status = 200
    }
    async history (ctx) {
        const {toId, fromId} = ctx.request.body
        let res1 = await Message.find({"to._id": toId, "from._id": fromId})
        let res2 = await Message.find({"to._id": fromId, "from._id": toId})
        let sortNum = (a, b) => {
            return a.createTime - b.createTime
        }
        const res = res1.concat(res2).sort(sortNum)
        ctx.body = {
            code: 0,
            flag: 0,
            data: res,
            message: '获取消息历史成功'
        }
        ctx.status = 200
    }
    async getList (ctx) {
        const token = ctx.header.authorization
        const payload = await verify(token.split(' ')[1], configs.secret)  // // 解密，获取payload
        const {_id} = payload
        const res1 = await Message.find({'from._id': _id})
        const res2 = await Message.find({'to._id': _id})
        let sortNum = (a, b) => {
            return a.createTime - b.createTime
        }
        const res = res1.concat(res2).sort(sortNum).reverse()
        let list = []
        for (let val in res) {
            if (list.some(item => (item.from._id == res[val].from._id && item.to._id == res[val].to._id) || (item.from._id == res[val].to._id && item.to._id == res[val].from._id))) {
                continue
            } else {
                list.push(res[val])
            }
        }
        ctx.body = {
            code: 0,
            flag: 0,
            data: list,
            message: 'success'
        }
        ctx.status = 200
    }
}

module.exports = new MessageController