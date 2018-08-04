'use strict'
import React, {Component} from 'react'
import { observer, inject } from 'mobx-react/native'
import io from 'socket.io-client'
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Keyboard,
    TouchableOpacity
} from 'react-native'
import { wsAddr, apiAddr, theme } from '../../config'

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
            socket: null,
            KeyboardShown: false
        }
        this.socket = null
        this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;
    }
    componentDidMount() {
        const { UserStore, ChatStore } = this.props.rootStore
        // 建立socket链接
        this.socket = io(wsAddr, {
            transports: ['websocket']
        })
        this.socket.on('connect', async () => {
            this.socket.emit('addUser', UserStore.userInfo._id)
        })
        this.socket.on(`sendMessage.${UserStore.userInfo._id}`, async msg => {
            ChatStore.addChatList({
                text: msg.content,
                who: 0
            })
        })
    }

    componentWillMount() {
        //监听键盘弹出事件
        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            this.keyboardDidShowHandler.bind(this)
        );
        //监听键盘隐藏事件
        this.keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            this.keyboardDidHideHandler.bind(this)
        );
    }
 
    componentWillUnmount() {
        //卸载键盘弹出事件监听
        if (this.keyboardDidShowListener != null) {
            this.keyboardDidShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if (this.keyboardDidHideListener != null) {
            this.keyboardDidHideListener.remove();
        }
    }
 
    //键盘弹出事件响应
    keyboardDidShowHandler(event) {
        this.setState({ KeyboardShown: true });
    }
 
    //键盘隐藏事件响应
    keyboardDidHideHandler(event) {
        this.setState({ KeyboardShown: false });
    }
 
    //强制隐藏键盘
    dissmissKeyboard() {
        // Toast.info("点击", 1);
        Keyboard.dismiss();
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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.rootStore.UserStore.token
            },
            body: JSON.stringify({
                content: this.state.message,
                from: {
                    _id: UserStore.userInfo._id,
                    icon: UserStore.userInfo.icon,
                    name: UserStore.userInfo.name
                },
                to: {
                    _id: this.props.chatObj._id,
                    icon: this.props.chatObj.icon,
                    name: this.props.chatObj.name
                }
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 0 && data.flag === 0) {
                ChatStore.addChatList(data.data)
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
                <TouchableOpacity style={styles.input} activeOpacity={1.0} onPress={this.dissmissKeyboard.bind(this)}>
                    <TextInput
                        autoCapitalize="none"
                        keyboardType='default'
                        onChangeText={(text) => this.setState({message: text})}
                    />
                </TouchableOpacity>
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
        height: 50,
        padding: 5,
        paddingRight: 0,
        backgroundColor: theme.color.dark,
        display: 'flex',
        borderTopWidth: 0.5,
        borderColor: '#666',
        shadowColor: '#666',
        shadowOpacity: 0.6,
        shadowOffset: {
            width: 1,
            height: 1
        },
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5
    },
    sendBtnWrap: {
        width: '20%',
        height: 40
    }
})