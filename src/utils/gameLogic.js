import { PLAYER } from '../constants/constants';

export const createEmptyBoard = (dimension) => {
  const board = [];
  for (let i = 0; i < dimension; i++) {
    board[i] = [];
    for (let j = 0; j < dimension; j++) {
      board[i][j] = j + dimension * i + 1;
    }
  }
  return board;
};

export const isCellEmpty = (cellValue) => {
  return cellValue !== PLAYER.X && cellValue !== PLAYER.O;
};

export const calculateScore = (board, row, col, player, dimension) => {
  let score = 0;

  // Check horizontal
  if (row - 1 >= 0 && row + 1 < dimension) {
    if (board[row - 1][col] === player && board[row + 1][col] === player) score++;
  }

  // Check vertical
  if (col - 1 >= 0 && col + 1 < dimension) {
    if (board[row][col - 1] === player && board[row][col + 1] === player) score++;
  }

  // Check left patterns
  if (row - 2 >= 0) {
    if (board[row - 1][col] === player && board[row - 2][col] === player) score++;
  }
  if (col - 2 >= 0) {
    if (board[row][col - 1] === player && board[row][col - 2] === player) score++;
  }

  // Check right patterns
  if (row + 2 < dimension) {
    if (board[row + 1][col] === player && board[row + 2][col] === player) score++;
  }
  if (col + 2 < dimension) {
    if (board[row][col + 1] === player && board[row][col + 2] === player) score++;
  }

  // Check diagonals
  if (row - 2 >= 0 && col - 2 >= 0) {
    if (board[row - 2][col - 2] === player && board[row - 1][col - 1] === player) score++;
  }
  if (row + 2 < dimension && col + 2 < dimension) {
    if (board[row + 2][col + 2] === player && board[row + 1][col + 1] === player) score++;
  }

  // Check center diagonal patterns
  if (row - 1 >= 0 && col - 1 >= 0 && row + 1 < dimension && col + 1 < dimension) {
    if (board[row + 1][col - 1] === player && board[row - 1][col + 1] === player) score++;
    if (board[row - 1][col - 1] === player && board[row + 1][col + 1] === player) score++;
  }

  // Check mixed diagonal patterns
  if (col - 2 >= 0 && row + 2 < dimension) {
    if (board[row + 1][col - 1] === player && board[row + 2][col - 2] === player) score++;
  }
  if (row - 2 >= 0 && col + 2 < dimension) {
    if (board[row - 1][col + 1] === player && board[row - 2][col + 2] === player) score++;
  }

  return score;
};

export const isGameComplete = (moveCounter, dimension) => {
  return moveCounter >= dimension * dimension;
};

export const getOppositePlayer = (currentPlayer) => {
  return currentPlayer === PLAYER.X ? PLAYER.O : PLAYER.X;
};

export const getCellNumber = (row, col, dimension) => {
  return col + dimension * row + 1;
};

export const formatGameLog = (gameHistory, isGameOver) => {
  return gameHistory.map((cellNumber, index) => {
    const player = index % 2 === 0 ? PLAYER.X : PLAYER.O;
    const arrow = (isGameOver && index === gameHistory.length - 1) ? '' : '→';
    return `${player}${cellNumber}${arrow}`;
  }).join('');
};