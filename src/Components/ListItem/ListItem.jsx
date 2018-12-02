//@flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Item = styled.li`
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  border: 1px solid lightgray;
  border-radius: 2px;
  font-family: Roboto, sans-serif;
  background-color: #ffffff;
`

type Props = {
  id: string,
  index: number,
  children: string
}

export default class ListItem extends Component<Props> {

  render() {
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {provided => (
          <Item 
          ref={provided.innerRef}
          {...provided.draggableProps} 
          {...provided.dragHandleProps}         
          >
            {this.props.children}
          </Item>
        )}
      </Draggable>
    )
  }
}