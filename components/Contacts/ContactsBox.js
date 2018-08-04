import React, {Component} from 'react'
import {
    View,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

import ContactsList from './ContactsList'
import ContactsSearch from './ContactsSearch'

@inject('rootStore')
@observer
class ContactsBox extends Component {
    // 配置页面导航选项
    static navigationOptions = ({navigation}) => ({
        title: '联系人',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../static/imgs/contact.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../static/imgs/contact.png')}/>
            );
        }
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
        // 通过导航传递聊天对象的信息
        this.props.navigation.navigate('Chat', {
            item
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ContactsSearch/>
                {/* keyboardShouldPersistTaps属性用于解决scrollview下touch事件要点击两次才能生效的问题 */}
                <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
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
    },
    addContact: {
        color: '#333',
        paddingRight: 10
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    }
})

export default ContactsBox