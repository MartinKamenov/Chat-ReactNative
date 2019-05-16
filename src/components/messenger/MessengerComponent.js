import React, { Component } from 'react';
import { 
    Platform,
    View,
    Button,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native';
import constants from '../../constants/constants';
import apiService from '../../services/apiService';
import PropTypes from 'prop-types';
import UserMessengerComponent from './UserMessengerComponent';
import LoadingComponent from '../loading/LoadingComponent';

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
        connection: {},
        isLoading: true,
        isInitialFetch: true,
        lastMessageId: '1',
        chatId: 1,
        isLastMessagePage: false,
        scrollOffset: 0,
        visibleDateMessageId: ''
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
        this.fetchMessages(chatId, this.state.lastMessageId);
        
        const connection = new WebSocket(constants.WS_URL + chatId);
        this.setState({connection, chatId});
        this.showMessage(connection);
    }

    fetchMessages(id, lastMessageId) {
        this.setState({ isLoading: true });
        apiService.getMessagesFromMessenger(id, lastMessageId)
            .then((response) => {
                let jsonResponse = response.json();
                return jsonResponse;
            })
            .then((messageObject) => {
                const newMessages = messageObject.messages;
                const messages = newMessages.concat(this.state.messages);

                const lastMessageId = messageObject.lastMessageId;
                const isLastMessagePage = messageObject.isLastMessagePage;
                this.setState({ messages, lastMessageId, isLastMessagePage, isLoading: false },
                    () => {
                        if(this.state.isInitialFetch) {
                            setTimeout(this.scrollViewToBottom);
                            this.setState({ isInitialFetch: false });
                        }
                    }
                );
            })
            .catch((error) => {
                this.setState({ isLoading: false });
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
            }, () => {
                setTimeout(this.scrollViewToBottom);
            });
        };
    }

    clearMessage() {
        this.setState({ newMessage: '' });
    }

    scrollViewToBottom = () => {
        this.scrollView.scrollToEnd({ animated: true });
    }

    handleScrollMessenger = (event) => {
        const offset = event.nativeEvent.contentOffset.y;

        if(offset <= constants.OFFSET_INFINITE_SCROLL &&
                offset < this.state.scrollOffset && !this.state.isLastMessagePage) {
            const chatId = this.state.chatId;
            this.fetchMessages(chatId, this.state.lastMessageId);
        }

        this.setState({scrollOffset: offset});
    }

    showDateForMessage = (id) => {
        this.setState({ visibleDateMessageId: id });
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
            <KeyboardAvoidingView style={styles.container}
                behavior='padding'
                keyboardVerticalOffset={
                    Platform.select({
                        ios: () => 0,
                        android: () => 80
                    })()
                }>
                {(() => {
                    if(this.state.isLoading) {
                        return <LoadingComponent loadingText='Fetching older messages'/>;
                    }
                })()}
                <ScrollView
                    style={styles.scrollContainer}
                    ref={ref => this.scrollView = ref}
                    onScroll={this.handleScrollMessenger}>
                    {messageGroups.map((messageGroup, i) => {
                        return (<UserMessengerComponent
                            key={i}
                            messages={messageGroup} 
                            username={messageGroup[0].username}
                            isMine={messageGroup[0].isMine}
                            imageUrl={messageGroup[0].imageUrl}
                            showDateForMessage={this.showDateForMessage}
                            visibleDateMessageId={this.state.visibleDateMessageId}/>);
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
        flex: 1,
    },
    senderContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50
    },
    messageInput: {
        flex: 1,
        backgroundColor: constants.SECONDARY_COLOR,
        color: constants.PRIMARY_COLOR
    },
    sendButton: {
        justifyContent: 'center',
        fontWeight: 'bold',
        width: 50
    }
});

MessengerComponent.propTypes = {
    navigation: PropTypes.object.isRequired
};
 
export default MessengerComponent;