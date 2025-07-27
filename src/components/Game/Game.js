import React from 'react';
import { View, StyleSheet } from 'react-native-web';
import { useGameState } from '../../hooks/useGameState';
import { useResponsiveBoard } from '../../hooks/useResponsiveBoard';
import Board from '../Board/Board';
import GameInfo from '../GameInfo/GameInfo';
import GameControls from './GameControls';
import Version from '../Version/Version';
import { GAME_CONFIG } from '../../constants/constants';

const Game = () => {
  const { gameState, actions } = useGameState();
  const { cellSize, fontSize, containerWidth } = useResponsiveBoard(gameState.dimension);

  const handleDimensionDecrease = () => {
    if (gameState.dimension > GAME_CONFIG.MIN_DIMENSION) {
      actions.changeDimension(gameState.dimension - 1);
    }
  };

  const handleDimensionIncrease = () => {
    actions.changeDimension(gameState.dimension + 1);
  };

  const containerStyle = {
    ...styles.container,
    maxWidth: containerWidth,
    width: '100%',
  };

  return (
    <View style={containerStyle}>
      <GameControls
        dimension={gameState.dimension}
        onDecrease={handleDimensionDecrease}
        onIncrease={handleDimensionIncrease}
        onNewGame={actions.resetGame}
      />
      
      <Board
        board={gameState.board}
        onCellPress={actions.makeMove}
        gameStatus={gameState.gameStatus}
        currentPlayer={gameState.currentPlayer}
        cellSize={cellSize}
        fontSize={fontSize}
      />
      
      <GameInfo
        currentPlayer={gameState.currentPlayer}
        moveCounter={gameState.moveCounter}
        gameHistory={gameState.gameHistory}
        scoreX={gameState.scoreX}
        scoreO={gameState.scoreO}
        gameStatus={gameState.gameStatus}
      />
      
      <Version />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 'auto',
    padding: 10,
    minHeight: '100vh',
    justifyContent: 'center',
  },
});

export default Game;