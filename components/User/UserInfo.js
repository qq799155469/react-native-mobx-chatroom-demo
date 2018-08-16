import React, {Component} from 'react'
import {
    Image,
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import  ImagePicker from 'react-native-image-picker'
import { theme } from '../../config'

@inject('rootStore')
@observer
export default class UserInfo extends Component {
    constructor(props) {
        super(props)
        const {UserStore} = this.props.rootStore
        this.state = {
            avatarSource: UserStore.userInfo.icon,
            photoOptions: {
                //底部弹出框选项
                title:'请选择',
                cancelButtonTitle:'取消',
                takePhotoButtonTitle:'拍照',
                chooseFromLibraryButtonTitle:'选择相册',
                quality:0.75,
                allowsEditing:true,
                noData:false,
                storageOptions: {
                    skipBackup: true,
                    path:'images'
                }
            }
        }
    }
    cameraAction = () =>{
        
        ImagePicker.showImagePicker(this.state.photoOptions, (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
        
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        
            this.setState({
              avatarSource: source
            });
          }
        });
    }
    render() {
        const {UserStore} = this.props.rootStore
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.cameraAction()}>
                    <Image 
                    source={{uri: this.state.avatarSource}} 
                    style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={styles.name}>{UserStore.userInfo.name}</Text>
                <View style={styles.info}>
                    <Text style={styles.age}>{UserStore.userInfo.age || '神秘'}</Text>
                    <Image style={styles.sex} source={UserStore.userInfo.sex ? require('../../static/imgs/sex-man.png') : require('../../static/imgs/sex-woman.png')}/>
                </View>
                <Text style={styles.intro}>简介：{UserStore.userInfo.intro || '空空如也~'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.color.dark,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadAvatar: {
        width: 200,
        height: 80
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
        lineHeight: 20,
        marginBottom: 3
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