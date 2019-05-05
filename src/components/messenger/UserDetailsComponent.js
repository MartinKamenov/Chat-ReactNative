import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';

const UserDetailsComponent = ({username, isMine, imageUrl}) => {
    if(isMine) {
        return (
            <View>
                <Image source={{uri: imageUrl}}/>
                <Text
                    style={[styles.usernameText, styles.myUsername]}>
                    {username}
                </Text>
            </View>
        );
    }
    return (
        <View>
            <Image source={{uri: imageUrl}}/>
            <Text 
                style={[styles.usernameText, styles.otherUserUsername]}>
                {username}
            </Text>
        </View>
    );
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
    isMine: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string
};
 
export default UserDetailsComponent;