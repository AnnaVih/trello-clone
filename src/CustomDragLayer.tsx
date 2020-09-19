import React from 'react'
import { useDragLayer, XYCoord } from "react-dnd"
import {CustomDragLayerContainer} from './styles'
import { Card } from "./Card"
import {Column} from './Column'

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset} = useDragLayer(monitor=> ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }))

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === "COLUMN" ? (
          <Column
            id={item.id} 
            text={item.text} 
            index={item.index}
          />
        ) : (
          <Card
            columnId={item.columnId} 
            isPreview={true} 
            index={0}
            id={item.id} 
            text={item.text}
          />
        )}
      </div>
    </CustomDragLayerContainer>
  ): null
}

const getItemStyles = (currentOffset: XYCoord | null): React.CSSProperties => {
  if(!currentOffset){
    return {
      display: "none"
    }
  }

  const { x, y} = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform 
  }
}