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
export default class LoginAndRegisterView extends Component {
    constructor(props) {
        super(props)
    }
    goChat() {
        this.props.navigation.navigate('Chat')
    }
    render() {
        const store = this.props.rootStore.LoginAndRegisterStore
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.bgImage}/>
                <SwitchBar/>
                {store.switchToRegister ? <Register goChat={this.goChat.bind(this)}/> : <Login goChat={this.goChat.bind(this)}/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 15
    },
    bgImage: {
        width: 100,
        height: 100
    }
})