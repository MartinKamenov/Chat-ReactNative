import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const MessageComponent = ({ message }) => {
    return (
        <Text style={[styles.anotherUserMessage, styles.message]}>{message.text}</Text>
    );
};

const styles = StyleSheet.create({
    message: {
        borderRadius: 15,
        width: '40%',
        padding: 10,
        marginTop: 10
    },
    myMessage: {
        alignSelf: 'flex-start',
        color: '#FFFFFF',
        backgroundColor: '#0099FF'
    },
    anotherUserMessage: {
        alignSelf: 'flex-end',
        color: '#000000',
        backgroundColor: '#F1F0F0'
    }
});

MessageComponent.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dateCreated: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};
 
export default MessageComponent;