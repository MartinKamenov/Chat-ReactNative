import React from 'react';
import { ProgressBarAndroid, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const LoadingComponent = ({ loadingText }) => (
    <View>
        <ProgressBarAndroid/>
        <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
);

const styles = StyleSheet.create({
    loadingText: {
        textAlign: 'center',
        width: '100%'
    }
});

LoadingComponent.propTypes = {
    loadingText: PropTypes.string
};
 
export default LoadingComponent;