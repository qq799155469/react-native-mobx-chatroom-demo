import React, {Component} from 'react'
import {
    View
} from 'react-native'
import {
    EditView,
    SubmitBtn
} from './components'

export default class MessageList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            this.props.list.map((item, index) => 
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.message}</Text>
                </View>
            )
        )
    }
}