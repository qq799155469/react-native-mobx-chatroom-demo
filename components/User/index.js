import React, {Component} from 'react'
import {
    View,
    Image,
    StyleSheet
} from 'react-native'

import UserInfo from './UserInfo'
import UserSetting from './UserSetting'

export default class User extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '我的',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../static/imgs/user.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../static/imgs/user.png')}/>
            );
        }
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
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    }
})