import React from 'react';
import PropTypes from 'prop-types';
import UserDetailsComponent from './UserDetailsComponent';
import MessagesListComponent from './MessagesListComponent';

const UserMessengerComponent = ({ username, isMine, messages }) => {
    return (
        <View>
            <UserDetailsComponent username={username} isMine={isMine}/>
            <MessagesListComponent messages={messages}/>
        </View>
    );
}

UserMessengerComponent.propTypes = {
    username: PropTypes.string.isRequired,
    isMine: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired
};
 
export default UserMessengerComponent;