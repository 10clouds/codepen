import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import { filters } from './../constants'
import { lighten } from 'polished'

const FiltersWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  font-size: 11px;
  height: 155px;
  justify-content: flex-end;
  min-height: 155px;
  padding: 0 15px 15px 0;
  position: sticky;
  top: -75px;
  z-index: 6;
`

const Select = styled.div`
  align-items: center;
  background-color: ${ props => props.theme.filterBackground };
  box-shadow: 1px 3px 22px 0 rgba(0, 0, 0, .48);
  color: #939393;
  display: flex;
  height: 38px;
  padding: 0 35px;
  position: relative;
  margin: 0 0 0 30px;
  z-index: +1;

    ul {
      background-color: ${ props => props.theme.filterBackground };
      width: 100%;
      box-shadow: 1px 3px 22px 0 rgba(0, 0, 0, .48);

      li {
        height: 45px;
        padding: 0 35px;
        display: flex;
        align-items: center;

        &:hover {
          box-shadow: 1px 3px 22px 0 rgba(0, 0, 0, .48);
          color: ${lighten(0.3, '#939393')};
        }
      }
    }

  ${'' /* &:hover {
    background-color: ${ props => props.bg ? props.theme.accent : null };
  } */}
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

  handleOptionClick(e) {
    console.log(e.target)
  }

  renderFilters() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          return (
            this.state.filters.map( filter => {
              return (
                <Select theme={ theme } onClick={ () => this.handleDropdownClick(filter.name) }>
                  { filter.name || filter.options[0] }
                  <Arrow dropdownVisible={ filter.active } />
                  <Options theme={ theme } visible={ filter.active } >
                    <ul>
                      {/* TODO: jak nie renderowac pierwszej wartosci, jezeli brak name (usd) */}
                      { filter.options.map( option => <li onClick={ e => this.handleOptionClick(e) }>{ option }</li> )}
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

  fn = () => {
    this.props.callback("aaaaa")
  }

  render() {
    return (
      <FiltersWrapper>
        { this.fn() }
        { this.renderFilters() }
      </FiltersWrapper>
    )
  }
}

export default Filters
