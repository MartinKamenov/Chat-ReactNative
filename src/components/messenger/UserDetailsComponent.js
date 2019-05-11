import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import constants from '../../constants/constants';

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
        color: constants.PRIMARY_COLOR
    },
    otherUserUsername: {
        alignSelf: 'flex-start',
        color: constants.SECONDARY_COLOR
    },
    profileImage: {
        width: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        aspectRatio: 1,
        marginTop: 10,
        borderRadius: 10
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