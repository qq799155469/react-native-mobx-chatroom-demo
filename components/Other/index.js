import React, {Component} from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

import UserInfo from './UserInfo'
import UserOperate from './UserOperate'

@inject('rootStore')
@observer
export default class User extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Ta人信息'
    })
    constructor(props) {
        super(props)
    }
    goChat() {
        const {OtherStore} = this.props.rootStore
        this.props.navigation.navigate('Chat', {
            item: {
                _id: OtherStore.otherInfo._id,
                name: OtherStore.otherInfo.name,
                icon: OtherStore.otherInfo.icon
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <UserInfo/>
                <UserOperate goChat={this.goChat.bind(this)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})