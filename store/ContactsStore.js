import { observable, action } from 'mobx'

export default class ContactsStore {
    @observable
    contactsList = []
    @action
    setContactsList = contacts => this.contactsList = contacts
}