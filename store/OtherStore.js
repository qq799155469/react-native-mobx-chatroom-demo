import { observable, action } from 'mobx'

export default class UserStore {
    @observable
    otherInfo = null
    @action
    fetchUser = user => this.otherInfo = user
}