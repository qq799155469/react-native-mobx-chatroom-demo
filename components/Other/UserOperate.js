import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import { theme } from '../../config'

export default class OtherOperate extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                style={styles.send}
                onPress={() => this.props.goChat()}
                >
                    <Text style={styles.sendText}>发送消息</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        paddingTop: 50,
        alignItems: 'center'
    },
    send: {
        width: 200,
        height: 50,
        backgroundColor: theme.color.green,
        justifyContent: 'center',
        borderRadius: 25,
        alignItems: 'center'
    },
    sendText: {
        color: '#fff'
    }
})