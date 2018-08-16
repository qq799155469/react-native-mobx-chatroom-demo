import React, {Component} from 'react'
import {
    View,
    Alert
} from 'react-native'
import {
    EditView,
    SubmitBtn
} from './components'
import { apiAddr } from '../../config'
import { observer, inject } from 'mobx-react/native'

@inject('rootStore')
@observer
export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernamePlace: '点击输入账号',
            pwdPlace: '点击输入密码',
            nicknamePlace: '点击输入昵称',
            username: '',
            pwd: '',
            nickname: '',
            tips: ''
        }
    }
    fetchRegister() {
        fetch(`${apiAddr}/register`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.nickname,
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
                this.props.goMessages()
            } else {
                Alert.alert(data.message)
            }
        }).catch(err => {
            console.log(err)
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
                    <EditView 
                        type='nickname'
                        tip={this.state.nicknamePlace}
                        changeText={text => this.setState({nickname: text})}/>
                </View>
                <View>
                    <SubmitBtn 
                        name='注册' 
                        submitFn={this.fetchRegister.bind(this)}/>
                </View>
            </View>
        )
    }
}