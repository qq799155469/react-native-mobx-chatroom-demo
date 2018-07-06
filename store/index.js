import LoginAndRegisterStore from './LoginAndRegisterStore'
import ChatStore from './ChatStore'
import UserStore from './UserStore'

class RootStore {
    constructor(prop) {
        this.LoginAndRegisterStore = new LoginAndRegisterStore(this)
        this.ChatStore = new ChatStore(this)
        this.UserStore = new UserStore(this)
    }
}

export default new RootStore()