import React, { useState } from 'react'
import styled from 'styled-components'
import CursorPointer from '../CursorPointer'
import DefaultCard from '../DefaultCard'

import board from '../../../../dummyJSON.js'

const ColumnHeaderSkeleton = styled.div`
  padding-bottom: 10px;
  font-weight: bold;

  span:nth-child(2) {
    cursor: pointer;
  }
`
const ColumnHeaderTitle = styled.div`
  display: flex;
  justify-content:space-between;

  }
`

const Input = styled.input`
  :focus {
    outline: none;
  }
`

function ColumnTitle({ allowRenameColumn, onClick, children: title }) {
  return allowRenameColumn ? <CursorPointer onClick={onClick}>{title}</CursorPointer> : <span>{title}</span>
}

function useRenameMode(state) {
  const [renameMode, setRenameMode] = useState(state)

  function toggleRenameMode() {
    setRenameMode(!renameMode)
  }

  return [renameMode, toggleRenameMode]
}

export default function ({ children: column, allowRemoveColumn, onColumnRemove, allowRenameColumn, onColumnRename }) {
  const [renameMode, toggleRenameMode] = useRenameMode(false)
  const [titleInput, setTitleInput] = useState('')

  function handleRenameColumn(event) {
    event.preventDefault()

    onColumnRename(column, titleInput)
    toggleRenameMode()
  }

  function handleRenameMode() {
    setTitleInput(column.title)
    toggleRenameMode()
  }

  const getCost =
    board.columns.map(cards => {
      let colCards = cards.cards;
      let sum = 0;
      if (typeof colCards != null) {
        colCards.forEach(cardInfo => {
          sum += parseFloat(cardInfo.description)
        })
      } else {
        console.log('nothing in card')
      }
      return sum
    }
  ).filter((a,b) => a+b,0);

  console.log(getCost);

  return (
    <ColumnHeaderSkeleton>
      {renameMode ? (
        <form onSubmit={handleRenameColumn}>
          <span>
            <Input
              type='text'
              className='form-control form-control-sm'
              value={titleInput}
              onChange={({ target: { value } }) => setTitleInput(value)}
              autoFocus
            />
          </span>
          <span>
            <button className='btn btn-light btn-sm mr-2 mt-2' type='submit'>Rename</button>
            <button className='btn btn-light btn-sm mr-2 mt-2' type='button' onClick={handleRenameMode}>
              Cancel
            </button>
          </span>
        </form>
      ) : (
        <>
          <ColumnHeaderTitle>
            <ColumnTitle allowRenameColumn={allowRenameColumn} onClick={handleRenameMode}>
              {column.title}
            </ColumnTitle>
            {allowRemoveColumn && <span onClick={() => onColumnRemove(column)}>×</span>}
          </ColumnHeaderTitle>

          <div className='mt-2'><small>Total</small>
          <h4 className='mb-1'>Sum of Cards</h4></div>

        </>
      )}
    </ColumnHeaderSkeleton>
  )
}
