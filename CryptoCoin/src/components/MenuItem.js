import * as React from 'react';
import styled from "styled-components";

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



class MenuItemContainer extends React.Component {

  renderItems() {
    return (
      <React.Fragment>
        {this.props.items.map((e, i) => (
          <MenuItem key={i}>
            <img src={ e.icon } />
            { e.item }
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
      { this.renderItems() }
      </ul>
    );
  }
}

export default MenuItemContainer;