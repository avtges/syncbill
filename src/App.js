import React from 'react';
import './App.css';
import Board from './components/Board';

import './components/Table/components/styles/MainEditor.scss';
import MainEditor from './containers/MainEditor';
import board from './dummyJSON.js';

/*board.columns.forEach(cards => console.log(cards));*/



function UncontrolledBoard() {
  return (
    <>
    <Board
      allowAddColumn
      allowRemoveColumn
      allowRenameColumn
      allowRemoveCard
      onColumnRemove={console.log}
      onCardRemove={console.log}
      onColumnRename={console.log}
      initialBoard={board}
      allowAddCard={{ on: "top" }}
      onNewCardConfirm={draftCard => ({
        id: new Date().getTime(),
        ...draftCard
      })}
      onCardNew={console.log}
    />

    </>
  );
}

function App() {
  return (
    <>
    <div className='section-color'>
      <div className='jumbotron rounded-0'>
        <div className='container'>
          <h2 className='logo ml-5'> SyncBill </h2>

          <UncontrolledBoard />
        </div>
      </div>
    </div>
    <div className='container'>
      <div className='row mt-4'>
        <MainEditor />
      </div>
    </div>

    </>
  );
}

export default App;
