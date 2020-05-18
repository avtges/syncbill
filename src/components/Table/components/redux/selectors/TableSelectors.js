import TABLE from "../../constants/TableConstants";

export const getEditingCellValue = options => function(state) {
  return cellValueFromState(state, state.table.get(TABLE.State.activeRow), state.table.get(TABLE.State.activeColumn), options);
}

export const getCellValue = (rowIndex, columnIndex, options) => function(state) {
  return cellValueFromState(state, rowIndex, columnIndex, options);
};

function cellValueFromState(state, rowIndex, columnIndex, options = {}) {
  let value = state.table.getIn([ TABLE.State.rows, rowIndex, columnIndex ]);

  if (options.removeLastBR && value && value.endsWith('<br>')) {
    value = value.slice(0, -4);
  }

  return value;
}

export const getRowCount = () => function(state) {
  return state.table.get(TABLE.State.rowCount);
};

export const getColumnCount = () => function(state) {
  return state.table.get(TABLE.State.columnCount);
};

export const isLastColumn = columnIndex => function(state) {
   return state.table.get(TABLE.State.columnCount) === columnIndex+1;
};

export const isEditingCell = (rowIndex, columnIndex) => function(state) {
  return state.table.get(TABLE.State.activeRow) === rowIndex && state.table.get(TABLE.State.activeColumn) === columnIndex && state.table.get(TABLE.State.editingCell)
};

export const isCellSelected = (rowIndex, columnIndex) => function(state) {
  return state.table.get(TABLE.State.activeRow) === rowIndex && state.table.get(TABLE.State.activeColumn) === columnIndex;
}

export const isEditingRow = rowIndex => function(state) {
  return rowIndex !== undefined && state.table.get(TABLE.State.activeRow) === rowIndex;
};

export const getActiveColumn = () => function(state) {
  return state.table.get('activeColumn');
}

//! This can be removed and just use getActiveColumn() === columnIndex
const WARNING_REMOVE_FOLLOWING_METHOD = '';

export const isEditingColumn = columnIndex => function(state) {
  return columnIndex !== undefined && state.table.get(TABLE.State.activeColumn) === columnIndex;
};

export const getAdjustWidth = () => function(state) {
  return state.table.get('adjustWidth');
};

export const getMaxColumnLength = rowIndex => function(state) {
  return state.table.getIn([ TABLE.State.maxColumnLength, rowIndex ]) || 0;
};

export const isExtraCell = (rowIndex, columnIndex = undefined) => function(state) {
  return (
    (rowIndex !== undefined && state.table.get(TABLE.State.rowCount) === rowIndex) ||
    (columnIndex !== undefined && state.table.get(TABLE.State.columnCount) === columnIndex)
  );
};

export const getColumnAlignment = (columnIndex) => function(state) {
  return state.table.getIn([ 'columnsAlignment', columnIndex ]);
};
