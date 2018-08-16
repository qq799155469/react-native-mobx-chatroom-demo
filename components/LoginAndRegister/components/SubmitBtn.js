import React, {Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import { theme } from '../../../config'

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
                <Image style={styles.btnIcon} source={require('../../../static/imgs/enter.png')}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    loginText: {
        color: theme.color.white,
        fontWeight: 'bold',
        width: 30,
    },
    btnIcon: {
        marginLeft: 10,
        width: 15,
        height: 15
    },
    loginTextView: {
        marginTop: 25,
        width: '66.7%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        height: 40,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: theme.color.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    }
})