import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native-web';

const box = (props) => {
    const isFree = (props.value !== 'X' && props.value !== 'O');
    const boxStyle = isFree ? [styles.box, styles.free] : styles.box;
    const textStyle = isFree ? [styles.text, styles.freeText] : styles.text;

    return (
        <Pressable style={boxStyle} onPress={props.clicked}>
            <Text style={textStyle}>
                {props.value}
            </Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        borderColor: 'black',
        width: 80,
        height: 80,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        cursor: 'pointer',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    free: {
        // Additional styles for free boxes if needed
    },
    freeText: {
        color: '#eee',
    },
});

export default box;