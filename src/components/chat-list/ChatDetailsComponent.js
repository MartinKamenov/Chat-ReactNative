import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import constants from '../../constants/constants';

const ChatDetailsComponent = ({ user, showChat }) => (
    <View style={styles.chatDetailsContainer}>
        <TouchableHighlight onPress={() => showChat(user.chatId)}>
            <View style={styles.chatDetailsRow}>
                <Image style={styles.profileImage} source={{uri: user.imageUrl}}/>
                <View>
                    <Text style={styles.usernameText}>{user.username}</Text>
                    <View style={styles.lastMessageRow}>
                        <Text style={styles.lastMessageUsername}>
                            {user.lastMessage.username.substring(0, 20)}:
                        </Text>
                        <Text style={styles.chatText}>
                            {user.lastMessage.text.substring(0, 20)}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    </View>
);

const styles = StyleSheet.create({
    chatDetailsContainer: {
        marginBottom: 10
    },
    chatDetailsRow: {
        flexDirection: 'row',
        height: 70
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 15,
    },
    usernameText: {
        marginLeft: 20,
        color: constants.SECONDARY_COLOR,
        fontSize: 20,
        fontWeight: 'bold',
        height: 35
    },
    lastMessageRow: {
        flexDirection: 'row'
    },
    lastMessageUsername: {
        marginLeft: 20,
        fontSize: 15,
        height: 35,
        color: constants.SECONDARY_COLOR
    },
    chatText: {
        marginLeft: 5,
        fontSize: 15,
        height: 35,
        color: constants.SECONDARY_COLOR
    }
});

ChatDetailsComponent.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        chatId: PropTypes.string.isRequired,
        lastMessage: PropTypes.shape({
            username: PropTypes.string,
            text: PropTypes.string.isRequired,
            dateCreated: PropTypes.string
        })
    }).isRequired,
    showChat: PropTypes.func.isRequired
};
 
export default ChatDetailsComponent;