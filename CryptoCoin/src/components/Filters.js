import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import 'react-select/dist/react-select.css'

const filters = [
  {
    name: 'ALL',
    options: ['aaa', 'sss', 'ddd', 'fff'],
    background: false,
  },
  {
    name: 'COINS',
    options: ['qqq', 'www', 'eee', 'rrr'],
    background: false,
  },
  {
    name: 'TOKENS',
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: false,
  },
  {
    name: null,
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: true,
  },
  {
    name: 'MARKET CAP',
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: true,
  },
  {
    name: 'TREND VOLUME',
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: true,
  },
  {
    name: 'TRENDING',
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: true,
  },
  {
    name: 'TOOLS',
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: true,
  },
]

const FiltersWrapper = styled.div`
  height: 206px;
  min-height: 206px;
  position: sticky;
  top: -100px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding-bottom: 20px;
`

const Select2 = styled.div`
  /* border: 1px dotted magenta; */
  position: relative;
  height: 50px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  color: #939393;
  background-color: ${ props => props.bg ? props.theme.filterBackground : null };
  box-shadow: ${ props => props.bg ? '1px 3px 22px 0 rgba(0, 0, 0, .48)' : null };
  &:hover {
    background-color: ${ props => props.bg ? props.theme.accent : null };
  }
`

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: ${ props => props.dropdownVisible ? null : '5px solid #939393' };
  border-bottom: ${ props => props.dropdownVisible ? '5px solid #939393' : null };
  margin: 0 0 0 10px;
`

const Options = styled.div`
  border: 1px dotted pink;
  display: ${ props => props.visible ? 'block' : 'none' };
  position: absolute;
  width: 100%;
  top: 50px;
  left: 0;
`

class MenuContainer extends React.Component {

  renderFilters(filters) {
    const Filter = styled.div`
      height: 40px;
      padding: 0 20px;
      border: 1px solid magenta;
      display: inline-block;
    `

    return (
      <ThemeContext.Consumer>
        { theme => (
          filters.map((filter, i) => (
            <Filter key={i} theme={theme}>
              { filter.name }
            </Filter>
          ))
        )}
      </ThemeContext.Consumer>
    )
  }

  state = {
    dropdownVisible: false,
  }

  handleDropdownClick = () => {
    const { dropdownVisible } = this.state
    this.setState({
      dropdownVisible: !dropdownVisible,
    })
  }

  renderStuff(filters) {
    const { dropdownVisible } = this.state

    return (
      <ThemeContext.Consumer>
        {theme => {
          return (
            filters.map( e => {
              return (
                <Select2 theme={theme} bg={ e.background } onClick={ this.handleDropdownClick }>
                  { e.name || e.options[0] }
                  <Arrow theme={ theme } dropdownVisible={ dropdownVisible } />
                  <Options theme={ theme } visible={ dropdownVisible } >
                    <ul>
                      {/* TODO: jak nie renderowac pierwszej wartosci, jezeli brak name (usd) */}
                      { e.options.map( e => <li>{ e }</li>) }
                    </ul>
                  </Options>
                </Select2>
              )
            })
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    return (
      <FiltersWrapper>
        {/* { this.renderFilters(filters) } */}
        { this.renderStuff(filters) }
      </FiltersWrapper>
    )
  }
}

export default MenuContainer
