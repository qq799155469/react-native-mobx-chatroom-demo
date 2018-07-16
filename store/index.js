import LoginAndRegisterStore from './LoginAndRegisterStore'
import ChatStore from './ChatStore'
import UserStore from './UserStore'
import ContactsStore from './ContactsStore'

class RootStore {
    constructor(prop) {
        this.LoginAndRegisterStore = new LoginAndRegisterStore(this)
        this.ChatStore = new ChatStore(this)
        this.UserStore = new UserStore(this)
        this.ContactsStore = new ContactsStore(this)
    }
}

export default new RootStore()