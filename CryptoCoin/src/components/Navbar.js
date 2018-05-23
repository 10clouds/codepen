import * as React from 'react';
import styled from "styled-components";
import logo from './../assets/cc-logo.svg';
import MenuContainer from './Menu';

const Navbar = styled.div`
  height: 100%;
  width: 294px;
  border: 1px solid red;
  min-height: 100vh;
  padding: 40px 0 0 40px;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 300px);
  border: 1px solid green;
  margin: 127px 0 0 0;
`;

class NavbarContainer extends React.Component {

  render() {
    return (
      <Navbar>
        <img src={ logo } alt="CryptoCoin" />
        <MenuWrapper>
          <MenuContainer />
          <div >change color</div>
        </MenuWrapper>
      </Navbar>
    );
  }
}

export default NavbarContainer;