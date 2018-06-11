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
  align-items: flex-end;
  display: flex;
  font-size: 11px;
  height: 155px;
  justify-content: space-around;
  min-height: 155px;
  padding-bottom: 15px;
  position: sticky;
  top: -75px;
`

const Select = styled.div`
  align-items: center;
  background-color: ${ props => props.bg ? props.theme.filterBackground : null };
  box-shadow: ${ props => props.bg ? '1px 3px 22px 0 rgba(0, 0, 0, .48)' : null };
  color: #939393;
  display: flex;
  height: 38px;
  padding: 0 19px;
  position: relative;

  &:hover {
    background-color: ${ props => props.bg ? props.theme.accent : null };
  }
`

const Arrow = styled.div`
  border-bottom: ${ props => props.dropdownVisible ? '5px solid #939393' : null };
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: ${ props => props.dropdownVisible ? null : '5px solid #939393' };
  height: 0;
  margin: 0 0 0 8px;
  width: 0;
`

const Options = styled.div`
  border: 1px dotted pink;
  display: ${ props => props.visible ? 'block' : 'none' };
  left: 0;
  position: absolute;
  top: 38px;
  width: 100%;
`

class Filters extends React.Component {
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
                <Select theme={theme} bg={ e.background } onClick={ () => this.handleDropdownClick(e.name) }>
                  { e.name || e.options[0] }
                  <Arrow theme={ theme } dropdownVisible={ e.active } />
                  <Options theme={ theme } visible={ e.active } >
                    <ul>
                      {/* TODO: jak nie renderowac pierwszej wartosci, jezeli brak name (usd) */}
                      { e.options.map( e => <li>{ e }</li>) }
                    </ul>
                  </Options>
                </Select>
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

export default Filters
