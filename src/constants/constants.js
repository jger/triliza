export const GAME_CONFIG = {
  DEFAULT_DIMENSION: 3,
  MIN_DIMENSION: 3,
  CELL_SIZE: 80,
  CELL_MARGIN: 5,
};

export const PLAYER = {
  X: 'X',
  O: 'O',
};

export const GAME_STATUS = {
  PLAYING: 'playing',
  GAME_OVER: 'game_over',
  TIE: 'tie',
};

export const INITIAL_GAME_STATE = {
  board: [[]],
  currentPlayer: PLAYER.X,
  moveCounter: 0,
  gameHistory: [],
  gameStatus: GAME_STATUS.PLAYING,
  scoreX: 0,
  scoreO: 0,
  dimension: GAME_CONFIG.DEFAULT_DIMENSION,
};