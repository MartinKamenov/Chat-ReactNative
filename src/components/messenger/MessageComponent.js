import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import constants from '../../constants/constants';
import dateService from '../../services/dateService';

const MessageComponent = ({ message, showDateForMessage, visibleDateMessageId }) => {
    if(message.isMine) {
        return (
            <View>
                <Text 
                    onPress={showDateForMessage} 
                    style={[styles.myMessage, styles.message]}>
                        {message.text}
                </Text>
                {(() => {
                    if(visibleDateMessageId === message.id) {
                        return (
                            <Text style={[styles.dateText, styles.myDateText]}>
                                {dateService.formatDate(message.dateCreated)}
                            </Text>
                        );
                    }
                })()}
            </View>
        );
    }

    return (
        <View>
            <Text 
                onPress={showDateForMessage}
                style={[styles.anotherUserMessage, styles.message]}>
                    {message.text}
            </Text>
            {(() => {
                if(visibleDateMessageId === message.id) {
                    return (
                        <Text style={[styles.dateText, styles.anotherUserDateText]}>
                            {dateService.formatDate(message.dateCreated)}
                        </Text>
                    );
                }
            })()}
        </View>
    );
};

const styles = StyleSheet.create({
    message: {
        borderRadius: 15,
        width: '40%',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center'
    },
    myMessage: {
        alignSelf: 'flex-end',
        color: constants.SECONDARY_COLOR,
        backgroundColor: constants.PRIMARY_COLOR
    },
    anotherUserMessage: {
        alignSelf: 'flex-start',
        color: '#000000',
        backgroundColor: '#F1F0F0'
    },
    dateText: {
        textAlign: 'center',
        width: '40%',
        color: constants.SECONDARY_COLOR
    },
    myDateText: {
        alignSelf: 'flex-end'
    },
    anotherUserDateText: {
        alignSelf: 'flex-start'
    }
});

MessageComponent.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dateCreated: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isMine: PropTypes.bool.isRequired
    }).isRequired,
    showDateForMessage: PropTypes.func.isRequired,
    visibleDateMessageId: PropTypes.string.isRequired
};
 
export default MessageComponent;