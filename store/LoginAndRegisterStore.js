import { observable, action } from 'mobx'

export default class LoginAndRegisterStore {
    @observable
    switchToRegister = false
    @action
    switchOrder = (_ = false) => {
        this.switchToRegister = _
    }
}