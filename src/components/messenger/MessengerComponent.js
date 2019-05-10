import React, { Component } from 'react';
import { View, Button, TextInput, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import constants from '../../constants/constants';
import apiService from '../../services/apiService';
import PropTypes from 'prop-types';
import UserMessengerComponent from './UserMessengerComponent';

class MessengerComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chat',
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
        if(!message.length) {
            return;
        }
        const connection = this.state.connection;
        connection.send(message);
        this.clearMessage();
    }
    componentDidMount() {
        const navigation = this.props.navigation;
        const chatId = navigation.getParam('chatId', '1');
        this.fetchMessages(chatId)
        
        const connection = new WebSocket(constants.WS_URL + chatId);
        this.setState({connection});
        this.showMessage(connection);
    }

    fetchMessages(id) {
        apiService.getMessagesFromMessenger(id)
            .then((response) => {
                let jsonResponse = response.json();
                return jsonResponse;
            })
            .then((messages) => {
                this.setState({ messages });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    showMessage(connection) {
        connection.onmessage = evt => {
            let message = evt.data;
            message = JSON.parse(message);
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
        let messages = this.state.messages;
        let messageGroups = [];
        let newGroup = [];
        messages.forEach((message, i) => {
            if(i !== 0 && message.userId !== messages[i - 1].userId) {
                if(i === messages.length - 1) {
                    messageGroups.push(newGroup);
                    newGroup = [message];
                    messageGroups.push(newGroup);
                    return;
                }
                messageGroups.push(newGroup);
                newGroup = [message];
            } else if(i === messages.length - 1) {
                newGroup.push(message);
                messageGroups.push(newGroup);
            } else {
                newGroup.push(message);
            }
        });

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <ScrollView style={styles.scrollContainer}>
                    {messageGroups.map((messageGroup, i) => {
                        return (<UserMessengerComponent
                            key={i}
                            messages={messageGroup} 
                            username={messageGroup[0].username}
                            isMine={messageGroup[0].isMine}
                            imageUrl={messageGroup[0].imageUrl}/>);
                    })}
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
                <View style={{ height: 0 }} />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollContainer: {
        width: '100%',
    },
    messangeScrollView: {
        height: '80%'
    },
    senderContainer: {
        width: '100%',
        height: '20%'
    },
    messageInput: {
        height: '50%',
        width: '100%',
        backgroundColor: constants.SECONDARY_COLOR,
        color: constants.PRIMARY_COLOR
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