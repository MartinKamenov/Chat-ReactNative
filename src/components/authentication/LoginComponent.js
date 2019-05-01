import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid } from 'react-native';
import apiService from '../../services/apiService';

class LoginComponent extends Component {
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
                    placeholder='Password' 
                    onChangeText={(text) => this.changeStateValue('password', text)}/>
                <Button title='Login' onPress={this.sendLoginRequest}/>
            </View>
        );
    }
}
 
export default LoginComponent;