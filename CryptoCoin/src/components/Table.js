import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'
import DataRow from './DataRow'
import { delays, durations, cellWidths, currencySymbols, headerData } from './../constants'
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
  width: 100%;

  &.header {
    background-image: linear-gradient(to right,  rgba(0,0,0, .0) , ${ props => props.theme.tableGrid } 5%, ${ props => props.theme.tableGrid } 95%, rgba(0,0,0, .0) 100% );
    background-size: 100% 1px;
    background-repeat: no-repeat;
  }
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
  transform: scale(1, 5);
  transform-origin: center bottom;

  &:nth-of-type(7) {
    border-right: 2px solid ${ props => props.theme.tableGrid };
  }
`

const HeaderCell = GapCell.extend`
  color: #939393;
  font-size: 10px;
  letter-spacing: 1.5px;
  line-height: 1.43;
  padding: 12px;
  border-image: linear-gradient(to top, ${ props => props.theme.tableGrid }, rgba(0,0,0, .0)) 2 100%;
  transform: scale(1, 1);

  &:not(:first-of-type) {
    text-align: right;
  }

  &:before {
    content: '';
    display: ${ props => props.sortActive ? 'block' : 'none' };
    position: absolute;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #939393;
    margin-top: 5px;
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
    let rowAnimationDelay = 0

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
          rowAnimationDelay = rowAnimationDelay + 1
          console.log(rowAnimationDelay)

          return (
            <React.Fragment key={ coin }>
              <DataRow
                barTransform={ barTransform }
                displayMask={ displayMask}
                delay={ delays[index] }
                duration={ durations[index] }
                rowAnimationDelay={ rowAnimationDelay }
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

  renderHeader(theme, sortBy) {

    return (
      <Row className="header" height={ 75 } theme={ theme } >
        { headerData.map( e => {
          return (
            <HeaderCell
              theme={ theme }
              width={ e.width }
              dangerouslySetInnerHTML={ e.title }
              sortActive={ sortBy === e.sortOption }
            />
          )
        })}
      </Row>
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
      <ThemeContext.Consumer >
        {({ theme, selectedFilters, marketCapType, rowDataObj }) => {
          return (
            <TableWrapper>
              { this.renderHeader(theme, selectedFilters.sort) }
              { rowDataObj ? this.renderRows(rowDataObj, selectedFilters, theme, marketCapType) : null }
            </TableWrapper>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Table
