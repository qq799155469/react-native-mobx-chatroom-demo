const mongoose = require('mongoose')
const io = require('socket.io')()
const jwtKoa = require('koa-jwt')

const configs = require('./configs')
// connect to mongodb

mongoose.Promise = global.Promise
mongoose.connect(configs.mongodbAddr)

// server
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');

const app = new Koa()

app.use(bodyParser())

const router = require('./apis/routers')()

app.use(jwtKoa({secret: configs.secret})
        .unless({
            path: ['/api/login', '/api/register', '/api/contacts/search'] //数组中的路径不需要通过jwt验证
        }))
    .use(router.routes())
    .use(router.allowedMethods())

const server = app.listen(configs.port, () => {
    console.log(`listening in port ${configs.port}`)
})

const ws = io.listen(server)

ws.on('connection', client => {
    client.on('addUser', msg => {
        console.log(`${msg}上线了`)
    })
    client.on('sendMessage.client', msg => {
        const {content, from, to} = msg
        client.emit(`sendMessage.${to._id}`, {
            content,
            from,
            to
        })
    })
})