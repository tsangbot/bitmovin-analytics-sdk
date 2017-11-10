import React from 'react';
import TableCell from './TableCell.js';

export default function TimeCell(props) {
  return (
    <TableCell {...props} best="lowest">
      {(props.value / 1000).toFixed(2)}s
    </TableCell>
  );
}
