import React, { Component } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import constants from '../../constants/constants';
import apiService from '../../services/apiService';
import PropTypes from 'prop-types';

class MessengerComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chat',
            headerTitleStyle: {
                color: '#ffffff'
            },
            headerStyle: {
                backgroundColor: '#000000'
            },
            headerTintColor: '#ffffff'
        };
    };
    state = {
        messages: [],
        recievedMessage : '',
        newMessage: '',
        connection: {}
    }

    changeMessage = (text) => {
        this.setState({ newMessage: text });
    }

    sendMessage = () => {
        const message = this.state.newMessage;
        const connection = this.state.connection;
        connection.send(message);
        this.clearMessage();
    }
    componentDidMount() {
        const id = 1;
        apiService.getMessagesFromMessenger(id)
            .then((response) => {
                return response.json();
            })
            .then((messages) => {
                this.setState({ messages });
            })
            .catch((error) => {
                console.error(error);
            });
        const connection = new WebSocket(constants.WS_URL + id);
        this.setState({connection});
        this.showMessage(connection);
    }

    showMessage(connection) {
        connection.onmessage = evt => {
            const message = evt.data;
            const messages = this.state.messages;
            messages.push(message);
            this.setState({
                messages,
                recievedMessage: message
            });
        };
    }

    clearMessage() {
        this.setState({ newMessage: '' });
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        this.state.messages.map((message, i) => {
                            return (
                                <Text 
                                    key={i}
                                    style={styles.message}>
                                    {message}
                                </Text>
                            );
                        })
                    }
                </ScrollView>
                <View style={styles.senderContainer}>
                    <TextInput
                        style={styles.messageInput}
                        value={this.state.newMessage} 
                        placeholder='Text'
                        onChangeText={(text) => this.changeMessage(text)}/>
                    <Button
                        style={styles.sendButton}
                        title='Send'
                        onPress={this.sendMessage}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messangeScrollView: {
        height: '80%'
    },
    message: {
        color: '#ffffff'
    },
    senderContainer: {
        width: '100%',
        height: '20%'
    },
    messageInput: {
        height: '50%',
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#000000'
    },
    sendButton: {
        height: '50%',
        width: '100%'
    }
});

MessengerComponent.propTypes = {
    navigation: PropTypes.object.isRequired
};
 
export default MessengerComponent;