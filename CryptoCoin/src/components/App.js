import * as React from 'react';
import styled from 'styled-components';
import NavbarContainer from './NavbarContainer';
import baseStyles from '../base-styles';
import { ThemeContext, themes } from './../theme-context';
import TableContainer from './TableContainer';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  color: ${props => props.theme.text};
  display: flex;
  align-items: stretch;
`;

const Circle = styled.div`
  height: 100px;
  width: 100px;
  background: ${props => props.theme.background};
  transition: transform 1s ease-in;
  border-radius: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: ${props => props.zIndex};
  transform: scale(${props => props.scale});
`;

const Background = styled.div`
  height: 100%;
  width: 100%;
  background: ${props => props.color};
  z-index: ${props => props.zIndex};
  position: absolute;
`;

class App extends React.Component {

  state = {
    theme: themes.dark,
    scale: 1,
    bgZIndex: '-1',
    circleZIndex: '-2',
    bgTransform: false,
  }

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
      scale: 100,
      bgZIndex: '-2',
      circleZIndex: '-1',
      bgTransform: true,
    }));

    setTimeout(() => {
      this.setState({
        scale: 1,
        bgZIndex: '-1',
        circleZIndex: '-2',
        bgTransform: false,
      });
    }, 1000);
  }

  render() {
    baseStyles();
    const {
      theme,
      scale,
      bgZIndex,
      circleZIndex,
      bgTransform,
    } = this.state;

    const bgColor = !bgTransform ? theme.background : theme.changeThemeBackground;

    return (
      <ThemeContext.Provider value={theme}>
        <Wrapper theme={theme}>
          <Background color={bgColor} zIndex={bgZIndex} />
          <NavbarContainer toggleTheme={this.toggleTheme} />
          <TableContainer />
          <Circle theme={theme} scale={scale} zIndex={circleZIndex} />
        </Wrapper>
      </ThemeContext.Provider>
    );
  }
}

export default App;

// background-color: ${ this.state.theme.background };