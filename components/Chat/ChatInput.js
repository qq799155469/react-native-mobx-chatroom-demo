'use strict'
import React, {Component} from 'react'
import {observable, action, autorun} from 'mobx'
import {observer} from 'mobx-react'
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Keyboard
} from 'react-native'

@observer
export default class ChatInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    keyboardType='default'
                    style={styles.input}
                    onChangeText={(text) => this.setState({message: text})}
                />
                <View style={styles.sendBtnWrap}>
                    <Button
                        title='发送'
                        color='#fff'
                        onPress={() => this.props.store.addChatList(this.state.message)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 0.1,
        backgroundColor: '#333',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        padding: 10
    },
    sendBtnWrap: {
        width: '20%',
        height: 40
    }
})