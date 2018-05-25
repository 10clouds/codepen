import * as React from 'react';
import styled from 'styled-components';
import * as icons from './icons/icons.js';
import { ThemeContext } from './../theme-context';

const menuItems = [
  {
    item: 'Prices',
    icon: icons.PricesIcon,
  },
  {
    item: 'Wallet',
    icon: icons.WalletIcon,
  },
  {
    item: 'Portfolio',
    icon: icons.PortfolioIcon,
  },
  {
    item: 'Exchange',
    icon: icons.ExchangeIcon,
  },
  {
    item: 'Settings',
    icon: icons.SettingsIcon,
  },
];

class MenuContainer extends React.Component {

  renderMenuItems(items) {
    const MenuItem = styled.li`
      align-items: center;
      color: #939393;
      cursor: pointer;
      display: flex;
      font-size: 18px;
      height: 70px;
      padding: 0 0 0 40px;
      transition: color .3s;

      &:hover {
        box-shadow: -21px -6px 52px 0 rgba(0, 0, 0, .42);
        color: ${ props => props.theme.text };

        .icon-wrapper {
          color: #596DFB;
          transition: color .3s;
        }
      }

      .icon-wrapper {
        color: #939393;
        margin: 0 20px 0 0;
      }
    `;

    return (
      <ThemeContext.Consumer>
        { theme => (
          items.map((item, i) => (
            <MenuItem key={i} theme={theme}>
              <div className="icon-wrapper">
                { item.icon() }
              </div>
              { item.item }
            </MenuItem>
          ))
        )}
      </ThemeContext.Consumer>
    );
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
