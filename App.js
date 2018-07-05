import {
  StackNavigator
} from 'react-navigation'

import LoginAndRegister from './components/LoginAndRegister/LoginAndRegister'
import Chat from './components/Chat/ChatRoom'
import Login from './components/LoginAndRegister/Login'
import Register from './components/LoginAndRegister/Register'

export default App = StackNavigator({
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