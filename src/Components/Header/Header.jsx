import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import LogoImage from '../../Assets/icons/logo.svg'

const Header = styled.header`
  display: flex;
  justify-content: center;
  background-color: rgb(245, 245, 245);

  :hover img {
      transform: rotate(360deg);
    }
`

const Name = styled.h1`
  margin: 1rem 0;
  font-size: 2.5rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
`

const Logo = styled.img.attrs({
  src: LogoImage,
  alt: 'Trello logo'
})`
  height: 3rem;
  margin-left: 1rem;
  transition: transform 1s ease-in-out;
`

const Link = styled(RouterLink)`
  width: 100%;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  :hover {
    color: #000000;
    text-decoration: none;
  }

`

export default () => (
  <Header>
    <Link to='/'>
      <Name>Trello clone </Name>
      <Logo/>
    </Link>
  </Header>
)
