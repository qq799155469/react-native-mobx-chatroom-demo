import React from 'react'
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation'
import {
  Provider
} from 'mobx-react'
import {theme} from './config'

import LoginAndRegister from './components/LoginAndRegister/LoginAndRegister'
import Chat from './components/Chat/ChatRoom'
import Contacts from './components/Contacts/ContactsBox'
import Messages from './components/Messages'
import User from './components/User'
import Other from './components/Other'

import store from './store'

const Navigation = () => {
  return (
    <Provider rootStore={store}>
      <App/>
    </Provider>
  )
}

const TabStack = TabNavigator({
  Messages: {
    screen: Messages
  },
  Contacts: {
    screen: Contacts
  },
  User: {
    screen: User
  }
}, {
  initialRouteName: 'Messages',
  tabBarOptions: {
    activeTintColor: theme.color.blue,
    showIcon: true,
    style: {
      backgroundColor: '#fff',
      paddingBottom: 1,
      borderTopWidth: 0.2,
      paddingTop: 1,
      borderTopColor: '#666'
    }
  }
})

const App = StackNavigator({
  LoginAndRegister: {
    screen: LoginAndRegister
  },
  Chat: {
    screen: Chat
  },
  Other: {
    screen: Other
  },
  Tab: {
    screen: TabStack
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