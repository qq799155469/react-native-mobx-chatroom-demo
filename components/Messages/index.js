import React, {Component} from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

import MessageList from './components/MessageList'
import { observer, inject } from 'mobx-react/native'

import { apiAddr } from '../../config'

@inject('rootStore')
@observer
export default class Messages extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '消息'
    })
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.initMessages()
    }
    goChat(item) {
        const {UserStore} = this.props.rootStore
        this.props.navigation.navigate('Chat', {
            item: {
                _id: item.from._id === UserStore.userInfo._id ? item.to._id : item.from._id,
                name: item.from._id === UserStore.userInfo._id ? item.to.name : item.from.name,
                icon: item.from._id === UserStore.userInfo._id ? item.to.icon : item.from.icon
            }
        })
    }
    initMessages() {
        const {UserStore, MessagesStore} = this.props.rootStore
        fetch(`${apiAddr}/message/getlist`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${UserStore.token}` 
            },
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 0 && data.flag === 0) {
                MessagesStore.setMessagesList(data.data)
            } else {
                Alert.alert(data.message)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <MessageList goChat={this.goChat.bind(this)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        
    }
})