import React, { Component } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import constants from '../../constants/constants';
import apiService from '../../services/apiService';

class MessengerComponent extends Component {
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
            console.log(evt.data);
            const message = evt.data;
            const messages = this.state.messages;
            messages.push(message);
            this.setState({
                messages,
                recievedMessage: message
            })
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
    message: {
        color: '#ffffff'
    },
    senderContainer: {
        width: '100%',
        position: 'absolute',
        bottom:0
    },
    messageInput: {
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#000000'
    },
    sendButton: {
        width: '100%'
    }
});
 
export default MessengerComponent;