import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.main`
  display: grid;
  grid-template-areas: 'header' 'search' 'map';
  grid-template-rows: 1.8rem 2rem 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;
`;

function Layout({ children }) {
  return <StyledLayout>{children}</StyledLayout>;
}

export default Layout;
