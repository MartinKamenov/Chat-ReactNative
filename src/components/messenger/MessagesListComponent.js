import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MessageComponent from './MessageComponent';

const MessagesListComponent = ({ messages, showDateForMessage, visibleDateMessageId }) => {
    return (
        <View style={styles.messengerContainer}>
            {
                messages.map((message) => {
                    return <MessageComponent
                        key={message.id}
                        message={message}
                        showDateForMessage={() => showDateForMessage(message.id)}
                        visibleDateMessageId={visibleDateMessageId}/>;
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    messengerContainer: {
        width: '100%'
    }
});

MessagesListComponent.propTypes = {
    messages: PropTypes.array.isRequired,
    showDateForMessage: PropTypes.func.isRequired,
    visibleDateMessageId: PropTypes.string.isRequired
};

export default MessagesListComponent;