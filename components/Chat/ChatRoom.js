'use strict'
import React, {Component} from 'react'
import { observer, inject } from 'mobx-react/native'
import {
    StyleSheet,
    ScrollView,
    View,
    Text
} from 'react-native'

import ChatView from './ChatView'
import ChatInput from './ChatInput'

var chatListJson = []

@inject('rootStore')
@observer //观察该组件，使该组件能够响应mobx的变化
export default class ChatRoom extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title
    })
    constructor(props) {
        super(props)
        this.state = {
            toName: 'Robot'
        }
        this.UserStore = this.props.rootStore.UserStore
        this.ChatStore = this.props.rootStore.ChatStore
    }
    initScrollView(_) {
        this.ChatStore.initChatList(_, this.UserStore.userInfo, {
            name: this.state.toName,
            icon: 'http://localhost:9066/static/assets/imgs/robot-icon.png'
        })
    }
    render() {
        this.ChatStore.restoreChatList(chatListJson)
        return (
            <View style={styles.container}>
                <ScrollView 
                    style={styles.listView}
                    ref={scrollView => this.initScrollView(scrollView)}>
                    <ChatView/>
                </ScrollView>
                <ChatInput/>
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