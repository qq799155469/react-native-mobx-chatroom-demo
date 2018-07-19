import React, {Component} from 'react'
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

import { apiAddr } from '../../config'

@inject('rootStore')
@observer
export default class ContactsSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchKey: ''
        }
    }
    fetchContact() {
        const {ContactsStore} = this.props.rootStore
        fetch(`${apiAddr}/contacts/search`,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: this.state.searchKey
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 0 && data.flag === 0) {
                if (data.data) {
                    for (let key in data.data) {
                        data.data[key] = {
                            _id: data.data[key]._id,
                            icon: data.data[key].icon,
                            name: data.data[key].name,
                            search: 1
                        }
                    }
                    setTimeout(() => ContactsStore.setContactsList(data.data), 0)
                }
            } else {
                Alert.alert(data.message)
            }
        }).catch(err => {
            alert(err)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                style={styles.search}
                onChangeText={text => this.setState({searchKey: text})}
                />
                <TouchableOpacity 
                style={styles.add} 
                onPress={() => this.fetchContact()}
                >
                    <Text style={styles.addText}>搜索</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: '#efefef',
        padding: 5,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    search: {
        height: '100%',
        flex: 4,
        backgroundColor: '#fff',
        padding: 10,
        borderRightWidth: 0.5,
        borderColor: '#eee'
    },
    add: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    addText: {
        color: '#333'
    }
})