import React, { Component } from 'react';
import { View, Text } from 'react-native';
import apiService from '../../services/apiService';

class ChatListComponent extends Component {
    state = {
        chats: []
    }

    componentDidMount() {
        apiService.getOtherUsers()
        .then((response) => {
            let jsonResponse = response.json();
            return jsonResponse;
        })
        .then((users) => {
            this.setState({ chats: users });
        }).catch((er) => {
            console.log(er.message);
        });
    }
    render() { 
        return (
            <View>
                {
                    this.state.chats.map((chat, i) => {
                        return <Text key={i}>{chat.username}</Text>;
                    })
                }
            </View>
        );
    }
}
 
export default ChatListComponent;