//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createList, moveListItem } from '../../Actions/index'
import type { Dispatch } from '../../Actions/actionTypes'
import type { InitialStateType, BoardType } from '../../Reducers/initialState'
import styled from 'styled-components'
import List from '../List/List.jsx'
import Modal from 'react-modal'
import { modalStyles, Input } from '../../Assets/styles'
import { DragDropContext } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'

Modal.setAppElement("#root");

const ListsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 2rem;
`

const BoardName = styled.h2`
  margin-top: 0.5rem;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  font-size: 2.2rem;
`

const AddList = styled.button.attrs({
  type: 'button'
})`
  align-self: stretch;
  font-family: Roboto, sans-serif;
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 1rem;
  background-color: #f7f7f7;
`

type Props = {
  board: BoardType,
  dispatch: Dispatch,
  match: {
    params: {
      id: string
    }
  }
}

type State = {
  modalIsOpen: boolean
}

class Board extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }
  }

  renderLists = () => {
    const board = this.props.board

    return board.lists
      .map(list => <List list={list} dispatch={this.props.dispatch} boardId={board.id} key={list.id} />)
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  handleInput = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.dispatch(
        createList(e.currentTarget.value, this.props.match.params.id)
      )
      e.currentTarget.value = ''
      this.closeModal()
    }
  }

  onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    this.props.dispatch(moveListItem(result, this.props.board.id))
  }

  render() {
    if (!this.props.board) {
      return <h2>Border was not found</h2>
    }

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel='Add list'
        >
          <Input
            placeholder='Enter list name here'
            onKeyPress={e => this.handleInput(e)}
          />
          <button onClick={this.closeModal}>close</button>
        </Modal>

        <BoardName>{this.props.board.name}</BoardName>

        <ListsWrapper>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.renderLists()}
          </DragDropContext>

          <AddList onClick={this.openModal}>Create new list</AddList>
        </ListsWrapper>
      </div>
    )
  }
}

const mapStateToProps = ({ boards }: InitialStateType, ownProps: Props) => {
  const id: string = ownProps.match.params.id
  const board: void | BoardType = boards.find(board => board.id === id)

  return { board }
}
//There's a bug with flow@0.85 and flow-typed. Temporary solution is below
// https://github.com/flow-typed/flow-typed/issues/2946#issuecomment-437409326
export default connect(mapStateToProps)(Board)
