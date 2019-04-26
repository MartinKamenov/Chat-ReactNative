import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

class LoginComponent extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    sendLoginRequest() {
        
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
                <Button title='Login' onPress={this.sendLoginRequest}/>
            </View>
        );
    }
}
 
export default LoginComponent;