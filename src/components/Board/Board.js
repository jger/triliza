import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native-web';
import Cell from '../Cell/Cell';
import FloatingCursor from './FloatingCursor';
import { GAME_STATUS } from '../../constants/constants';
import { isCellEmpty } from '../../utils/gameLogic';

const Board = ({ board, onCellPress, gameStatus, currentPlayer }) => {
  const isGameOver = gameStatus === GAME_STATUS.GAME_OVER;
  const [mousePosition, setMousePosition] = useState(null);
  const [showFloatingCursor, setShowFloatingCursor] = useState(false);

  const handleMouseMove = useCallback((event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const handleMouseEnter = useCallback((cellValue) => {
    if (!isGameOver && isCellEmpty(cellValue)) {
      setShowFloatingCursor(true);
    }
  }, [isGameOver]);

  const handleMouseLeave = useCallback(() => {
    setShowFloatingCursor(false);
  }, []);

  return (
    <>
      <View 
        style={styles.board}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {board.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((cellValue, colIndex) => (
              <Cell
                key={`cell-${rowIndex}-${colIndex}`}
                value={cellValue}
                onPress={() => onCellPress(rowIndex, colIndex)}
                disabled={isGameOver}
                currentPlayer={currentPlayer}
                onMouseEnter={() => handleMouseEnter(cellValue)}
              />
            ))}
          </View>
        ))}
      </View>
      
      <FloatingCursor
        currentPlayer={currentPlayer}
        isVisible={showFloatingCursor}
        mousePosition={mousePosition}
      />
    </>
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