import React, {useRef} from "react"
import { CardContainer } from "./styles"
import { CardDragItem } from './DragItem'
import { useDrop } from "react-dnd"
import { useItemDrag } from './useItemDrag'

import { useAppState } from "./AppStateContext"

interface CardProps {
  id: string
  columnId: string
  text: string
  isPreview?: boolean
  index: number
}

export const Card = ({ text, id, index, columnId}: CardProps) => { 
  const { dispatch } = useAppState()
  const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId })
  const [, drop] = useDrop({ 
    accept: "CARD", 
    hover(item: CardDragItem) {
      if (item.id === id) { 
        return
      }

      const dragIndex = item.index 
      const hoverIndex = index
      const sourceColumn = item.columnId 
      const targetColumn = columnId
      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, hoverIndex, sourceColumn, targetColumn }
      })

      item.index = hoverIndex
      item.columnId = targetColumn
    }
  })

  const ref = useRef<HTMLDivElement>(null)
  drag(drop(ref))
  return <CardContainer ref={ref} >{text}</CardContainer>
}