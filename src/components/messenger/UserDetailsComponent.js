import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';

const UserDetailsComponent = ({username, isMine, imageUrl}) => {
    if(isMine) {
        return (
            <View>
                <Image 
                    style={[styles.profileImage, styles.myProfileImage]} 
                    source={{uri: imageUrl}}/>
                <Text
                    style={[styles.usernameText, styles.myUsername]}>
                    {username}
                </Text>
            </View>
        );
    }
    return (
        <View>
            <Image
                style={[styles.profileImage, styles.otherUserProfileImage]}
                source={{uri: imageUrl}}/>
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
    },
    profileImage: {
        width: '40%',
        marginTop: 10,
        height: 50
    },
    myProfileImage: {
        alignSelf: 'flex-end'
    },
    otherUserProfileImage: {
        alignSelf: 'flex-start'
    }
});

UserDetailsComponent.propTypes = {
    username: PropTypes.string.isRequired,
    isMine: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string
};
 
export default UserDetailsComponent;