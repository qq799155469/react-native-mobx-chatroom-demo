import React, {Component} from 'react'
import {
    View,
    Alert,
    AsyncStorage
} from 'react-native'
import {
    EditView,
    SubmitBtn
} from './components'
import { apiAddr } from '../../config'
import { observer, inject } from 'mobx-react/native'

@inject('rootStore')
@observer
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernamePlace: '点击输入账号',
            pwdPlace: '点击输入密码',
            username: '',
            pwd: ''
        }
    }
    fetchLogin () {
        fetch(`${apiAddr}/login`,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.pwd
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 0 && data.flag === 0) {
                const store = this.props.rootStore.UserStore
                store.fetchUser(data.data)
                store.setToken(data.token)
                _storeData = async () => {
                    try {
                        await AsyncStorage.setItem('token', data.token)
                    } catch (error) {
                        console.log('set token error')
                    }
                }
                _storeData()
                this.props.goMessages()
            } else {
                Alert.alert(data.message)
            }
        }).catch(err => {
            alert(err)
        })
    }
    render() {
        return (
            <View>
                <View>
                    <EditView 
                    type='username'
                    tip={this.state.usernamePlace}
                    changeText={text => this.setState({username: text})}/>
                    <EditView 
                    type='password'
                    tip={this.state.pwdPlace}
                    changeText={text => this.setState({pwd: text})}/>
                </View>
                <View>
                    <SubmitBtn
                        submitFn={this.fetchLogin.bind(this)}
                        name='登录'/>
                </View>
            </View>
        )
    }
}
