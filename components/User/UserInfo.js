import React, {Component} from 'react'
import {
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

@inject('rootStore')
@observer
export default class UserInfo extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {UserStore} = this.props.rootStore
        return (
            <TouchableOpacity style={styles.container}>
                <Image
                style={styles.icon}
                source={{uri: UserStore.userInfo.icon}}
                />
                <Text style={styles.name}>{UserStore.userInfo.name}</Text>
                <Text style={styles.info}>信息：{UserStore.userInfo.age || '神秘'}</Text>
                <Text style={styles.intro}>简介：{UserStore.userInfo.intro || '空空如也~'}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dd9590',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: '#fff',
        borderWidth: 2,
        marginBottom: 10
    },
    name: {
        fontSize: 16,
        color: '#fff',
        lineHeight: 20
    },
    info: {
        fontSize: 10,
        color: '#fff',
        lineHeight: 20
    },
    intro: {
        fontSize: 10,
        color: '#fff',
        lineHeight: 20
    }
})