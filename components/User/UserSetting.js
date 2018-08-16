import React, {Component} from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

import UserSection from './components/UserSection'

export default class UserSetting extends Component {
    constructor(props) {
        super(props)
    }
    handleToUserInfoEditor() {
        alert('暂未开放')
    }
    handleToLogin() {
        this.props.navigation.navigate('LoginAndRegister')
    }
    render() {
        return (
            <View style={styles.container}>
                <UserSection title='个人信息' action={this.handleToUserInfoEditor.bind(this)}/>
                <UserSection title='帮助' action={this.handleToUserInfoEditor.bind(this)}/>
                <UserSection title='意见' action={this.handleToUserInfoEditor.bind(this)}/>
                <UserSection hasMargin={true} title='切换账号' action={this.props.toLogin}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        paddingTop: 20
    }
    // item: {
    //     width: '100%',
    //     height: 50,
    //     backgroundColor: '#fff',
    //     padding: 10,
    //     paddingLeft: 20,
    //     borderBottomWidth: 0.5,
    //     borderColor: '#eee',
    // },
    // itemText: {
    //     color: '#333',
    //     fontSize: 12,
    //     lineHeight: 30
    // }
})