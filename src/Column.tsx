import React, {useRef} from "react"
import { AddNewItem } from "./AddNewItem"
import { useAppState } from "./AppStateContext"
import { ColumnContainer, ColumnTitle } from "./styles"
import { useDrop } from "react-dnd"
import { useItemDrag } from './useItemDrag'
import { isHidden } from './utils/isHidden'
import { Card } from "./Card"
import { DragItem } from "./DragItem"

interface ColumnProps {
  text: string
  index: number
  id: string
  isPreview?: boolean
}

export const Column = ({
  text,
  index,
  id,
  isPreview
}: ColumnProps) => {
const { state, dispatch } = useAppState()
const ref = useRef<HTMLDivElement>(null)

const { drag } = useItemDrag({ type: "COLUMN", id, index, text })
const [, drop] = useDrop({
  accept: "COLUMN",
  hover(item: DragItem){
    const dragIndex = item.index
    const hoverIndex = index
    if (dragIndex === hoverIndex) {
      return
    }
    dispatch({type: "MOVE_LIST", payload: {dragIndex, hoverIndex}})
    item.index = hoverIndex
  }
})
drag(drop(ref))
console.log(isPreview)
return (
  <ColumnContainer 
    ref={ref} 
    isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
    isPreview={isPreview}
  > 
    <ColumnTitle>{text}</ColumnTitle> 
    {state.lists[index].tasks.map((task, index) => (
        <Card columnId={id} text={task.text} key={task.id} id={task.id} index={index}/> )
    )}
    <AddNewItem
      toggleButtonText="+ Add another task" 
      onAdd={text =>
        dispatch({ type: "ADD_TASK", payload: { text, listId: id } })
      }
      dark
    />
  </ColumnContainer>
  ) 
}
