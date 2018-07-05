// connect to mongodb
const path = require('path')
const mongoose = require('mongoose')

const db = 'mongodb://localhost:27017/chat'

mongoose.Promise = global.Promise
mongoose.connect(db)

// server
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');

const app = new Koa()

app.context.name = 'siko'

app.use(bodyParser())

const router = require('./apis/routers')()
app.use(router.routes())
    .use(router.allowedMethods())

app.listen('9001', () => {
    console.log('listening in port 9001')
})