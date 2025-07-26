import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import { GAME_CONFIG } from '../../utils/constants';

const GameControls = ({ dimension, onDecrease, onIncrease, onNewGame }) => {
  const canDecrease = dimension > GAME_CONFIG.MIN_DIMENSION;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{dimension}-liza</Text>
        <View style={styles.dimensionControls}>
          <Text 
            style={[styles.button, !canDecrease && styles.disabled]} 
            onPress={canDecrease ? onDecrease : undefined}
          >
            -
          </Text>
          <Text style={styles.button} onPress={onIncrease}>+</Text>
        </View>
      </View>
      
      <Text style={[styles.button, styles.newGameButton]} onPress={onNewGame}>
        New Game
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 15,
  },
  dimensionControls: {
    flexDirection: 'row',
  },
  button: {
    textAlign: 'center',
    padding: 8,
    margin: 4,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    minWidth: 30,
    minHeight: 30,
    borderRadius: 4,
    cursor: 'pointer',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  newGameButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export default GameControls;