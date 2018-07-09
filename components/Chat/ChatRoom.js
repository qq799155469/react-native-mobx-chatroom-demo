'use strict'
import React, {Component} from 'react'
import { observer, inject } from 'mobx-react/native'
import {
    StyleSheet,
    ScrollView,
    View,
    Text
} from 'react-native'

let _scrollView

import ChatView from './ChatView'
import ChatInput from './ChatInput'

var chatListJson = []

@inject('rootStore')
@observer //观察该组件，使该组件能够响应mobx的变化
export default class ChatRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toName: 'Siko'
        }
        this.store = this.props.rootStore.ChatStore
    }
    initScrollView(_) {
        this.store.initChatList(_)
    }
    render() {
        this.store.restoreChatList(chatListJson)
        return (
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{this.state.toName}</Text>
                </View>
                <ScrollView 
                    style={styles.listView}
                    ref={(scrollView) => this.initScrollView(scrollView)}>
                    <ChatView/>
                </ScrollView>
                <ChatInput/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleBox: {
        width: '100%',
        backgroundColor: '#494949',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.1
    },
    title: {
        color: '#fff'
    },
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