import { observable, action } from 'mobx'

export default class UserStore {
    @observable
    otherInfo = null
    @action
    fetchUser = user => {
        const { name, icon, online, _id, contacts } = user
        this.otherInfo = {
            name,
            icon,
            online,
            _id,
            contacts
        }
    }
}