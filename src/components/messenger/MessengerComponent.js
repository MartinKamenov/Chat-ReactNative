import React, { Component } from 'react';
import { View, Text } from 'react-native';

class MessengerComponent extends Component {
    state = { 
        message : "",
        size: 0,
        number: parseInt(Math.random() * 10, 10)
    }

    componentDidMount() {
        this.connection = new WebSocket('ws://192.168.43.181:5000/messenger/1');
        this.connection.onmessage = evt => { 
            this.setState({
                message: evt.data
            })
        };

        setInterval(() => {
            this.connection.send("Message " + this.state.number);
        }, 2000);
    }
    render() {
        return (
            <View>
                <Text>{this.state.message}</Text>
            </View>
        );
    }
}
 
export default MessengerComponent;