import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

export default class UserSetting extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>个人信息</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>帮助</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>意见</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        paddingTop: 10
    },
    item: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        padding: 10,
        paddingLeft: 20,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
    },
    itemText: {
        color: '#333',
        fontSize: 12,
        lineHeight: 30
    }
})