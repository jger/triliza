import { GAME_CONFIG } from '../constants/constants';

export const calculateCellSize = (dimension) => {
  if (typeof window === 'undefined') {
    return GAME_CONFIG.BASE_CELL_SIZE;
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate maximum available space
  const maxBoardWidth = (viewportWidth * GAME_CONFIG.MAX_BOARD_WIDTH_PERCENT) / 100;
  const maxBoardHeight = (viewportHeight * GAME_CONFIG.MAX_BOARD_HEIGHT_PERCENT) / 100;
  
  // Calculate cell size based on available space
  const totalMargin = (dimension - 1) * GAME_CONFIG.CELL_MARGIN * 2;
  const maxCellSizeByWidth = (maxBoardWidth - totalMargin) / dimension;
  const maxCellSizeByHeight = (maxBoardHeight - totalMargin) / dimension;
  
  // Use the smaller of the two to ensure board fits in viewport
  const calculatedSize = Math.floor(Math.min(maxCellSizeByWidth, maxCellSizeByHeight));
  
  // Ensure cell size is not smaller than minimum or larger than base size
  return Math.max(
    GAME_CONFIG.MIN_CELL_SIZE,
    Math.min(calculatedSize, GAME_CONFIG.BASE_CELL_SIZE)
  );
};

export const calculateFontSize = (cellSize) => {
  // Font size should be proportional to cell size
  return Math.max(16, Math.floor(cellSize * 0.4));
};

export const getBoardContainerWidth = (dimension, cellSize) => {
  const totalCellWidth = dimension * cellSize;
  const totalMarginWidth = (dimension - 1) * GAME_CONFIG.CELL_MARGIN * 2;
  return totalCellWidth + totalMarginWidth + 40; // Extra padding
};