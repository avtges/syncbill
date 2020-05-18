import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Card from './components/Card'
import CardSkeleton from '../CardSkeleton'
import withDroppable from '../../../withDroppable'
import CardAdder from './components/CardAdder'

export const StyledColumn = styled.div`
  height: 100%;
  min-height: 28px;
  display: inline-block;
  padding: 15px;
  border-radius: 0.60rem;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  margin: 5px;
  vertical-align: top;
`

const DroppableColumn = withDroppable(styled.div`
  height: inherit;
  min-height: inherit;
`)

function Column({
  children,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  disableColumnDrag,
  disableCardDrag,
  onCardNew,
  allowAddCard,
}) {
  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {(columnProvided) => (
        <StyledColumn
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
          data-testid={`column-${children.id}`}
        >
          <div {...columnProvided.dragHandleProps}>{renderColumnHeader(children)}</div>
          {allowAddCard && <CardAdder column={children} onConfirm={onCardNew} />}
          <DroppableColumn droppableId={String(children.id)}>
            {children.cards.length ? (
              children.cards.map((card, index) => (
                <Card
                  key={card.id}
                  index={index}
                  renderCard={(dragging) => renderCard(children, card, dragging)}
                  disableCardDrag={disableCardDrag}
                >
                  {card}
                </Card>
              ))
            ) : (
              <CardSkeleton />
            )}
          </DroppableColumn>
        </StyledColumn>
      )}
    </Draggable>
  )
}

export default Column
