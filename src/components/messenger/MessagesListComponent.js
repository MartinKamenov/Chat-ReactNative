import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import MessageComponent from './MessageComponent';

const MessagesListComponent = ({ messages }) => {
    return (
        <View>
            {
                messages.map((message, i) => {
                    return <MessageComponent key={i} message={message}/>;
                })
            }
        </View>
    );
}

MessagesListComponent.propTypes = {
    messages: PropTypes.array.isRequired
};

export default MessagesListComponent;