import * as React from 'react';
import styled from 'styled-components';
import NavbarContainer from './NavbarContainer';
import baseStyles from '../base-styles';
import { ThemeContext, themes } from './../theme-context';
import circle from "./../assets/circle.svg";

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
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
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
      console.log('end');

    }, 1000);
  }

  render() {
    baseStyles();
    const bgColor = !this.state.bgTransform ? this.state.theme.background : this.state.theme.changeThemeBackground;

    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Background color={bgColor} zIndex={this.state.bgZIndex} />
        <NavbarContainer toggleTheme={this.toggleTheme} />
        <Circle theme={this.state.theme} scale={this.state.scale} zIndex={this.state.circleZIndex} />
      </ThemeContext.Provider>
    );
  }
}

export default App;

// background-color: ${ this.state.theme.background };