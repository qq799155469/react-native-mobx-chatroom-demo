import React, {Component} from 'react'
import {
  StackNavigator
} from 'react-navigation'

import LoginAndRegister from './components/LoginAndRegister/login'
import Chat from './components/Chat/ChatRoom'

export default App = StackNavigator({
  Login: {
      screen: LoginAndRegister
  },
  Chat: {
      screen: Chat
  }
})