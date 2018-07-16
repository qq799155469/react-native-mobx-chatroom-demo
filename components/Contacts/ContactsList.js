import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

@inject('rootStore')
@observer
export default class ContactsList extends Component {
    constructor(props) {
        super(props)
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
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
            )
        )
    }
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    icon: {
        width: 30,
        height: 30
    }
})