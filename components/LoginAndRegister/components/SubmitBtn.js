import React, {Component} from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export default class SubmitBtn extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity 
                onPress={() => this.props.submitFn()}
                style={styles.loginTextView}>
                <Text style={styles.loginText} >
                    {this.props.name}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    loginText: {
        color: '#ffffff',
        fontWeight: 'bold',
        width:30,
    },
    loginTextView: {
        marginTop: 25,
        width: '95%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        height:48,
        backgroundColor: '#3281DD',
        borderRadius:5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    }
})