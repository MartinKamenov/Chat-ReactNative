import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import UserDetailsComponent from './UserDetailsComponent';
import MessagesListComponent from './MessagesListComponent';

const UserMessengerComponent = ({
        username,
        isMine,
        messages,
        imageUrl,
        visibleDateMessageId,
        showDateForMessage}) => {
    return (
        <View style={styles.userMessengerContainer}>
            <UserDetailsComponent username={username} isMine={isMine} imageUrl={imageUrl}/>
            <MessagesListComponent
                visibleDateMessageId={visibleDateMessageId}
                showDateForMessage={showDateForMessage}
                messages={messages}/>
        </View>
    );
};

const styles = StyleSheet.create({
    userMessengerContainer: {
        width: '100%'
    }
});

UserMessengerComponent.propTypes = {
    username: PropTypes.string.isRequired,
    isMine: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    imageUrl: PropTypes.string,
    showDateForMessage: PropTypes.func.isRequired,
    visibleDateMessageId: PropTypes.string.isRequired
};
 
export default UserMessengerComponent;