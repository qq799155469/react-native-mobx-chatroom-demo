import React, {Component} from 'react'
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

export default class Contacts extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})