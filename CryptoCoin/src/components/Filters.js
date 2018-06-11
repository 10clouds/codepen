import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'

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
  height: 155px;
  min-height: 155px;
  position: sticky;
  top: -75px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding-bottom: 15px;
  font-size: 11px;
`

const Select2 = styled.div`
  position: relative;
  height: 38px;
  padding: 0 19px;
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
  margin: 0 0 0 8px;
`

const Options = styled.div`
  border: 1px dotted pink;
  display: ${ props => props.visible ? 'block' : 'none' };
  position: absolute;
  width: 100%;
  top: 38px;
  left: 0;
`

class MenuContainer extends React.Component {

  state = {
    filters: filters,
  }

  handleDropdownClick = (filterName) => {
    this.setState({
      filters: this.state.filters.map( filter => {
        if (filter.name === filterName) {
          filter.active = !filter.active
        }
        return filter
      })
    })
  }

  renderFilters() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          return (
            this.state.filters.map( e => {
              return (
                <Select2 theme={theme} bg={ e.background } onClick={ () => this.handleDropdownClick(e.name) }>
                  { e.name || e.options[0] }
                  <Arrow theme={ theme } dropdownVisible={ e.active } />
                  <Options theme={ theme } visible={ e.active } >
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
        { this.renderFilters() }
      </FiltersWrapper>
    )
  }
}

export default MenuContainer
