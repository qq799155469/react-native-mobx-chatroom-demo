import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

class EditView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    render() {
        return (
            <TextInput
                style={styles.editView}
                onChangeText={(text) => this.setState({text})}
                placeholder={this.props.tip}>
            </TextInput>
        )
    }
}

class SubmitBtn extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity 
                onPress={() => this.props.goChat()}
                style={styles.loginTextView}>
                <Text style={styles.loginText} >
                    {this.props.name}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernamePlace: '请输入账号',
            pwdPlace: '请输入密码'
        }
    }
    goChat() {
        this.props.navigation.navigate('Chat')
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.bgImage}>
                </ImageBackground>
                <View>
                    <EditView tip={this.state.usernamePlace}></EditView>
                    <EditView tip={this.state.pwdPlace}></EditView>
                </View>
                <View>
                    <SubmitBtn
                        goChat={() => this.goChat()}
                        name='登录'>
                    </SubmitBtn>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 15
    },
    editView: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    bgImage: {
        width: 100,
        height: 100
    },
    loginText: {
        color: '#ffffff',
        fontWeight: 'bold',
        width:30,
    },
    loginTextView: {
        marginTop: 10,
        height:50,
        backgroundColor: '#3281DD',
        borderRadius:5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
})