import React, {Component} from 'react'
import {
    View,
    Image,
    AsyncStorage,
    Text,
    StyleSheet
} from 'react-native'

import MessageList from './components/MessageList'
import { observer, inject } from 'mobx-react/native'

import { apiAddr } from '../../config'

@inject('rootStore')
@observer
export default class Messages extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '消息',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../static/imgs/message.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../static/imgs/message.png')}/>
            );
        }
    })
    constructor(props) {
        super(props)
        this.state = {
            showAlert: true
        }
    }
    componentWillMount() {
        const {UserStore} = this.props.rootStore
        if (UserStore.token) {
            this.initMessages()
            return
        }
        let token,
        _retrieveData = async () => {
            try {
                token = await AsyncStorage.getItem('token')
                if (token !== null) {
                    try {
                        JSON.parse({
                            Authorization: `Bearer ${token}` 
                        })
                    } catch(e) {
                        alert('token失效，请重新登录')
                        this.props.navigation.navigate('LoginAndRegister')
                        return
                    }
                    fetch(`${apiAddr}/checkLogin`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                        }
                    })
                    .then(res => res.json())
                    .then(data => { 
                        if (data.code === 0 && data.flag === 0) {
                            const store = this.props.rootStore.UserStore
                            store.fetchUser(data.data)
                            store.setToken(data.token)
                            this.initMessages()
                        } else {
                            this.props.navigation.navigate('LoginAndRegister')
                            // Alert.alert(data.message)
                        } 
                    })
                }
            } catch (error) {
                this.props.navigation.navigate('LoginAndRegister')
            }
        }
        // await _retrieveData().then(res => this.initMessages())
        _retrieveData()
    }
    goChat(item) {
        const {UserStore} = this.props.rootStore
        this.props.navigation.navigate('Chat', {
            item: {
                _id: item.from._id === UserStore.userInfo._id ? item.to._id : item.from._id,
                name: item.from._id === UserStore.userInfo._id ? item.to.name : item.from.name,
                icon: item.from._id === UserStore.userInfo._id ? item.to.icon : item.from.icon
            }
        })
    }
    initMessages() {
        const {UserStore, MessagesStore} = this.props.rootStore
        fetch(`${apiAddr}/message/getlist`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${UserStore.token}` 
            },
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 0 && data.flag === 0) {
                MessagesStore.setMessagesList(data.data)
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
                <MessageList goChat={this.goChat.bind(this)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 21,
        height: 21,
    },
    modal: {
        width: 100,
        height: 100,
        margin: 'auto'
    }
})