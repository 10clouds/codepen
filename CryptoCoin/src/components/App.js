import * as React from 'react';
import styled from 'styled-components';
import NavbarContainer from './Navbar';
import baseStyles from '../base-styles';

class App extends React.Component {

  render() {
    const Title = styled.h1`
      font-size: 1.5em;
      text-align: center;
      color: palevioletred;
    `;

    const navStyle = {
      border: '1px solid blue',
      display: 'inline-block'
    };

    const tableStyle = {
      border: '1px solid magenta',
      display: 'inline-block',
    };

    baseStyles();
    return (
      <React.Fragment>
        <NavbarContainer />

        <div style={tableStyle}>
          table
        </div>
      </ React.Fragment>
    );
  }
}

export default App;
