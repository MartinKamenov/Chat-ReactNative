import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid, Image, AsyncStorage } from 'react-native';
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

    componentDidMount() {
        this._retrieveData();
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
                    this._storeData()
                        .then(() => {
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'ChatListComponent'})
                                ] 
                            });
                            
                            this.props.navigation.dispatch(resetAction);
                        });
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

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('username', this.state.username);
            await AsyncStorage.setItem('password', this.state.password);
        } catch (error) {
            console.log(error.message);
        }
    }

    _retrieveData = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            const password = await AsyncStorage.getItem('password');
            if (!username || !password) {
                return;
            }

            this.setState({ username, password }, () => {
                //this.sendLoginRequest();
            });

        } catch (error) {
          // Error retrieving data
        }
    }

    render() {
        if(!this.state.isLoading) {
            return (
                <View>
                    <View style={styles.container}>
                        <Image style={styles.appIcon} source={require('../../../assets/icon.png')}/>
                        <TextInput
                            value={this.state.username}
                            style={styles.input}
                            placeholder='Username' 
                            onChangeText={(text) => this.changeStateValue('username', text)}/>
                        <TextInput
                            value={this.state.password}
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder='Password' 
                            onChangeText={(text) => this.changeStateValue('password', text)}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title='Login'
                            onPress={this.sendLoginRequest}/>
                        <Button
                            title='Go to Sign up'
                            onPress={this.navigateToRegisterComponent}/>
                    </View>
                </View>
            );
        }

        return (
            <LoadingComponent loadingText='Please wait to finish login'/>
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

LoginComponent.propTypes = {
    navigation: PropTypes.object.isRequired
};
 
export default LoginComponent;