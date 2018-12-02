//@flow
import styled from 'styled-components'

export const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

export const Input = styled.input.attrs({
  type: 'text'
})`
  width: 80%;
  margin-bottom: 1rem;
  font-size: 0.8em;
`