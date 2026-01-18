import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native-web';
import { isCellEmpty } from '../../utils/gameLogic';
import { GAME_CONFIG } from '../../constants/constants';
import '../../styles/cursors.css';

interface CellProps {
  value: any;
  onPress?: () => void;
  disabled?: boolean;
  currentPlayer?: string;
  onMouseEnter?: () => void;
  cellSize: number;
  fontSize: number;
}

const Cell: React.FC<CellProps> = ({ value, onPress, disabled = false, currentPlayer, onMouseEnter, cellSize, fontSize }) => {
  const isEmpty = isCellEmpty(value);

  const dynamicCellStyle = {
    ...styles.cell,
    width: cellSize,
    height: cellSize,
    margin: GAME_CONFIG.CELL_MARGIN,
  };

  const cellStyle = isEmpty ? [dynamicCellStyle, styles.empty] : dynamicCellStyle;
  const textStyle = isEmpty
    ? [styles.text, styles.emptyText, { fontSize }]
    : [styles.text, { fontSize }];

  return (
    <Pressable
      style={[cellStyle, disabled && styles.disabled]}
      onPress={disabled ? undefined : onPress}
      onMouseEnter={onMouseEnter}
    >
      <Text style={textStyle}>
        {value}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    cursor: 'pointer',
  },
  text: {
    fontWeight: 'bold',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
  },
  empty: {
    backgroundColor: '#f0f0f0',
  },
  emptyText: {
    color: '#666',
  },
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export default Cell;