const Router = require('koa-router')

const UserController = require('../controllers/user')
const ContactController = require('../controllers/contact')
const MessageController = require('../controllers/message')

const router = new Router({
    prefix: '/api'
})

module.exports = () => { 
    router.post('/register', UserController.Register)
    router.post('/login', UserController.Login)
    router.post('/getotherinfo', UserController.getOtherInfo)
    router.post('/checkLogin', UserController.checkLogin)
    router.post('/contacts/list', ContactController.getList)
    router.post('/contacts/search', ContactController.search)
    router.post('/contacts/add', ContactController.add)
    router.post('/message/add', MessageController.add)
    router.post('/message/history', MessageController.history)
    router.post('/message/getlist', MessageController.getList)
    return router
}