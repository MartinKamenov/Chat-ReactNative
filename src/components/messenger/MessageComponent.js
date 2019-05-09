import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import constants from '../../constants/constants';

const MessageComponent = ({ message }) => {
    if(message.isMine) {
        return <Text style={[styles.myMessage, styles.message]}>{message.text}</Text>;
    }

    return <Text style={[styles.anotherUserMessage, styles.message]}>{message.text}</Text>;
};

const styles = StyleSheet.create({
    message: {
        borderRadius: 15,
        width: '40%',
        padding: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    myMessage: {
        alignSelf: 'flex-end',
        color: constants.SECONDARY_COLOR,
        backgroundColor: '#0099FF'
    },
    anotherUserMessage: {
        alignSelf: 'flex-start',
        color: '#000000',
        backgroundColor: '#F1F0F0'
    }
});

MessageComponent.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dateCreated: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isMine: PropTypes.bool.isRequired
    }).isRequired
};
 
export default MessageComponent;