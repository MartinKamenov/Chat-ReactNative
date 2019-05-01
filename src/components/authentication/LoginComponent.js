import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import apiService from '../../services/apiService';
import constants from '../../constants/constants';

class LoginComponent extends Component {
    static navigationOptions = {
        title: 'Login',
        headerTitleStyle: {
            color: '#ffffff'
        },
        headerStyle: {
            backgroundColor: '#000000'
        }
    };
    state = {
        username: '',
        password: ''
    }

    sendLoginRequest = () => {
        const username = this.state.username;
        const password = this.state.password;
        apiService.loginUser(username, password)
            .then(res => {
                const message = res['_bodyText'];
                ToastAndroid.show(message, 5000);
                if(message === constants.LOGIN_SUCCESS_MESSAGE) {
                    const { navigate } = this.props.navigation;
                    navigate('MessengerComponent');
                }
            });
    }

    changeStateValue = (field, value) => {
        const state = this.state;
        state[field] = value;
        this.setState(state);
    }

    navigateToRegisterComponent = () => {
        const { navigate } = this.props.navigation;
        navigate('RegisterComponent');
    }
    render() { 
        return (
            <View>
                <TextInput 
                    placeholder='Username' 
                    onChangeText={(text) => this.changeStateValue('username', text)}/>
                <TextInput 
                    placeholder='Password' 
                    onChangeText={(text) => this.changeStateValue('password', text)}/>
                <Button title='Login' onPress={this.sendLoginRequest}/>
                <Button title='Go to Sign up' onPress={this.sendLoginRequest}/>
            </View>
        );
    }
}

LoginComponent.propTypes = {
    navigation: PropTypes.object.isRequired
};
 
export default LoginComponent;