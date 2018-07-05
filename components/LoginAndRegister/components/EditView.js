import React, {Component} from 'react'
import {
    TextInput,
    StyleSheet
} from 'react-native'

export default class EditView extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TextInput
                style={styles.editView}
                onChangeText={text => this.props.changeText(text)}
                placeholder={this.props.tip}>
            </TextInput>
        )
    }
}

const styles = StyleSheet.create({
    editView: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    }
})