import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const UserDetailsComponent = ({username, isMine}) => {
    if(isMine) {
        return <Text style={[styles.usernameText, styles.otherUserUsername]}>{username}</Text>;
    }
    return <Text style={[styles.usernameText, styles.otherUserUsername]}>{username}</Text>;
};

const styles = StyleSheet.create({
    usernameText: {
        borderRadius: 15,
        width: '40%',
        padding: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    myUsername: {
        alignSelf: 'flex-end',
        color: '#0099FF'
    },
    otherUserUsername: {
        alignSelf: 'flex-start',
        color: '#F1F0F0'
    }
});

UserDetailsComponent.propTypes = {
    username: PropTypes.string.isRequired,
    isMine: PropTypes.bool.isRequired
};
 
export default UserDetailsComponent;