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
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

class LoginAndRegisterStore {
    @observable
    switchToRegister = false
    @action
    switchOrder = (_ = false) => {
        this.switchToRegister = _
    }
}

const store = new LoginAndRegisterStore()

//视图组件
@observer
export default class LoginAndRegisterView extends Component {
    constructor(props) {
        super(props)
    }
    goChat() {
        this.props.navigation.navigate('Chat')
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.bgImage}/>
                <SwitchBar store={store}/>
                {store.switchToRegister ? <Register store={store} goChat={this.goChat.bind(this)}/> : <Login store={store} goChat={this.goChat.bind(this)}/>}
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