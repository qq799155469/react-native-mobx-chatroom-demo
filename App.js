import React from 'react'
import {
  StackNavigator
} from 'react-navigation'
import {
  Provider
} from 'mobx-react'

import LoginAndRegister from './components/LoginAndRegister/LoginAndRegister'
import Chat from './components/Chat/ChatRoom'
import Login from './components/LoginAndRegister/Login'
import Register from './components/LoginAndRegister/Register'

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
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  Chat: {
    screen: Chat
  }
})

export default Navigation