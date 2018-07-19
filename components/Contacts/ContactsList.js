import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { apiAddr } from '../../config'

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
        const { ContactsStore } = this.props.rootStore
        return (
            ContactsStore.contactsList.map((item, index) => 
            <TouchableOpacity
                onPress={() => this.props.goChat(item)}
                key={index} 
            >
                <View style={styles.item}>
                    <Image source={{uri: item.icon}} style={styles.icon}/>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.search && <TouchableOpacity onPress={() => this.addContact(item._id)} style={styles.addBtn}>
                        <Text>添加</Text>
                    </TouchableOpacity>}
                </View>
            </TouchableOpacity>
            )
        )
    }
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        padding: 10,
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
        flex: 0.5
    }
})