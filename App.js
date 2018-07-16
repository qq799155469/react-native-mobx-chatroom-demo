import React from 'react'
import {
  StackNavigator
} from 'react-navigation'
import {
  Provider
} from 'mobx-react'

import LoginAndRegister from './components/LoginAndRegister/LoginAndRegister'
import Chat from './components/Chat/ChatRoom'
import Contacts from './components/Contacts/ContactsBox'

import store from './store'

const Navigation = () => {
  return (
    <Provider rootStore={store}>
      <App/>
    </Provider>
  )
}

const App = StackNavigator({
  LoginAndRegister: {
    screen: LoginAndRegister
  },
  Contacts: {
    screen: Contacts
  },
  Chat: {
    screen: Chat
  }
}, {
  navigationOptions: {
    title: 'Chat',
    headerStyle: {
      backgroundColor: '#eee'
    }
  },
  headerMode: 'float'
})

export default Navigation