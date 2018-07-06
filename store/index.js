import LoginAndRegisterStore from './LoginAndRegisterStore'
import ChatStore from './ChatStore'

class RootStore {
    constructor(prop) {
        this.LoginAndRegisterStore = new LoginAndRegisterStore(this)
        this.ChatStore = new ChatStore(this)
    }
}

export default new RootStore()