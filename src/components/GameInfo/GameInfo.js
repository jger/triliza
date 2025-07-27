import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import { GAME_STATUS } from '../../constants/constants';

const GameInfo = ({ 
  currentPlayer, 
  moveCounter, 
  gameHistory, 
  scoreX, 
  scoreO, 
  gameStatus,
  gameMode = 'local',
  connectionStatus = 'disconnected'
}) => {
  const getStatusText = () => {
    if (gameStatus === GAME_STATUS.GAME_OVER) {
      if (scoreX > scoreO) return 'Player X wins!';
      if (scoreO > scoreX) return 'Player O wins!';
      return 'It\'s a tie!';
    }
    
    if (gameMode !== 'local') {
      if (connectionStatus !== 'connected') {
        return 'Connecting...';
      }
      return `Player ${currentPlayer}'s turn`;
    }
    
    return `Player ${currentPlayer}'s turn`;
  };

  const getPlayerLabel = () => {
    if (gameMode === 'host') return 'You are X';
    if (gameMode === 'guest') return 'You are O';
    return '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{getStatusText()}</Text>
      
      {gameMode !== 'local' && (
        <Text style={styles.playerLabel}>{getPlayerLabel()}</Text>
      )}
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>X: {scoreX}</Text>
        <Text style={styles.scoreText}>O: {scoreO}</Text>
      </View>
      
      <Text style={styles.moveText}>Moves: {moveCounter}</Text>
      
      {gameHistory.length > 0 && (
        <Text style={styles.historyText}>
          History: {gameHistory.join(', ')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    minWidth: 250,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  playerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  moveText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  historyText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default GameInfo;