import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';

const gameover = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.winner}>
                { props.scoreO===props.scoreX ? 'Tie' : props.scoreO>props.scoreX ? 'O wins the game!' : 'X wins the game!'}
            </Text>
            <Text style={styles.gameOver}>Game Over!</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    winner: {
        fontSize: 18,
        marginBottom: 5,
    },
    gameOver: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default gameover;