import React, {Component} from 'react'
import {
    View,
    Alert
} from 'react-native'
import {
    EditView,
    SubmitBtn
} from './components'
import MessageList from './components/MessageList'

export default class MessageBox extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <MessageList/>
        )
    }
}