import React, {Component} from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

import UserInfo from './UserInfo'
import UserSetting from './UserSetting'

export default class User extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '我的'
    })
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <UserInfo/>
                <UserSetting/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})