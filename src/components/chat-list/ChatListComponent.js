import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import apiService from '../../services/apiService';
import ChatDetailsComponent from './ChatDetailsComponent';
import constants from '../../constants/constants';
import LoadingComponent from '../loading/LoadingComponent';

class ChatListComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        
        const navigationOptions = {
            title: 'Messenger',
            headerTitleStyle: {
                color: constants.SECONDARY_COLOR
            },
            headerStyle: {
                backgroundColor: constants.PRIMARY_COLOR
            },
            headerTintColor: constants.SECONDARY_COLOR
        };

        if(params.fetchChats && params.logout) {
            navigationOptions.headerRight = (
                <View style={styles.headerButtonsWrapper}>
                    <Button
                        onPress={params.fetchChats}
                        title='Refresh'
                    />
                    <Button
                        onPress={params.logout}
                        title='Logout'
                    />
                </View>
            );
        }
        
        return navigationOptions;
    };
    state = {
        chats: [],
        isLoading: true
    }

    showChat = (chatId) => {
        const { navigate } = this.props.navigation;
        navigate('MessengerComponent', { chatId });
    }

    componentDidMount() {
        this.props.navigation.setParams({ fetchChats: this._fetchChats, logout: this._logout });
        this._fetchChats();
    }

    _fetchChats = () => {
        this.setState({ isLoading: true });
        apiService.getOtherUsers()
        .then((response) => {
            let jsonResponse = response.json();
            return jsonResponse;
        })
        .then((users) => {
            this.setState({ chats: users, isLoading: false });
        }).catch((er) => {
            console.log(er.message);
        });
    }

    _logout = () => {
        apiService.logout()
        .then((response) => {
            console.log(response);
        });
    }
    render() {
        if(this.state.isLoading) {
            return (
                <View style={styles.chatListContainer}>
                    <LoadingComponent loadingText='Fetching messages'/>
                </View>
            );
        }
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
    },
    headerButtonsWrapper: {
        flexDirection: 'row'
    }
});
 
export default ChatListComponent;