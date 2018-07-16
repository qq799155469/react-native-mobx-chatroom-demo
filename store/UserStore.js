import { observable, action } from 'mobx'

export default class UserStore {
    @observable
    userInfo = null
    @action
    fetchUser = user => {
        const { name, icon, online, _id, contacts } = user
        this.userInfo = {
            name,
            icon,
            online,
            userId: _id,
            contacts
        }
    }
}