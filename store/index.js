import LoginAndRegisterStore from './LoginAndRegisterStore'
import ChatStore from './ChatStore'
import UserStore from './UserStore'
import OtherStore from './OtherStore'
import ContactsStore from './ContactsStore'
import MessagesStore from './MessagesStore'

class RootStore {
    constructor(prop) {
        this.LoginAndRegisterStore = new LoginAndRegisterStore(this)
        this.ChatStore = new ChatStore(this)
        this.UserStore = new UserStore(this)
        this.OtherStore = new OtherStore(this)
        this.ContactsStore = new ContactsStore(this)
        this.MessagesStore = new MessagesStore(this)
    }
}

export default new RootStore()