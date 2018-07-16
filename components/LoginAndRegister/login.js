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
import { observer, inject } from 'mobx-react'

@inject('rootStore')
@observer
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernamePlace: '请输入账号',
            pwdPlace: '请输入密码',
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
                this.props.goContacts()
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
                    tip={this.state.usernamePlace}
                    changeText={text => this.setState({username: text})}/>
                    <EditView 
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
