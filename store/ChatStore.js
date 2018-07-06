import { observable, action } from 'mobx'

export default class ChatStore {
    @observable 
    inputText = ''
    @observable 
    chatList = []
    // add chat message
    @action 
    addChatList = text => {
        this.chatList.push(Object.assign({
            key: '3',
            isOwn: true
        }, {
            content: text,
            portrait: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=55fba25ad654564ee165e33b83df9cde/d53f8794a4c27d1eceb4a58d10d5ad6edcc438ec.jpg'
        }))
        setTimeout(() => _scrollView.scrollToEnd({animated: true}),0)
    }
    // restore chat history
    @action 
    restoreChatList = list => {
        this.chatList = list
    }
}