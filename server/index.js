const path = require('path')
const mongoose = require('mongoose')
const serve = require('koa-static')
const io = require('socket.io')()
const configs = require('./configs')
// connect to mongodb
const db = 'mongodb://localhost:27017/chat'

mongoose.Promise = global.Promise
mongoose.connect(db)

// server
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');

const app = new Koa()

app.use(bodyParser())

const router = require('./apis/routers')()

app.use(router.routes())
    .use(router.allowedMethods())

// app.use(serve(path.join(__dirname, '..', 'static')))

const server = app.listen(configs.port, () => {
    console.log(`listening in port ${configs.port}`)
})

const ws = io.listen(server)

ws.on('connection', client => {
    client.on('addUser', msg => {
        console.log(`${msg}上线了`)
    })
    client.on('sendMessage.client', msg => {
        client.emit('sendMessage.server', `${msg}，这句话你再说一次？`)
    })
})