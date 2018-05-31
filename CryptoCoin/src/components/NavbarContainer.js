import * as React from 'react';
import styled from 'styled-components';
import MenuContainer from './Menu';
import { ThemeContext } from './../theme-context';

const Navbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px 0 0;
  width: 294px;
`;

const Logo = styled.img`
  margin: 0 0 0 40px;
  width: 174px;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  justify-content: space-between;
  margin: 127px 0 0 0;
`;

const ChangeView = styled.div`
  align-items: center;
  color: #939393;
  cursor: pointer;
  display: flex;
  font-size: 18px;
  height: 30px;
  margin-bottom: 40px;
  padding: 0 0 0 40px;

  &:hover {
    color: ${ props => props.theme.text };

    .icon-wrapper {
      color: #596DFB;
    }
  }

  .icon-wrapper {
    margin: 0 20px 0 0;
    color: #939393;
  }
`;

class NavbarContainer extends React.Component {

  renderLogo () {
    return (
      <ThemeContext.Consumer>
        {theme => {
          return <Logo src={ theme.logo } alt="CryptoCoin" />;
        }}
      </ThemeContext.Consumer>
    );
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
          );
        }}
      </ThemeContext.Consumer>
    );
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
    );
  }
}

export default NavbarContainer;
