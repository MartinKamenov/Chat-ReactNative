import React, { Component } from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';
import constants from '../../constants/constants';

class MessengerComponent extends Component {
    state = { 
        recievedMessage : '',
        newMessage: '',
        connection: {}
    }

    changeMessage = (text) => {
        this.setState({newMessage: text});
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
        this.setState({newMessage: ''});
    }
    render() {
        return (
            <View>
                <ScrollView>
                    <Text>{this.state.recievedMessage}</Text>
                </ScrollView>
                <TextInput value={this.state.newMessage} 
                    placeholder='Text'
                    onChangeText={(text) => this.changeMessage(text)}/>
                <Button title='Send' onPress={this.sendMessage}/>
            </View>
        );
    }
}
 
export default MessengerComponent;