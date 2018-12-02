//@flow
import * as React from 'react'
import { createListItem } from '../../Actions/index'
import type { Dispatch } from '../../Actions/actionTypes'
import styled from 'styled-components'
import Modal from 'react-modal'
import { modalStyles, Input } from '../../Assets/styles'
import { Droppable } from 'react-beautiful-dnd'
import ListItem from '../ListItem/ListItem.jsx'

const ListWrapper = styled.div`
  border: 1px solid lightgrey;
  border-radius: 4px;
  width: 200px;
  text-align: center;
  margin-right: 3rem;
  padding: 1rem;
`

const ListName = styled.h3`
  font-family: Roboto, sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  margin: 0;
  padding: 0.75rem;
`

const ListItems = styled.ul`
  margin: 0;
  padding: 0.5rem;
  list-style-type: none;
`

const AddItem = styled.button.attrs({
  type: 'button'
})`
  padding: 0.75rem;
  border: 1px solid lightgray;
  border-radius: 2px;
  font-family: Roboto, sans-serif;
  background-color: #f7f7f7;
`

type Props = {
  list: {
    name: string,
    id: string,
    itemsOrder: Array<string>,
    items: Array<{id: string, task: string}>
  },
  boardId: string,
  dispatch: Dispatch
}

type State = {
  modalIsOpen: boolean
}

class List extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }
  }

  renderListItems = () => {

    const items: React.Node = this.props.list.itemsOrder.map((itemId, index) => {
      const currentItem = this.props.list.items.find(item => item.id === itemId)

      if (currentItem === undefined) {
        // eslint-disable-next-line
        return 
      }

      return <ListItem key={currentItem.id} id={currentItem.id} index={index}>{currentItem.task}</ListItem>
    })

    return items
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  handleInput = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    
    if (e.key === 'Enter') {
      this.props.dispatch(createListItem(e.currentTarget.value, this.props.boardId, this.props.list.id))
      e.currentTarget.value = ''
      this.closeModal()
    }
  }

  render() {
    return (
      <ListWrapper>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel='Add list item'
        >
          <Input placeholder='Enter item name here' onKeyPress={(e) => this.handleInput(e)} />
          <button onClick={this.closeModal}>close</button>
        </Modal>

        <ListName>{this.props.list.name}</ListName>

        <Droppable droppableId={this.props.list.id}>
          {provided => (
            <ListItems ref={provided.innerRef} {...provided.droppableProps}>
              {this.renderListItems()}
              {provided.placeholder}
            </ListItems>
          )}
        </Droppable>

        <AddItem onClick={this.openModal}>Add new item</AddItem>
      </ListWrapper>
    )
  }
}

export default List