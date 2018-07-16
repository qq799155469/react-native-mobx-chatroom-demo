'use strict'
import React, {Component} from 'react'
import { observer, inject } from 'mobx-react/native'
import io from 'socket.io-client'
import {
    StyleSheet,
    View,
    TextInput,
    Button
} from 'react-native'
import { wsAddr, apiAddr } from '../../config'

if (!window.location) {
    // App is running in simulator
    window.navigator.userAgent = 'ReactNative';
}

@inject('rootStore')
@observer
export default class ChatInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            socket: null
        }
        this.socket = null
    }
    componentDidMount() {
        const { UserStore, ChatStore } = this.props.rootStore
        // 建立socket链接
        this.socket = io(wsAddr, {
            transports: ['websocket']
        })
        this.socket.on('connect', async () => {
            this.socket.emit('addUser', UserStore.userInfo.userId)
        })
        this.socket.on(`sendMessage.${UserStore.userInfo.userId}`, async msg => {
            ChatStore.addChatList({
                text: msg.content,
                who: 0
            })
        })
    }
    sendMessage() {
        const { ChatStore, UserStore } = this.props.rootStore
        this.socket.emit(`sendMessage.client`, {
            content: this.state.message,
            from: UserStore.userInfo,
            to: this.props.chatObj
        })
        fetch(`${apiAddr}/message/add`,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: this.state.message,
                from: {
                    userId: UserStore.userInfo.userId,
                    icon: UserStore.userInfo.icon,
                    name: UserStore.userInfo.name
                },
                to: {
                    userId: this.props.chatObj._id,
                    icon: this.props.chatObj.icon,
                    name: this.props.chatObj.name
                }
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 0 && data.flag === 0) {
                ChatStore.addChatList({
                    text: this.state.message,
                    who: 1
                })
            } else {
                Alert.alert(data.message)
            }
        }).catch(err => {
            alert(err)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    keyboardType='default'
                    style={styles.input}
                    onChangeText={(text) => this.setState({message: text})}
                />
                <View style={styles.sendBtnWrap}>
                    <Button
                        title='发送'
                        color='#fff'
                        onPress={() => this.sendMessage()}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 0.1,
        backgroundColor: '#333',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        padding: 10
    },
    sendBtnWrap: {
        width: '20%',
        height: 40
    }
})