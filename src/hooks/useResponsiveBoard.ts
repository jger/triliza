import { useState, useEffect } from 'react';
import { calculateCellSize, calculateFontSize, getBoardContainerWidth } from '../utils/responsive';

export const useResponsiveBoard = (dimension) => {
  const [boardSizing, setBoardSizing] = useState(() => {
    const cellSize = calculateCellSize(dimension);
    return {
      cellSize,
      fontSize: calculateFontSize(cellSize),
      containerWidth: getBoardContainerWidth(dimension, cellSize),
    };
  });

  useEffect(() => {
    const updateSizing = () => {
      const cellSize = calculateCellSize(dimension);
      setBoardSizing({
        cellSize,
        fontSize: calculateFontSize(cellSize),
        containerWidth: getBoardContainerWidth(dimension, cellSize),
      });
    };

    // Update sizing when dimension changes
    updateSizing();

    // Add resize listener
    const handleResize = () => {
      updateSizing();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dimension]);

  return boardSizing;
};