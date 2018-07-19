import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import {
  Provider
} from 'mobx-react'

import LoginAndRegister from './components/LoginAndRegister/LoginAndRegister'
import Chat from './components/Chat/ChatRoom'
import Contacts from './components/Contacts/ContactsBox'
import Messages from './components/Messages'
import User from './components/User'

import store from './store'

const Navigation = () => {
  return (
    <Provider rootStore={store}>
      <App/>
    </Provider>
  )
}

const TabStack = createBottomTabNavigator({
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
    style: {

    }
  }
})

const App = createStackNavigator({
  LoginAndRegister: {
    screen: LoginAndRegister
  },
  Chat: {
    screen: Chat
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