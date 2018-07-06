'use strict'
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from 'react-native'

@observer
export default class ChatView extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            this.props.store.chatList.map((item, index) => <View key={index} style={item.isOwn ? styles.itemWrapOwn : styles.itemWrapOther}><ImageBackground source={{uri: item.portrait}} style={styles.portrait}></ImageBackground><Text style={styles.item}>{item.content}</Text></View>)
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
        width: '50%',
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
        borderRadius: 30,
        backgroundColor: '#333',
    }
})