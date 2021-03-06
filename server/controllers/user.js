const md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken')
const _ = require('lodash/object')
const util = require('util')
const verify = util.promisify(jwt.verify)
const configs = require('../configs')

const User = require('../models/User')

class UserController {
    async Login (ctx) {
        const { body } = ctx.request
        body.password = md5(body.password, configs.md5Key)
        const res = await User.findOne(body)
        if (res) {
            let userToken = {
                username: res.username,
                _id: res._id
            }
            const token = jwt.sign(userToken, configs.secret, {expiresIn: '1h'})
            const data = _.pick(res, 'username', '_id', 'contacts', 'name', 'online', 'icon', 'sex')
            ctx.body = {
                data,
                code: 0,
                flag: 0,
                token,
                message: '登录成功'
            }
            ctx.status = 200
        } else {
            ctx.body = {
                code: 0,
                flag: -1,
                message: '用户名或密码错误'
            }
            ctx.status = 200
        }
    }
    async Register (ctx) {
        const { body } = ctx.request
        const params = Object.assign({
            online: true,
            sex: 1,
            icon: `${configs.serverAddr}/assets/imgs/defaut-protrait.png`
        }, body, {
            password: md5(body.password, configs.md5Key)
        })
        const sameUser = await User.findOne({username: params.username})
        if (sameUser) {
            ctx.body = {
                code: 0,
                flag: 1,
                message: '该用户名已被注册,请重新输入'
            }
            ctx.status = 200
        } else {
            const res = await User(params).save()
            let userToken = {
                username: res.username,
                _id: res._id
            }
            const data = _.pick(res, 'username', '_id', 'contacts', 'name', 'online', 'icon', 'sex')
            const token = jwt.sign(userToken, configs.secret, {expiresIn: '1h'}) 
            ctx.body = {
                code: 0,
                flag: 0,
                data,
                token,
                message: '恭喜你，注册成功'
            }
            ctx.status = 200
        }
    }
    async getOtherInfo (ctx) {
        const { body } = ctx.request
        const res = await User.findOne({_id: body._id})
        if (res) {
            let data = _.pick(res, '_id', 'icon', 'name', 'online')
            ctx.body = {
                code: 0,
                flag: 0,
                data,
                message: 'success'
            }
            ctx.status = 200
        } else {
            ctx.body = {
                code: 0,
                flag: 1,
                message: '该用户不存在'
            }
        }
    }
    async checkLogin (ctx) {
        const token = ctx.header.authorization
        const payload = await verify(token.split(' ')[1], configs.secret) 
        const {_id} = payload 
        const res = await User.findOne({_id})
        if (res) {
            let userToken = {
                username: res.username,
                _id: res._id
            }
            const token = jwt.sign(userToken, configs.secret, {expiresIn: '1h'})
            const data = _.pick(res, 'username', '_id', 'contacts', 'name', 'online', 'icon', 'sex')
            ctx.body = {
                data,
                code: 0,
                flag: 0,
                token,
                message: '您当前为在线状态'
            }
            ctx.status = 200
        } else {
            ctx.body = {
                code: 0,
                flag: -1,
                message: '位置错误'
            }
            ctx.status = 200
        }
    }
}

module.exports = new UserController