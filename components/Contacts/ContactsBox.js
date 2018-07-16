import React, {Component} from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

import ContactsList from './ContactsList'

@inject('rootStore')
@observer
export default class ContactsBox extends Component {
    // 配置页面导航选项
    static navigationOptions = ({navigation}) => ({
        title: '联系人列表'
    })
    constructor(props) {
        super(props)
        this.UserStore = this.props.rootStore.UserStore
        this.ContactsStore = this.props.rootStore.ContactsStore
    }
    componentDidMount() {
        const { contacts } = this.UserStore.userInfo
        this.ContactsStore.setContactsList(contacts)
    }
    goChat(item) {
        this.props.navigation.navigate('Chat', {
            title: item.name
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <ContactsList goChat={this.goChat.bind(this)}/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    }
})