import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import apiService from '../../services/apiService';
import ChatDetailsComponent from './ChatDetailsComponent';
import constants from '../../constants/constants';

class ChatListComponent extends Component {
    static navigationOptions = () => {
        return {
            title: 'Messenger',
            headerTitleStyle: {
                color: constants.SECONDARY_COLOR
            },
            headerStyle: {
                backgroundColor: constants.PRIMARY_COLOR
            },
            headerTintColor: constants.SECONDARY_COLOR
        };
    };
    state = {
        chats: []
    }

    showChat = (chatId) => {
        const { navigate } = this.props.navigation;
        navigate('MessengerComponent', { chatId });
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
            <View style={styles.chatListContainer}>
                <ScrollView>
                    <View>
                    {
                        this.state.chats.map((chat, i) => {
                            return (
                                <ChatDetailsComponent 
                                    user={chat} 
                                    showChat={this.showChat} 
                                    key={i}/>
                            );
                        })
                    }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chatListContainer: {
        backgroundColor: constants.PRIMARY_COLOR,
        height: '100%',
        width: '100%'
    }
});
 
export default ChatListComponent;