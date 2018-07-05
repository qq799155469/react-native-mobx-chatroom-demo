import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Button
} from 'react-native'
import { observer } from 'mobx-react'

@observer
export default class SwitchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            operates: [{
                key: 0,
                name: '登录',
                todo: () => {
                    this.props.store.switchOrder(false)
                }
            }, {
                key: 1,
                name: '注册',
                todo: () => {
                    this.props.store.switchOrder(true)
                }
            }]
        }
    }
    render() {
        return (
            <View style={styles.switchBarContainer}>
                {this.state.operates.map((item, index) => (
                <Button 
                    title={item.name}
                    key={index}
                    onPress={() => this.state.operates[index].todo()}
                    style={styles.switchBarBtn}/>))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    switchBarContainer: {
        width: '100%',
        flex: .2,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    switchBarBtn: {
        flex: 1
    }
})