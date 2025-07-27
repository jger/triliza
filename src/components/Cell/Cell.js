import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native-web';
import { isCellEmpty } from '../../utils/gameLogic';
import { GAME_CONFIG } from '../../constants/constants';

const Cell = ({ value, onPress, disabled = false }) => {
  const isEmpty = isCellEmpty(value);
  const cellStyle = isEmpty ? [styles.cell, styles.empty] : styles.cell;
  const textStyle = isEmpty ? [styles.text, styles.emptyText] : styles.text;

  return (
    <Pressable 
      style={[cellStyle, disabled && styles.disabled]} 
      onPress={disabled ? undefined : onPress}
    >
      <Text style={textStyle}>
        {value}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: 'black',
    width: GAME_CONFIG.CELL_SIZE,
    height: GAME_CONFIG.CELL_SIZE,
    margin: GAME_CONFIG.CELL_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    cursor: 'pointer',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  empty: {
    backgroundColor: '#f0f0f0',
  },
  emptyText: {
    color: '#666',
  },
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export default Cell;