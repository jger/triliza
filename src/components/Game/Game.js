import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native-web';
import { useGameState } from '../../hooks/useGameState';
import { useMultiplayer } from '../../hooks/useMultiplayer';
import { useResponsiveBoard } from '../../hooks/useResponsiveBoard';
import Board from '../Board/Board';
import GameInfo from '../GameInfo/GameInfo';
import GameControls from './GameControls';
import MultiplayerControls from '../Multiplayer/MultiplayerControls';
import Version from '../Version/Version';
import Rules from '../Rules/Rules';
import RulesButton from '../Rules/RulesButton';
import { GAME_CONFIG } from '../../constants/constants';

const Game = () => {
  const [showMultiplayer, setShowMultiplayer] = useState(false);
  const [showRules, setShowRules] = useState(false);
  
  // Create a ref to store the actions so we can use them in the callback
  const actionsRef = useRef(null);
  
  const handleGameStateUpdate = useCallback((newGameState) => {
    // Update the local game state with the received state from the other player
    if (actionsRef.current) {
      actionsRef.current.syncGameState(newGameState);
    }
  }, []);

  const { gameMode, connectionStatus, invitationCode, error, connectionData, waitingForAnswer, timeRemaining, createGame, joinGame, sendGameState, disconnect, handleAnswer, copyConnectionData } = useMultiplayer(handleGameStateUpdate);
  
  const { gameState, actions } = useGameState(
    gameMode !== 'local' ? sendGameState : null
  );
  
  // Update the actions ref when actions change
  actionsRef.current = actions;
  
  const { cellSize, fontSize, containerWidth } = useResponsiveBoard(gameState.dimension);

  const handleDimensionDecrease = () => {
    if (gameState.dimension > GAME_CONFIG.MIN_DIMENSION) {
      actions.changeDimension(gameState.dimension - 1);
    }
  };

  const handleDimensionIncrease = () => {
    actions.changeDimension(gameState.dimension + 1);
  };

  const handleMakeMove = (row, col) => {
    // Only allow moves if it's local game or if connected and it's the player's turn
    if (gameMode === 'local' || 
        (connectionStatus === 'connected' && 
         ((gameMode === 'host' && gameState.currentPlayer === 'X') ||
          (gameMode === 'guest' && gameState.currentPlayer === 'O')))) {
      actions.makeMove(row, col);
    }
  };

  const handleToggleMultiplayer = () => {
    if (gameMode !== 'local') {
      disconnect();
    }
    setShowMultiplayer(!showMultiplayer);
  };

  const handleDisconnect = () => {
    disconnect();
    setShowMultiplayer(false);
  };

  const handleToggleRules = () => {
    setShowRules(!showRules);
  };

  const containerStyle = {
    ...styles.container,
    maxWidth: containerWidth,
    width: '100%',
  };

  return (
    <View style={containerStyle}>
      <MultiplayerControls
        gameMode={gameMode}
        connectionStatus={connectionStatus}
        invitationCode={invitationCode}
        error={error}
        connectionData={connectionData}
        waitingForAnswer={waitingForAnswer}
        timeRemaining={timeRemaining}
        onCreateGame={createGame}
        onJoinGame={joinGame}
        onDisconnect={handleDisconnect}
        onHandleAnswer={handleAnswer}
        onCopyConnectionData={copyConnectionData}
        showMultiplayer={showMultiplayer}
        onToggleMultiplayer={handleToggleMultiplayer}
        gameStatus={gameState.gameStatus}
        onNewGame={gameMode !== 'local' ? actions.resetGame : null}
      />
      {gameMode === 'local' ? (
        <GameControls
          dimension={gameState.dimension}
          onDecrease={handleDimensionDecrease}
          onIncrease={handleDimensionIncrease}
          onNewGame={actions.resetGame}
        />
      ) : null}
      <RulesButton onPress={handleToggleRules} />
      <Board
        board={gameState.board}
        onCellPress={handleMakeMove}
        gameStatus={gameState.gameStatus}
        currentPlayer={gameState.currentPlayer}
        cellSize={cellSize}
        fontSize={fontSize}
        disabled={gameMode !== 'local' && connectionStatus !== 'connected'}
        gameMode={gameMode}
      />
      <GameInfo
        currentPlayer={gameState.currentPlayer}
        moveCounter={gameState.moveCounter}
        gameHistory={gameState.gameHistory}
        scoreX={gameState.scoreX}
        scoreO={gameState.scoreO}
        gameStatus={gameState.gameStatus}
        gameMode={gameMode}
        connectionStatus={connectionStatus}
      />
      <Version />
      {showRules ? (
        <Rules isVisible={showRules} onClose={handleToggleRules} />
      ) : null}
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