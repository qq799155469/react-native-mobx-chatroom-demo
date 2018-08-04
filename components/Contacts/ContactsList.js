import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { apiAddr } from '../../config'
import User from '../Other';

@inject('rootStore')
@observer
export default class ContactsList extends Component {
    constructor(props) {
        super(props)
    }
    addContact(_id) {
        const {UserStore, ContactsStore} = this.props.rootStore
        fetch(`${apiAddr}/contacts/add`,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${UserStore.token}` 
            },
            body: JSON.stringify({
                _id
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 0 && data.flag === 0) {
                UserStore.updateContacts(data.data)
                ContactsStore.setContactsList(data.data)
            } else {
                Alert.alert(data.message)
            }
        }).catch(err => {
            alert(err)
        })
    }
    render() {
        const { ContactsStore, UserStore } = this.props.rootStore
        return (
            ContactsStore.contactsList.map((item, index) =>   
            <TouchableOpacity
                onPress={() => this.props.goChat(item)}
                key={index} 
                style={styles.item}
            >
                <Image source={{uri: item.icon}} style={styles.icon}/>
                <Text style={styles.name}>{item.name}</Text>
                {item.search && (UserStore.userInfo.contacts.some(_ => _._id === item._id) ? 
                <Text style={styles.hadContact}>已存在</Text> : 
                <TouchableOpacity onPress={() => this.addContact(item._id)} style={styles.addBtn}>
                    <Image source={require('../../static/imgs/add-contact.png')} style={styles.addIcon}/>
                </TouchableOpacity>)}
            </TouchableOpacity>
            )
        )
    }
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        padding: 10,
        paddingRight: 0,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    icon: {
        width: 30,
        height: 30,
    },
    name: {
        flex: 5,
        paddingLeft: 10
    },
    addBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        minWidth: 30,
        height: 30,
        marginRight: 10,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: .5
    },
    addIcon: {
        width: 26,
        height: 26,
    },
    hadContact: {
        color: '#666',
        marginRight: 10
    }
})