'use strict'
import React, {Component} from 'react'
import {observable, action, autorun} from 'mobx'
import {observer} from 'mobx-react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text
} from 'react-native'

let _scrollView

class ChatState {
    @observable 
    inputText = ''
    @observable 
    chatList = []
    // add chat message
    @action 
    addChatList = text => {
        this.chatList.push(Object.assign({
            key: '3',
            isOwn: true
        }, {
            content: text,
            portrait: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=55fba25ad654564ee165e33b83df9cde/d53f8794a4c27d1eceb4a58d10d5ad6edcc438ec.jpg'
        }))
        setTimeout(() => _scrollView.scrollToEnd({animated: true}),0)
    }
    // restore chat history
    @action 
    restoreChatList = list => {
        this.chatList = list
    }
}

const store = new ChatState()

import ChatView from './ChatView'
import ChatInput from './ChatInput'

var chatListJson = [{
    key: '1',
    isOwn: true,
    portrait: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=55fba25ad654564ee165e33b83df9cde/d53f8794a4c27d1eceb4a58d10d5ad6edcc438ec.jpg',
    content: '下面的例子创建了一个简单的FlatList，并预设了一些模拟数据。首先是初始化FlatList所需的data，其中的每一项（行）数据之后都在renderItem中被渲染成了Text组件，最后构成整个FlatList。'
}, {
    key: '2',
    isOwn: false,
    portrait: 'https://avatar.csdn.net/3/F/8/3_xiehuimx.jpg',
    content: 'React Native提供了几个适用于展示长列表数据的组件，一般而言我们会选用FlatList或是SectionList。'
}]
@observer //观察该组件，使该组件能够响应mobx的变化
export default class ChatRoom extends Component {
    constructor() {
        super()
        this.state = {
            toName: 'Siko'
        }
    }
    render() {
        store.restoreChatList(chatListJson)
        return (
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{this.state.toName}</Text>
                </View>
                <ScrollView 
                    style={styles.listView}
                    ref={(scrollView) => _scrollView = scrollView}>
                    <ChatView store={store}/>
                </ScrollView>
                <ChatInput store={store}/>
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