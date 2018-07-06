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
import { wsAddr } from '../../config'

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
        this.socket.on('fetchMessage', async msg => {
            ChatStore.addChatList(msg)
        })
    }
    sendMessage() {
        const { ChatStore } = this.props.rootStore
        ChatStore.addChatList(this.state.message)
        this.socket.emit('sendMessage', this.state.message)
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