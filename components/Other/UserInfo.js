import React, {Component} from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { theme } from '../../config'

@inject('rootStore')
@observer
export default class UserInfo extends Component {
    constructor(props) {
        super(props)
        const {OtherStore} = this.props.rootStore
        this.state = {
            avatarSource: OtherStore.otherInfo.icon,
        }
    }
    render() {
        const {OtherStore} = this.props.rootStore
        return (
            <View style={styles.container}>
                <Image 
                source={{uri: this.state.avatarSource}} 
                style={styles.icon}
                />
                <Text style={styles.name}>{OtherStore.otherInfo.name}</Text>
                <View style={styles.info}>
                    <Text style={styles.age}>{OtherStore.otherInfo.age || '神秘'}</Text>
                    <Image style={styles.sex} source={OtherStore.otherInfo.sex ? require('../../static/imgs/sex-man.png') : require('../../static/imgs/sex-woman.png')}/>
                </View>
                <Text style={styles.intro}>简介：{OtherStore.otherInfo.intro || '空空如也~'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    uploadAvatar: {
        width: 200,
        height: 80
    },
    container: {
        backgroundColor: theme.color.dark,
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
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    age: {
        fontSize: 10,
        color: '#fff',
    },
    sex: {
        marginLeft: 2,
        width: 10,
        height: 8
    },
    intro: {
        fontSize: 10,
        color: '#fff',
        lineHeight: 20
    }
})