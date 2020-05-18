import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as TableActions from '../components/Table/components/redux/actions/TableActions';
import * as SettingsActions from '../components/Table/components/redux/actions/SettingsActions';
import * as SettingsSelectors from '../components/Table/components/redux/selectors/SettingsSelectors';

import { Modal, ModalFooter, ModalBody, ModalHeader } from '../components/Table/components/layout/Modal';
import TextArea from '../components/Table/components/layout/TextArea';
import styles from './Layout.module.scss';

const IMPORT_TEXT_PLACEHOLDER =
`(Any line that doesn't start with | is ignored).
`;

export default function ImportMarkdownModal() {

  const [value, setValue] = useState('');
  const isOpen = useSelector(SettingsSelectors.isImportModalOpen());

  const dispatch = useDispatch();

  const hideModal = () => dispatch(SettingsActions.hideImportModal());

  const importClick = () => {
    dispatch(TableActions.importMarkdownTable(value));
    hideModal();
  }

  const changeValue = e => setValue(e.target.value);

  return (
    <Modal isOpen={isOpen} className={styles.importMarkdownModal} toggle={hideModal}>
      <ModalHeader toggle={hideModal}>Import Markdown</ModalHeader>
      <ModalBody>
        <p>Paste or type the table markdown below.</p>
        <TextArea className={styles.importMarkdownTextArea} rows={10} placeholder={IMPORT_TEXT_PLACEHOLDER} value={value} onChange={changeValue} />
      </ModalBody>

      <ModalFooter>
        <div className='btn btn-success' type='colorful' size='medium' onClick={importClick}>Import</div>
        <div className='btn btn-success' size='medium' onClick={hideModal}>Cancel</div>
      </ModalFooter>
    </Modal>
  )
}
