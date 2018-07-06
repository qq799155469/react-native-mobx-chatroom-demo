const Router = require('koa-router')
const User = require('../models/User.js')
const md5 = require('blueimp-md5')
const configs = require('../configs')

const router = new Router({
    prefix: '/api'
})

module.exports = () => {
    router.post('/register', async ctx => {
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
            ctx.body = Object.assign({
                code: 0,
                flag: 0,
                message: '恭喜你，注册成功'
            })
            ctx.status = 200
        }
    })
    router.post('/login', async ctx => {
        const { body } = ctx.request
        body.password = md5(body.password, configs.md5Key)
        const res = await User.findOne(body)
        if (res) {
            ctx.body = {
                code: 0,
                flag: 0,
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
    })
    router.get('/user', async ctx => {
        const users = await User.find()
        ctx.body = users
        ctx.status = 200
    })
    return router
}