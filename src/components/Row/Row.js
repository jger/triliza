import React from 'react';
import { View, StyleSheet } from 'react-native-web';
import Cell from '../Cell/Cell';

const Row = ({ row, rowIndex, onCellPress, cellSize, fontSize, disabled = false, gameMode = 'local' }) => {
  const handleCellPress = (colIndex) => {
    onCellPress(rowIndex, colIndex);
  };

  const rowStyle = {
    ...styles.row,
    height: cellSize,
  };

  return (
    <View style={rowStyle}>
      {row.map((cellValue, colIndex) => (
        <Cell
          key={colIndex}
          value={cellValue}
          onPress={() => handleCellPress(colIndex)}
          disabled={disabled}
          cellSize={cellSize}
          fontSize={fontSize}
          gameMode={gameMode}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default Row;