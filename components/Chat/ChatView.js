'use strict'
import React, {Component} from 'react'
import { observer, inject } from 'mobx-react/native'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'

@inject('rootStore')
@observer
export default class ChatView extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {ChatStore, UserStore} = this.props.rootStore
        return (
            ChatStore.chatList.map((item, index) => <View 
                key={index} 
                style={item.from._id === UserStore.userInfo._id ? styles.itemWrapOwn : styles.itemWrapOther}>
                    <Image source={{uri: item.from.icon}} style={styles.portrait}/>
                    <Text style={styles.item}>{item.content}</Text>
                </View>)
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 10
    },
    itemWrapOwn: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        marginBottom: 20,
        justifyContent: 'flex-start'
    },
    itemWrapOther: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'flex-start'
    },
    item: {
        maxWidth: '74%',
        padding: 8,
        color: '#333',
        borderRadius: 20,
        backgroundColor: '#fff',
        lineHeight: 20
    },
    portrait: {
        width: 30,
        height: 30,
        margin: 10,
        marginTop: 0,
        borderRadius: 15,
        backgroundColor: '#333',
    }
})