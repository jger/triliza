import React from 'react';
import { View, StyleSheet } from 'react-native-web';
import Cell from '../Cell/Cell';
import { GAME_STATUS } from '../../utils/constants';

const Board = ({ board, onCellPress, gameStatus }) => {
  const isGameOver = gameStatus === GAME_STATUS.GAME_OVER;

  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((cellValue, colIndex) => (
            <Cell
              key={`cell-${rowIndex}-${colIndex}`}
              value={cellValue}
              onPress={() => onCellPress(rowIndex, colIndex)}
              disabled={isGameOver}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Board;