import { useReducer, useCallback } from 'react';
import { INITIAL_GAME_STATE, PLAYER, GAME_STATUS } from '../constants/constants';
import { 
  createEmptyBoard, 
  isCellEmpty, 
  calculateScore, 
  isGameComplete, 
  getOppositePlayer,
  getCellNumber 
} from '../utils/gameLogic';

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { row, col } = action.payload;
      const newBoard = state.board.map(r => [...r]);
      
      if (!isCellEmpty(newBoard[row][col])) {
        return state;
      }

      newBoard[row][col] = state.currentPlayer;
      const score = calculateScore(newBoard, row, col, state.currentPlayer, state.dimension);
      const cellNumber = getCellNumber(row, col, state.dimension);
      
      const newMoveCounter = state.moveCounter + 1;
      const isComplete = isGameComplete(newMoveCounter, state.dimension);
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: getOppositePlayer(state.currentPlayer),
        moveCounter: newMoveCounter,
        gameHistory: [...state.gameHistory, cellNumber],
        gameStatus: isComplete ? GAME_STATUS.GAME_OVER : GAME_STATUS.PLAYING,
        scoreX: state.currentPlayer === PLAYER.X ? state.scoreX + score : state.scoreX,
        scoreO: state.currentPlayer === PLAYER.O ? state.scoreO + score : state.scoreO,
      };
    }
    
    case 'RESET_GAME': {
      return {
        ...INITIAL_GAME_STATE,
        dimension: state.dimension,
        board: createEmptyBoard(state.dimension),
      };
    }
    
    case 'CHANGE_DIMENSION': {
      const newDimension = action.payload.dimension;
      return {
        ...INITIAL_GAME_STATE,
        dimension: newDimension,
        board: createEmptyBoard(newDimension),
      };
    }
    
    default:
      return state;
  }
};

export const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, {
    ...INITIAL_GAME_STATE,
    board: createEmptyBoard(INITIAL_GAME_STATE.dimension),
  });

  const makeMove = useCallback((row, col) => {
    dispatch({ type: 'MAKE_MOVE', payload: { row, col } });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const changeDimension = useCallback((dimension) => {
    dispatch({ type: 'CHANGE_DIMENSION', payload: { dimension } });
  }, []);

  return {
    gameState: state,
    actions: {
      makeMove,
      resetGame,
      changeDimension,
    },
  };
};