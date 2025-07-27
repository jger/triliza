import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';

const newgame = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.button} onPress={props.resetGame}>New Game</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        cursor: 'pointer',
        textAlign: 'center',
    },
});

export default newgame;