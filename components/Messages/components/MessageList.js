import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

@inject('rootStore')
@observer
export default class MessageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    icon: 'fdsfds',
                    name: 'pipike',
                    time: '2018-6-17',
                    message: 'halahala'
                },
                {
                    icon: 'fdsfds',
                    name: 'pipitian',
                    time: '2018-6-17',
                    message: 'halahala'
                }
            ]
        }
    }
    convertTime(ns) {
        return new Date(parseInt(ns)).toLocaleString()
    }
    render() {
        const {MessagesStore, UserStore} = this.props.rootStore
        return (
            MessagesStore.messagesList.map(item => 
                <TouchableOpacity 
                style={styles.container} 
                onPress={() => this.props.goChat(item)}
                key={item._id}
                >
                    <Image 
                    source={{uri: item.to._id === UserStore.userInfo._id ? item.from.icon : item.to.icon}}
                    style={styles.icon}
                    />
                    <View style={styles.messageBox}>
                        <View style={styles.topMessage}>
                            <Text style={styles.name}>{item.to._id === UserStore.userInfo._id ? item.from.name : item.to.name}</Text>
                            <Text style={styles.time}>{this.convertTime(item.createTime)}</Text>
                        </View>
                        <View style={styles.bottomMessage}>
                            <Text style={styles.message}>{item.content}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    icon: {
        width: 40,
        height: 40
    },
    messageBox: {
        alignItems: 'center',
        flex: 5,
        height: '100%',
        marginLeft: 10
    },
    topMessage: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between'
        // alignItems: 'center'
    },
    bottomMessage: {
        width: '100%',
        height: '50%',
        // alignItems: 'center'
    },
    name: {
        fontSize: 13
    },
    time: {
        color: '#ccc',
        fontSize: 10
    },
    message: {
        color: '#666',
        fontSize: 11
    }
})