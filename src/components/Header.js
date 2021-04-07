import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  --header-font-color: #252525;
  width: 100%;
  display: flex;
  align-items: center;

  & h1 {
    color: var(--header-font-color);
    font-size: 1.4rem;
    line-height: 1.4rem;
    margin: 0;
  }
`;

const Header = ({ title }) => {
  return (
    <StyledHeader>
      <h1>{title}</h1>
    </StyledHeader>
  );
};

export default Header;
