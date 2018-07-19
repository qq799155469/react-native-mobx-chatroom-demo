import { observable, action } from 'mobx'

export default class UserStore {
    @observable
    userInfo = null
    @observable
    token = ''
    @action
    fetchUser = user => {
        const { name, icon, online, _id, contacts } = user
        this.userInfo = {
            name,
            icon,
            online,
            _id,
            contacts
        }
    }
    @action
    setToken = token => this.token = token
    @action
    updateContacts = contacts => this.userInfo.contacts = contacts
}