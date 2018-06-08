import * as React from 'react'
import styled from 'styled-components'
import MenuContainer from './Menu'
import { ThemeContext } from './../theme-context'

const Navbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 30px 0 0;
  width: 220px;
`

const Logo = styled.img`
  margin: 0 0 0 30px;
  width: 130px;
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  justify-content: space-between;
  margin: 95px 0 0 0;
`

const ChangeView = styled.div`
  align-items: center;
  color: #939393;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  height: 23px;
  margin-bottom: 30px;
  padding: 0 0 0 30px;

  &:hover {
    color: ${ props => props.theme.text };

    .icon-wrapper {
      color: #596DFB;
    }
  }

  .icon-wrapper {
    margin: 0 15px 0 0;
    color: #939393;
  }
`

class NavbarContainer extends React.Component {
  renderLogo () {
    return (
      <ThemeContext.Consumer>
        {theme => {
          return <Logo src={ theme.logo } alt="CryptoCoin" />
        }}
      </ThemeContext.Consumer>
    )
  }

  renderChangeView() {
    return (
      <ThemeContext.Consumer>
        { theme => {
          return (
            <ChangeView onClick={ this.props.toggleTheme } theme={ theme }>
              <div className="icon-wrapper">
                {theme.changeThemeIcon()}
              </div>
              {theme.changeThemeText} View
            </ChangeView>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    return (
      <Navbar>
        { this.renderLogo() }
        <MenuWrapper>
          <MenuContainer />
          { this.renderChangeView() }
        </MenuWrapper>
      </Navbar>
    )
  }
}

export default NavbarContainer
