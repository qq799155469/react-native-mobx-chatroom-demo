'use strict'
import React, {Component} from 'react'
import { observer, inject } from 'mobx-react/native'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import { apiAddr } from '../../config'

@inject('rootStore')
@observer
export default class ChatView extends Component {
    constructor(props) {
        super(props)
    }
    goOther(_id) {
        fetch(`${apiAddr}/getotherinfo`,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.rootStore.UserStore.token
            },
            body: JSON.stringify({
                _id
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 0 && data.flag === 0) {
                const store = this.props.rootStore.OtherStore
                store.fetchUser(data.data)
                this.props.goOtherStack()
            } else {
                Alert.alert(data.message)
            }
        }).catch(err => {
            alert(err)
        })
    }
    render() {
        const {ChatStore, UserStore} = this.props.rootStore
        return (
            ChatStore.chatList.map((item, index) => <View 
                key={index} 
                style={item.from._id === UserStore.userInfo._id ? styles.itemWrapOwn : styles.itemWrapOther}>
                    <TouchableOpacity
                    onPress={() => this.goOther(item.from._id)}
                    >
                        <Image source={{uri: item.from.icon}} style={styles.portrait}/>
                    </TouchableOpacity>
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