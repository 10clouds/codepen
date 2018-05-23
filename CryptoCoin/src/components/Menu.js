import * as React from 'react';
import styled from "styled-components";

const Menu = styled.ul`
  flex: 5;
`;

const MenuItem = styled.li`
  height: 70px;
  border: 1px solid pink;
`;

class MenuContainer extends React.Component {

  render() {
    return (
          <MenuContainer>
            <MenuItem>Prices</MenuItem>
            <MenuItem>Wallet</MenuItem>
            <MenuItem>Portfolio</MenuItem>
            <MenuItem>Exchange</MenuItem>
            <MenuItem>Settings</MenuItem>
          </MenuContainer>

    );
  }
}

export default MenuContainer;