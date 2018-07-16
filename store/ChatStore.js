import { observable, action } from 'mobx'

export default class ChatStore {
    @observable 
    inputText = ''
    @observable
    listDom = ''
    @observable 
    chatList = []
    @observable
    userInfo = {}
    @observable
    toUserInfo = {}
    // init chatlist
    @action
    initChatList = (scrollView, userInfo, toUserInfo) => {
        this.listDom = scrollView
        this.userInfo = userInfo
        this.toUserInfo = toUserInfo
    }
    // add chat message
    // ** who: 1表示自己，0表示对方
    @action 
    addChatList = data => {
        this.chatList.push({
            key: '0',
            who: data.who,
            content: data.text,
            icon: data.who ? this.userInfo.icon : this.toUserInfo.icon
        })
        setTimeout(() => this.listDom.scrollToEnd({animated: true}),0)
    }
    // restore chat history
    @action 
    restoreChatList = list => {
        this.chatList = list
    }
}