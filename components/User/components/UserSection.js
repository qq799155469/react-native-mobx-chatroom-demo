import React, {Component} from 'react'
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import { theme } from '../../../config'

export default class UserSetting extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity style={this.props.hasMargin ? styles.divider : styles.item} onPress={() => this.props.action()}>
                <Text style={this.props.hasMargin ? styles.dividerText : styles.itemText}>{this.props.title}</Text>
            </TouchableOpacity> 
        )
    }
}

const styles = StyleSheet.create({
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
    },
    divider: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        padding: 10,
        paddingLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#eee',
        marginTop: 20
    },
    dividerText: {
        color: theme.color.pink,
        fontSize: 12,
        lineHeight: 30
    }
})