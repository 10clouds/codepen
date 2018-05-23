import * as React from 'react';
import styled from "styled-components";
import MenuItemContainer from './MenuItem';
import * as icons from './../assets/icons.js';

const menuItems = [
  {
    item: "Prices",
    icon: icons.prices,
  },
  {
    item: "Wallet",
    icon: icons.wallet,
  },
  {
    item: "Portfolio",
    icon: icons.portfolio,
  },
  {
    item: "Exchange",
    icon: icons.exchange,
  },
  {
    item: "Settings",
    icon: icons.settings,
  },

];

const MenuItem = styled.li`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 0 0 40px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    box-shadow: -21px -6px 52px 0 rgba(0, 0, 0, .42);
  }

  img {
    margin: 0 20px 0 0;
  }
`;

class MenuContainer extends React.Component {
  renderMenuItems(items) {
    return (
      <React.Fragment>
        {items.map((item, i) => (
          <MenuItem key={i}>
            <img src={ item.icon } />
            { item.item }
          </MenuItem>
          )
        )
        }
      </React.Fragment>
    )
  }

  render() {
    return (
      <ul>
        { this.renderMenuItems(menuItems) }
      </ul>
    );
  }
}

export default MenuContainer;
