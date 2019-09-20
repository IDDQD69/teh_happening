import React from 'react'

import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  textdecoration: 'none';
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  color: #000;
`

function CustomLink(props) {
    return <StyledLink {...props}>{props.children}</StyledLink>
}

export default CustomLink
