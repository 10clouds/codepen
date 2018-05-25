import * as React from 'react';
import styled from 'styled-components';
import NavbarContainer from './NavbarContainer';
import baseStyles from '../base-styles';
import { ThemeContext, themes } from './../theme-context';

class App extends React.Component {

  state = {
    theme: themes.dark
  }

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }));
  }

  render() {
    baseStyles();

    const Wrapper = styled.div`
      background-color: ${ this.state.theme.background };
      color: ${ this.state.theme.text };
      height: 100%;
      width: 100%;
    `;

    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Wrapper>
          <NavbarContainer toggleTheme={this.toggleTheme} />
        </Wrapper>
      </ThemeContext.Provider>
    );
  }
}

export default App;
