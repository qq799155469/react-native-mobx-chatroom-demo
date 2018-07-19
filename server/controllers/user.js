const md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken')
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
            ctx.body = {
                data: res,
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
            const token = jwt.sign(userToken, configs.secret, {expiresIn: '1h'}) 
            ctx.body = {
                code: 0,
                flag: 0,
                data: res,
                token,
                message: '恭喜你，注册成功'
            }
            ctx.status = 200
        }
    }
}

module.exports = new UserController