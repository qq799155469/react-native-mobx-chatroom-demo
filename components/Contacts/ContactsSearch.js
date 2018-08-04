import React, {Component} from 'react'
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    View
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

import { apiAddr, theme } from '../../config'

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
                    <Text style={styles.addText}><Image style={styles.searchIcon} source={require('../../static/imgs/search.png')}/></Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: theme.color.bg,
        padding: 10,
        paddingTop: 0,
        paddingRight: 0,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    search: {
        height: '100%',
        flex: 5,
        backgroundColor: '#fff',
        padding: 10,
        borderRightWidth: 0.5,
        borderColor: '#eee',
        borderRadius: 2
    },
    searchIcon: {
        width: 26,
        height: 26,
        paddingTop: 2
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