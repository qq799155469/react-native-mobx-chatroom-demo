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
        width: '95%',
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: '2.5%',
        marginRight: '2.5%'
    }
})