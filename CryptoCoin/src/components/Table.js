import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'
import DataRow from './DataRow'
import { delays, durations, cellWidths, currencySymbols } from './../constants'
import PropTypes from 'prop-types'

const { nameWidth, capWidth, priceWidth, volumeWidth, supplyWidth, changeWidth, chartWidth } = cellWidths

const TableWrapper = styled.div`
  padding: 15px;
  width: 100%;
`

const Row = styled.div`
  border-bottom: ${ props => props.borderBottom ? '2px' : '0px' } solid ${ props => props.theme.tableGrid };
  display: flex;
  height: ${ props => props.height }px;
  justify-content:
  width: 100%;
`

const Cell = styled.div`
  align-items: center;
  color: ${ props => props.color ? props.color : props.theme.text };
  display: flex;
  font-size: 11px;
  height: 100%;
  justify-content: ${ props => props.left ? 'flex-start' : 'flex-end' };
  letter-spacing: 1.6px;
  padding: 15px;
  width: ${ props => props.width };

  div {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: ${ props => props.left ? 'flex-start' : 'flex-end' };
    width: 100%;
  }
`

const GapCell = styled.div`
  border-left: 2px solid ${ props => props.theme.tableGrid };
  width: ${ props => props.width };

  &:nth-of-type(7) {
    border-right: 2px solid ${ props => props.theme.tableGrid };
  }
`

const HeaderCell = GapCell.extend`
  border-top: 1px solid ${ props => props.theme.tableGrid };
  color: #939393;
  font-size: 10px;
  letter-spacing: 1.5px;
  line-height: 1.43;
  padding: 12px;

  &:not(:first-of-type) {
    text-align: right;
  }
`

const Icon = styled.img`
  border-radius: 100%;
  height: 27px;
  margin: 0 19px 0 0;
  min-width: 27px;
  width: 27px;
`

class Table extends React.Component {

  static propTypes = {
    barTransform: PropTypes.string ,
    displayMask: PropTypes.bool,
    selectedFilters: PropTypes.object,
  }

  state = {
    topTenData: null,
    selectedFilters: this.props.selectedFilters,
  }

  renderRows(rowDataObj, selectedFilters, theme, marketCapType) {
    const { barTransform, displayMask } = this.props
    const currency = selectedFilters.currency
    const currencySymbol = currencySymbols[Object.keys(currencySymbols).find( e => e === currency )]

    return (
      <React.Fragment>
        { rowDataObj.map( obj => obj.symbol ).map( (coin, index) => {
          const {
            name,
            url,
            marketCap,
            price,
            volume,
            supply,
            change,
            fromSymbol,
            chartData,
          } = rowDataObj.find( e => e.symbol === coin )

          const isLastGap = index === marketCapType.length - 1
          const color = change !== 0 ? (change > 0 ? theme.success : theme.warning) : theme.text

          return (
            <React.Fragment>
              <DataRow
                barTransform={ barTransform }
                displayMask={ displayMask}
                delay={ delays[index] }
                duration={ durations[index] }
              >
                <Cell theme={ theme } left width={ nameWidth }>
                  <Icon src={`https://www.cryptocompare.com/${url}`} />
                  { name }
                </Cell>
                <Cell theme={ theme } width={ capWidth }>
                  { currencySymbol } { marketCap.toLocaleString() }
                </Cell>
                <Cell theme={ theme } width={ priceWidth }>{ currencySymbol } { price.toLocaleString() }</Cell>
                <Cell theme={ theme } width={ volumeWidth }>{ currencySymbol } { volume.toLocaleString() }</Cell>
                <Cell theme={ theme } width={ supplyWidth }>
                  { supply.toLocaleString() }
                  &nbsp;{ fromSymbol }
                </Cell>
                <Cell
                  theme={ theme }
                  color={ color }
                  width={ changeWidth }
                >
                  { change.toFixed(2) }%
                </Cell>
                <Cell theme={ theme } width={ chartWidth }>
                  { this.renderChart(coin, change, chartData) }
                </Cell>
              </DataRow>
              { this.renderGap(theme, isLastGap) }
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }

  // getTopTenList() {
  //   fetch('https://api.coinmarketcap.com/v2/ticker/?limit=15&structure=array')
  //     .then( resp => resp.json() )
  //     .then( all => all.data )
  //     .then( data => data.map( e => e.symbol) )
  //     .then( topTenList => this.setState({ topTenList }) )
  //     .catch( err => err )
  // }

  renderChart(coin, change, chartData) {
    const chartColors = change !== 0 ? (change > 0 ? { stroke:'#546AFB', color: 'blue' } : { stroke: '#F171DF', color: 'pink' } ) : { stroke:'#fff', color: 'white' }
    const fill = chartColors.color === 'pink' ? 'url(#pink)' : (chartColors.color === 'blue' ? 'url(#blue)' : 'url(#white)')
    const def = chartColors.color === 'pink' ? (
      <defs>
        <linearGradient id="pink" x1="83.001%" x2="83.001%" y1="-208.062%" y2="100%">
          <stop offset="0%" stopColor={ '#F171DF' } />
          <stop offset="100%" stopColor={ '#D574E5' } stopOpacity="0" />
        </linearGradient>
      </defs>
    ) : (
      chartColors.color === 'blue' ? (
        <defs>
          <linearGradient id="blue" x1="83.001%" x2="83.001%" y1="-208.062%" y2="100%">
            <stop offset="0%" stopColor={ '#546AFB' } />
            <stop offset="100%" stopColor={ '#7B74E5' } stopOpacity="0" />
          </linearGradient>
        </defs>
      ) : (
        <defs>
          <linearGradient id="white" x1="83.001%" x2="83.001%" y1="-208.062%" y2="100%">
            <stop offset="0%" stopColor={ '#fff' } />
            <stop offset="100%" stopColor={ '#fff' } stopOpacity="0" />
          </linearGradient>
        </defs>
      )
    )

    return (
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart data={ chartData } >
          { def }
          <Area type='linear' dataKey='price' stroke={ chartColors.stroke } fill={ fill } />
          <YAxis hide={ true } type="number" domain={ ['dataMin', 'dataMax'] } />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  renderHeader() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => {
          return (
            <Row height={ 75 }>
              <HeaderCell theme={ theme } width={ nameWidth }>Name</HeaderCell>
              <HeaderCell theme={ theme } width={ capWidth }>Market Cap</HeaderCell>
              <HeaderCell theme={ theme } width={ priceWidth }>Price</HeaderCell>
              <HeaderCell theme={ theme } width={ volumeWidth }>Volume<br/>(24h)</HeaderCell>
              <HeaderCell theme={ theme } width={ supplyWidth }>Circulating<br/>Supply</HeaderCell>
              <HeaderCell theme={ theme } width={ changeWidth }>Change<br/>(24h)%</HeaderCell>
              <HeaderCell theme={ theme } width={ chartWidth }>Price Graph<br/>(14d)</HeaderCell>
            </Row>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderGap(theme, isLastGap) {
    return(
      <Row theme={ theme } height={19} borderBottom={ isLastGap } >
        <GapCell theme={ theme } width={ nameWidth } />
        <GapCell theme={ theme } width={ capWidth } />
        <GapCell theme={ theme } width={ priceWidth } />
        <GapCell theme={ theme } width={ volumeWidth } />
        <GapCell theme={ theme } width={ supplyWidth } />
        <GapCell theme={ theme } width={ changeWidth } />
        <GapCell theme={ theme } width={ chartWidth } />
      </Row>
    )
  }

  render() {
    return (
      <TableWrapper>
        { this.renderHeader() }
        <ThemeContext.Consumer >
          {({ theme, selectedFilters, marketCapType, rowDataObj }) => {
            return rowDataObj ? this.renderRows(rowDataObj, selectedFilters, theme, marketCapType) : null
          }}
        </ThemeContext.Consumer>

      </TableWrapper>
    )
  }
}

export default Table
