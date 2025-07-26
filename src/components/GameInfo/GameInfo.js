import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import { GAME_STATUS, PLAYER } from '../../utils/constants';
import { formatGameLog } from '../../utils/gameLogic';

const GameInfo = ({ 
  currentPlayer, 
  moveCounter, 
  gameHistory, 
  scoreX, 
  scoreO, 
  gameStatus 
}) => {
  const isGameOver = gameStatus === GAME_STATUS.GAME_OVER;
  const gameLog = formatGameLog(gameHistory, isGameOver);

  const getWinner = () => {
    if (scoreX === scoreO) return 'Tie';
    return scoreX > scoreO ? `${PLAYER.X} wins the game!` : `${PLAYER.O} wins the game!`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Round: {currentPlayer}</Text>
      <Text style={styles.info}>Moves: {moveCounter}</Text>
      <Text style={styles.info}>Game notation: {gameLog}</Text>
      <Text style={styles.info}>Score (X-O): {scoreX}-{scoreO}</Text>
      
      {isGameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.winner}>{getWinner()}</Text>
          <Text style={styles.gameOver}>Game Over!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  gameOverContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  winner: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  gameOver: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
});

export default GameInfo;