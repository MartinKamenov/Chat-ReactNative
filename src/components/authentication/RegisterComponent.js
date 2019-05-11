import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid, Image } from 'react-native';
import PropTypes from 'prop-types';
import apiService from '../../services/apiService';
import constants from '../../constants/constants';
import { StackActions, NavigationActions } from 'react-navigation';
import LoadingComponent from '../loading/LoadingComponent';

class RegisterComponent extends Component {
    static navigationOptions = {
        title: 'Register',
        headerTitleStyle: {
            color: constants.SECONDARY_COLOR
        },
        headerStyle: {
            backgroundColor: constants.PRIMARY_COLOR
        }
    };
    state = {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        imageUrl: '',
        isLoading: false
    }

    sendRegisterRequest = () => {
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const passwordRepeat = this.state.passwordRepeat;
        const imageUrl = this.state.imageUrl;
        if(password !== passwordRepeat) {
            return;
        }

        this.setState({ isLoading: true });
        apiService.registerUser(username, email, password, imageUrl)
            .then(res => {
                const message = res['_bodyText'];
                ToastAndroid.show(message, constants.TOAST_DUARTION);
                this.setState({ isLoading: false });
                if(message === constants.REGISTER_SUCCESS_MESSAGE) {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                          NavigationActions.navigate({ routeName: 'ChatListComponent'})
                        ] 
                    });
                    
                    this.props.navigation.dispatch(resetAction);
                }
            });
    }

    changeStateValue = (field, value) => {
        const state = this.state;
        state[field] = value;
        this.setState(state);
    }

    navigateToLoginComponent = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginComponent'})
            ] 
        });

        this.props.navigation.dispatch(resetAction);
    }
    render() {
        if(!this.state.isLoading) {
            return (
                <View>
                    <View style={styles.container}>
                        <Image style={styles.appIcon} source={require('../../../assets/icon.png')}/>
                        <TextInput 
                            placeholder='Username' 
                            onChangeText={(text) => this.changeStateValue('username', text)}/>
                        <TextInput 
                            placeholder='Email' 
                            onChangeText={(text) => this.changeStateValue('email', text)}/>
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={true} 
                            onChangeText={(text) => this.changeStateValue('password', text)}/>
                        <TextInput 
                            placeholder='Password confirm'
                            secureTextEntry={true}
                            onChangeText={(text) => this.changeStateValue('passwordRepeat', text)}/>
                        <TextInput 
                            placeholder='Profile image url' 
                            onChangeText={(text) => this.changeStateValue('imageUrl', text)}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title='Register' onPress={this.sendRegisterRequest}/>
                        <Button title='Go to Login' onPress={this.navigateToLoginComponent}/>
                    </View>
                </View>
            );
        }

        return (
            <LoadingComponent loadingText='Please wait to finish registration'/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    appIcon: {
        width: '50%',
        aspectRatio: 1
    },
    input: {
        width: '50%',
        fontSize: 16
    },
    buttonContainer: {
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%'
    }
});

RegisterComponent.propTypes = {
    navigation: PropTypes.object.isRequired
};
 
export default RegisterComponent;