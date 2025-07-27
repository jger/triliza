export const GAME_CONFIG = {
  DEFAULT_DIMENSION: 3,
  MIN_DIMENSION: 3,
  BASE_CELL_SIZE: 80,
  MIN_CELL_SIZE: 30,
  CELL_MARGIN: 4,
  MAX_BOARD_WIDTH_PERCENT: 90,
  MAX_BOARD_HEIGHT_PERCENT: 70,
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