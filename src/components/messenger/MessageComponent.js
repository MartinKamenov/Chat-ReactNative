import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const MessageComponent = ({ message }) => {
    return (
        <Text style={styles.message}>{message.text}</Text>
    );
};

const styles = StyleSheet.create({
    message: {
        color: '#ffffff'
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