import React, {Component} from 'react'
import {
    View,
    ImageBackground,
    StyleSheet
} from 'react-native'
import {
    SwitchBar
} from './components'
import Login from './Login'
import Register from './Register'
import { observer, inject } from 'mobx-react/native'

//视图组件
@inject('rootStore')
@observer
class LoginAndRegisterView extends Component {
    constructor(props) {
        super(props)
    }
    goChat() {
        this.props.navigation.navigate('Chat')
    }
    goContacts() {
        this.props.navigation.navigate('Contacts')
    }
    goMessages() {
        this.props.navigation.navigate('Messages')
    }
    render() {
        const store = this.props.rootStore.LoginAndRegisterStore
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.bgImage}/>
                <SwitchBar/>
                {store.switchToRegister ? <Register goMessages={this.goMessages.bind(this)}/> : <Login goMessages={this.goMessages.bind(this)}/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#555'
    },
    bgImage: {
        width: 100,
        height: 100
    }
})

export default LoginAndRegisterView