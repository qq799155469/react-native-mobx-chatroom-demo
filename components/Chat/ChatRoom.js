'use strict'
import React, {Component} from 'react'
import { observer, inject } from 'mobx-react/native'
import {
    StyleSheet,
    ScrollView,
    View
} from 'react-native'
import { apiAddr } from '../../config'

import ChatView from './ChatView'
import ChatInput from './ChatInput'

@inject('rootStore')
@observer //观察该组件，使该组件能够响应mobx的变化
export default class ChatRoom extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.item.name
    })
    constructor(props) {
        super(props)
        this.state = {
            chatObj: this.props.navigation.state.params.item
        }
        this.UserStore = this.props.rootStore.UserStore
        this.ChatStore = this.props.rootStore.ChatStore
    }
    componentWillMount() {
        this.initChat()
    }
    initChat() {
        fetch(`${apiAddr}/message/history`,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromId: this.state.chatObj._id,
                toId: this.UserStore.userInfo._id
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 0 && data.flag === 0) {
                for(let val in data.data) {
                    if (data.data[val].from._id == this.state.chatObj._id) {
                        data.data[val].who = 0
                    } else {
                        data.data[val].who = 1
                    }
                }
                this.ChatStore.restoreChatList(data.data)
            } else {
                Alert.alert(data.message)
            }
        }).catch(err => {
            alert(err)
        })
    }
    initScrollView(_) {
        this.ChatStore.initChatList(_, this.UserStore.userInfo, {
            name: this.state.toName,
            icon: 'http://localhost:9066/static/assets/imgs/robot-icon.png'
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView 
                    style={styles.listView}
                    ref={scrollView => this.initScrollView(scrollView)}>
                    <ChatView/>
                </ScrollView>
                <ChatInput chatObj={this.state.chatObj}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#efefef',
        display: 'flex',
        alignItems: 'center'
    },
    listView: {
        width: '100%',
        flex: 1,
        paddingTop: 15,
        paddingBottom: 45
    }
})