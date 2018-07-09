import { observable, action } from 'mobx'

export default class ChatStore {
    @observable 
    inputText = ''
    @observable
    listDom = ''
    @observable 
    chatList = []
    // add chat message
    @action
    initChatList = _ => this.listDom = _
    @action 
    // who: 1表示自己，0表示对方
    addChatList = (text, who) => {
        this.chatList.push(Object.assign({
            key: '3',
            who
        }, {
            content: text,
            portrait: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=55fba25ad654564ee165e33b83df9cde/d53f8794a4c27d1eceb4a58d10d5ad6edcc438ec.jpg'
        }))
        setTimeout(() => this.listDom.scrollToEnd({animated: true}),0)
    }
    // restore chat history
    @action 
    restoreChatList = list => {
        this.chatList = list
    }
}