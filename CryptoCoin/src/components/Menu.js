import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import { menuItems } from './../constants'

class Menu extends React.Component {
  renderMenuItems(items) {
    const MenuItem = styled.li`
      align-items: center;
      color: #939393;
      cursor: pointer;
      display: flex;
      font-size: 14px;
      height: 53px;
      padding: 0 0 0 30px;
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
        margin: 0 15px 0 0;
      }
    `

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
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
    )
  }

  render() {
    return (
      <ul>
        { this.renderMenuItems(menuItems) }
      </ul>
    )
  }
}

export default Menu
