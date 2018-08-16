import React, {Component} from 'react'
import {
    View,
    Image,
    TextInput,
    StyleSheet
} from 'react-native'
import { theme } from '../../../config'

export default class EditView extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.type === 'username' && <Image style={styles.icon} source={require('../../../static/imgs/username.png')}/>}
                {this.props.type === 'password' && <Image style={styles.icon} source={require('../../../static/imgs/password.png')}/>}
                {this.props.type === 'nickname' && <Image style={styles.icon} source={require('../../../static/imgs/nickname.png')}/>}
                <TextInput
                    style={styles.editView}
                    onChangeText={text => this.props.changeText(text)}
                    placeholder={this.props.tip}
                    color={theme.color.white}
                    placeholderTextColor={theme.color.lightdark}
                    selectionColor={theme.color.white}>
                </TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    editView: {
        flex: 9
    },
    icon: {
        width: 15,
        height: 15,
        marginRight: 15
    }
})