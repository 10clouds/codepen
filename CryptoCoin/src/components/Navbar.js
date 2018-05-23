import * as React from 'react';
import styled from 'styled-components';
import logo from './../assets/cc-logo.svg';
import MenuContainer from './Menu';
import moon from './../assets/moon.svg';
import sun from './../assets/sun.svg';

const Navbar = styled.div`
  height: 100%;
  width: 294px;
  border: 1px solid red;
  min-height: 100vh;
  padding: 40px 0 0;
`;

const Logo = styled.img`
  margin: 0 0 0 40px;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 300px);
  border: 1px solid green;
  margin: 127px 0 0 0;
`;

const ChangeView = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 0 0 40px;
  font-size: 18px;
  cursor: pointer;

  img {
    margin: 0 20px 0 0;
  }
`;

class NavbarContainer extends React.Component {

  render() {
    return (
      <Navbar>
        <Logo src={ logo } alt="CryptoCoin" />
        <MenuWrapper>
          <MenuContainer />
          <ChangeView>
            <img src={sun} />
            Light View
          </ChangeView>
        </MenuWrapper>
      </Navbar>
    );
  }
}

export default NavbarContainer;
