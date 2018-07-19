import { observable, action } from 'mobx'

export default class MessagesStore {
    @observable
    messagesList = []
    @action
    setMessagesList = messages => this.messagesList = messages
} 