import React from 'react';
import { useSelector } from 'react-redux';

import * as TableSelectors from './redux/selectors/TableSelectors';

import MarkdownRow from './MarkdownRow';
import DelimiterRow from './DelimiterRow';

import './styles/Table.scss';

export default function MarkdownTable() {

  const rowCount = useSelector(TableSelectors.getRowCount());
  const rows = [];

  for (let i = 0; i < rowCount; i++) {
    rows.push(<MarkdownRow key={i} rowIndex={i} />);
    (i === 0) && rows.push(<DelimiterRow key='delimiter' />);
  }

  return (
    <div className='md-table'>
      { rows }
    </div>
  );
}
