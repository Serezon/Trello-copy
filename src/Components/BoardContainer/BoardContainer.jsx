//@flow
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { createBoard } from '../../Actions/index'
import styled from 'styled-components'
import Modal from 'react-modal'
import { modalStyles, Input } from '../../Assets/styles'
import type { InitialStateType, BoardType } from '../../Reducers/initialState'
import type { Dispatch } from '../../Actions/actionTypes'

Modal.setAppElement('#root')

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const Link = styled(RouterLink)`
  color: #000000;
  margin: 0;
  text-decoration: none;

  :hover {
    color: #000000;
    text-decoration: none;
  }
`

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 400px;
  height: 150px;
  margin: 20px;
  background-color: ${props => props.inputColor || '#efefef'};
  border-radius: 5px;
  box-shadow: 0 0 5px rgb(0,0,0);
  color: #000;
  font-family: Roboto, sans-serif;
  font-size: 22px;
  transition: transform 0.2s ease-out;

  :hover {
    transform: scale(1.05);
  }
`

const BoardLink = (props: { id: string, children: string }) => (
  <Link to={'/board/' + props.id}>
    <StyledBoard inputColor='#efefef'>
      {props.children}
    </StyledBoard>
  </Link>
)

const BoardCreate = (props) => (
  <StyledBoard
    inputColor='#ccffcc'
    onClick={props.onClick}
  >
    {props.children}
  </StyledBoard>
)

type Props = {
  dispatch: Dispatch,
  boards: Array<BoardType>
}


class BoardContainer extends React.Component<Props, { modalIsOpen: boolean }> {

  constructor(props: Props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  handleInput = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.dispatch(createBoard(e.currentTarget.value))
      e.currentTarget.value = ''
      this.closeModal()
    }
  }

  showBoards = () => {
    return this.props.boards
      .map((board) => <BoardLink id={board.id} key={board.id}>{board.name}</BoardLink>)
  }

  render() {
    return (
      <Wrapper>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Add board"
        >
          <Input placeholder='Enter board name here' onKeyPress={(e) => this.handleInput(e)} />
          <button onClick={this.closeModal}>close</button>
        </Modal>

        {this.showBoards()}

        <BoardCreate onClick={this.openModal}>
          Add board
        </BoardCreate>

      </Wrapper>
    )
  }
}

const mapStateToProps = (state: InitialStateType) => ({
  boards: state.boards
})

export default connect(mapStateToProps)(BoardContainer)
