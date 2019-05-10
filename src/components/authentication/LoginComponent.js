import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import apiService from '../../services/apiService';
import constants from '../../constants/constants';
import { StackActions, NavigationActions } from 'react-navigation';
import LoadingComponent from '../loading/LoadingComponent';

class LoginComponent extends Component {
    static navigationOptions = {
        title: 'Login',
        headerTitleStyle: {
            color: constants.SECONDARY_COLOR
        },
        headerStyle: {
            backgroundColor: constants.PRIMARY_COLOR
        }
    };
    state = {
        username: '',
        password: '',
        isLoading: false
    }

    sendLoginRequest = () => {
        const username = this.state.username;
        const password = this.state.password;
        this.setState({ isLoading: true });
        apiService.loginUser(username, password)
            .then(res => {
                const message = res['_bodyText'];
                ToastAndroid.show(message, constants.TOAST_DUARTION);
                this.setState({ isLoading: false });
                if(message === constants.LOGIN_SUCCESS_MESSAGE) {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                          NavigationActions.navigate({ routeName: 'ChatListComponent'})
                        ] 
                    });
                    
                    this.props.navigation.dispatch(resetAction);
                }
            }).catch((e) => {
                ToastAndroid.show(e.message, constants.TOAST_DUARTION);
                this.setState({ isLoading: false });
            });
    }

    changeStateValue = (field, value) => {
        const state = this.state;
        state[field] = value;
        this.setState(state);
    }

    navigateToRegisterComponent = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'RegisterComponent'})
            ] 
        });

        this.props.navigation.dispatch(resetAction);
    }
    render() {
        if(!this.state.isLoading) {
            return (
                <View>
                    <TextInput 
                        placeholder='Username' 
                        onChangeText={(text) => this.changeStateValue('username', text)}/>
                    <TextInput
                        secureTextEntry={true}
                        placeholder='Password' 
                        onChangeText={(text) => this.changeStateValue('password', text)}/>
                    <Button title='Login' onPress={this.sendLoginRequest}/>
                    <Button title='Go to Sign up' onPress={this.navigateToRegisterComponent}/>
                </View>
            );
        }

        return (
            <LoadingComponent loadingText='Please wait to finish login'/>
        );
    }
}

LoginComponent.propTypes = {
    navigation: PropTypes.object.isRequired
};
 
export default LoginComponent;