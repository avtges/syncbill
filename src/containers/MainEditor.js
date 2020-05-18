import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as TableActions from '../components/Table/components/redux/actions/TableActions';
import { TABLE_SAMPLE } from '../components/Table/components/constants/TableConstants';
import * as SettingsSelectors from '../components/Table/components/redux/selectors/SettingsSelectors';

import Table from "../components/Table/components/Table";

import '../components/Table/components/styles/MainEditor.scss';
import ImportMarkdownModal from './ImportMarkdownModal';

import './MainEditor.css';

export default function MainEditor() {

  const editorPaneRef = useRef();
  const markdownPaneRef = useRef();

  const dispatch = useDispatch();
  useEffect(() => { dispatch(TableActions.importMarkdownTable(TABLE_SAMPLE)) }, [dispatch]);

  const clearActiveCell = e => {

    if (e.target === editorPaneRef.current || e.target === markdownPaneRef.current) {
      dispatch(TableActions.clearActiveCell());
    }
  }

  const AddCode = e => {
    console.log(window.getSelection());

    const selection = window.getSelection();

    console.log(selection.anchorNode.parentNode.className);

    if (selection.anchorNode.parentNode.className === 'cell-value') {
      console.log('CELL!');

      dispatch(TableActions.formatActiveCell(selection.anchorOffset, selection.focusOffset, 'code'));
    }
  }

  return (
    <div className='container'>
      <div className='row mt-4 mb-5'>
        <div className='pane-view'>
          <h4 className='ml-4 logo text-green'>Earnings and Payments Tracking Sheet</h4>
          <p className='ml-4 mb-2 logo text-dark'>Hover on table to add rows and columns</p>
          <div className='editor-pane mt-0' ref={editorPaneRef} onMouseDown={clearActiveCell}><Table /></div>
        </div>

        <ImportMarkdownModal />
      </div>
    </div>
  );
}
