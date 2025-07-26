import React from 'react';
import { View, StyleSheet } from 'react-native-web';

const row = (props) => {
    return (
        <View style={styles.row}>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default row;