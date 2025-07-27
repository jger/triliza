import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native-web';
import Cell from '../Cell/Cell';
import FloatingCursor from './FloatingCursor';
import { GAME_STATUS } from '../../constants/constants';
import { isCellEmpty } from '../../utils/gameLogic';

const Board = ({ 
  board, 
  onCellPress, 
  gameStatus, 
  currentPlayer, 
  cellSize, 
  fontSize,
  disabled = false,
  gameMode = 'local'
}) => {
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
    if (!isGameOver && !disabled && isCellEmpty(cellValue)) {
      setShowFloatingCursor(true);
    }
  }, [isGameOver, disabled]);

  const handleMouseLeave = useCallback(() => {
    setShowFloatingCursor(false);
  }, []);

  const handleCellPress = (row, col) => {
    if (!disabled && !isGameOver) {
      onCellPress(row, col);
    }
  };

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
                onPress={() => handleCellPress(rowIndex, colIndex)}
                disabled={isGameOver || disabled}
                currentPlayer={currentPlayer}
                onMouseEnter={() => handleMouseEnter(cellValue)}
                cellSize={cellSize}
                fontSize={fontSize}
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