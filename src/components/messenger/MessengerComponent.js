import React, { Component } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import constants from '../../constants/constants';

class MessengerComponent extends Component {
    state = { 
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
        const connection = new WebSocket(constants.WS_URL + id);
        this.setState({connection});
        this.showMessage(connection);
    }

    showMessage(connection) {
        connection.onmessage = evt => { 
            this.setState({
                recievedMessage: evt.data
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
                    <Text style={styles.message}>{this.state.recievedMessage}</Text>
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