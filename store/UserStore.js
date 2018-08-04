import { observable, action } from 'mobx'

export default class UserStore {
    @observable
    userInfo = null
    @observable
    token = ''
    @action
    fetchUser = user => this.userInfo = user
    @action
    setToken = token => this.token = token
    @action
    updateContacts = contacts => this.userInfo.contacts = contacts
}