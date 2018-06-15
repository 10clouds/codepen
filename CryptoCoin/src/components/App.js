import * as React from 'react'
import styled from 'styled-components'
import NavbarContainer from './NavbarContainer'
import baseStyles from '../base-styles'
import { ThemeContext, themes } from './../theme-context'
import TableContainer from './TableContainer'

const Wrapper = styled.div`
  align-items: stretch;
  color: ${props => props.theme.text};
  display: flex;
  height: 100%;
  width: 100%;
`

const Circle = styled.div`
  background: ${ props => props.theme.background };
  border-radius: 100%;
  bottom: 0;
  height: 100px;
  left: 0;
  /* position: absolute; */
  transform: scale(${ props => props.scale });
  transition: transform 2s ease-in;
  width: 100px;
  z-index: ${ props => props.zIndex };

  position: fixed;
`

const Background = styled.div`
  background: ${ props => props.color };
  height: 100%;
  /* position: absolute; */
  width: 100%;
  z-index: ${ props => props.zIndex };

  position: fixed;
`

class App extends React.Component {

  state = {
    theme: themes.dark,
    scale: 1,
    bgZIndex: '-1',
    circleZIndex: '-2',
    bgTransform: false,
    barTransform: '-100%',
    displayMask: false,
  }

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
      scale: 100,
      bgZIndex: '-2',
      circleZIndex: '-1',
      bgTransform: true,
      barTransform: 0,
      displayMask: true,
    }))

    setTimeout( () => {
      this.setState({
        barTransform: '-100%',
        displayMask: false,
      })
    }, 1100)

    setTimeout(() => {
      this.setState({
        scale: 1,
        bgZIndex: '-1',
        circleZIndex: '-2',
        bgTransform: false,
      })
    }, 2000)
  }

  render() {
    baseStyles()
    const {
      theme,
      scale,
      bgZIndex,
      circleZIndex,
      bgTransform,
    } = this.state

    const bgColor = !bgTransform ? theme.background : theme.changeThemeBackground

    return (
      <ThemeContext.Provider value={ theme }>
        <Wrapper theme={ theme }>
          <Background color={ bgColor } zIndex={ bgZIndex } />
          <NavbarContainer toggleTheme={ this.toggleTheme } />
          <TableContainer barTransform={ this.state.barTransform } displayMask={ this.state.displayMask }/>
          <Circle
            theme={ theme }
            scale={ scale }
            zIndex={ circleZIndex }
          />
        </Wrapper>
      </ThemeContext.Provider>
    )
  }
}

export default App
