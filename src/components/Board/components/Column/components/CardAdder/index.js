import React, { useState } from 'react'
import styled from 'styled-components'
import CardForm from './components/CardForm'

const AddCardButton = styled.button`
  width: 100%;
  margin-top: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: bold;
  background-color: #01c39c;
  border: 1px solid #01c39c;
  color: #fff;

  &:hover {
    background-color: #00b38f;
    border: 1px solid #00b38f;
    color: #fff;
  }
`

export default function CardAdder({ column, onConfirm }) {
  function confirmCard(card) {
    onConfirm(column, card)
    setAddingCard(false)
  }

  const [addingCard, setAddingCard] = useState(false)

  return (
    <>
      {addingCard ? (
        <CardForm onConfirm={confirmCard} onCancel={() => setAddingCard(false)} />
      ) : (
        <AddCardButton className='btn shadow-sm' onClick={() => setAddingCard(!addingCard)}>Add a bill</AddCardButton>
      )}
    </>
  )
}
