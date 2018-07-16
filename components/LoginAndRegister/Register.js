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

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernamePlace: '请输入账号',
            pwdPlace: '请输入密码',
            nicknamePlace: '请输入昵称',
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
                this.props.goContacts()
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
                        tip={this.state.usernamePlace}
                        changeText={text => this.setState({username: text})}/>
                    <EditView 
                        tip={this.state.pwdPlace}
                        changeText={text => this.setState({pwd: text})}/>
                    <EditView 
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