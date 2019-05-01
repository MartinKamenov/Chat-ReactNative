import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import apiService from '../../services/apiService';
import constants from '../../constants/constants';

class RegisterComponent extends Component {
    static navigationOptions = {
        title: 'Register',
        headerTitleStyle: {
            color: '#ffffff'
        },
        headerStyle: {
            backgroundColor: '#000000'
        }
    };
    state = {
        username: '',
        email: '',
        password: '',
        passwordRepeat: ''
    }

    sendRegisterRequest = () => {
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const passwordRepeat = this.state.passwordRepeat;
        if(password !== passwordRepeat) {
            return;
        }
        apiService.registerUser(username, email, password)
            .then(res => {
                const message = res['_bodyText'];
                ToastAndroid.show(message, 5000);
                if(message === constants.REGISTER_SUCCESS_MESSAGE) {
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
    render() { 
        return (
            <View>
                <TextInput 
                    placeholder='Username' 
                    onChangeText={(text) => this.changeStateValue('username', text)}/>
                <TextInput 
                    placeholder='Email' 
                    onChangeText={(text) => this.changeStateValue('email', text)}/>
                <TextInput 
                    placeholder='Password' 
                    onChangeText={(text) => this.changeStateValue('password', text)}/>
                <TextInput 
                    placeholder='Password confirm' 
                    onChangeText={(text) => this.changeStateValue('passwordRepeat', text)}/>
                <Button title='Register' onPress={this.sendRegisterRequest}/>
            </View>
        );
    }
}
 
export default RegisterComponent;