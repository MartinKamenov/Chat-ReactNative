import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ChatDetailsComponent = ({ user, showChat }) => {
    return (
        <View>
            <TouchableHighlight onPress={() => showChat(user.chatId)}>
                <View>
                    <Image style={styles.profileImage} source={{uri: user.imageUrl}}/>
                    <Text style={styles.usernameText}>{user.username}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    usernameText: {
        color: '#ffffff'
    }
});

ChatDetailsComponent.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        chatId: PropTypes.string.isRequired
    }).isRequired,
    showChat: PropTypes.func.isRequired
};
 
export default ChatDetailsComponent;