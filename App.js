import React from 'react'
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation'
import {
  AsyncStorage
} from 'react-native'
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

// const App = StackNavigator({
//   LoginAndRegister: {
//     screen: LoginAndRegister
//   },
//   Chat: {
//     screen: Chat
//   },
//   Other: {
//     screen: Other
//   },
//   Tab: {
//     screen: TabStack
//   }
// }, {
//   navigationOptions: {
//     title: 'Chat',
//     headerStyle: {
//       backgroundColor: '#eee'
//     }
//   },
//   headerMode: 'float'
// })


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
  initialRouteName: 'Tab',
  navigationOptions: {
    title: 'Chat',
    headerStyle: {
      backgroundColor: '#eee'
    }
  },
  headerMode: 'float'
})

const defaultGetStateForAction = App.router.getStateForAction


App.router.getStateForAction = (action, state) => {
  // if (!global.user.loginState) {
    // const token = AsyncStorage.getItem('token')
    // alert(JSON.stringify(token))
    //   this.routes = [
    //       // ...state.routes,
    //       {key: 'id-'+Date.now(), routeName: 'LoginAndRegister'},
    //   ]
    //   return {
    //       ...state,
    //       routes,
    //       index: 0,
    //   }
  // }
  return defaultGetStateForAction(action, state);
}

export default Navigation