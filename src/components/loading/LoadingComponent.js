import React from 'react';
import { ProgressBarAndroid, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const LoadingComponent = ({ loadingText }) => (
    <View>
        <ProgressBarAndroid/>
        <Text>{loadingText}</Text>
    </View>
);

LoadingComponent.propTypes = {
    loadingText: PropTypes.string
};
 
export default LoadingComponent;