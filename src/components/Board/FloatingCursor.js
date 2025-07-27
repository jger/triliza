import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import { PLAYER } from '../../constants/constants';

const FloatingCursor = ({ currentPlayer, isVisible, mousePosition }) => {
  if (!isVisible || !mousePosition) return null;

  const cursorStyle = {
    ...styles.cursor,
    left: mousePosition.x + 15, // Offset to avoid covering the cell
    top: mousePosition.y - 15,
  };

  return (
    <View style={cursorStyle} pointerEvents="none">
      <Text style={[
        styles.symbol,
        currentPlayer === PLAYER.X ? styles.symbolX : styles.symbolO
      ]}>
        {currentPlayer}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cursor: {
    position: 'fixed',
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 20,
  },
  symbolX: {
    color: '#d32f2f',
  },
  symbolO: {
    color: '#2e7d32',
  },
});

export default FloatingCursor;