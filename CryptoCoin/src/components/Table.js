import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'
import DataRow from './DataRow'
import { topTenCoins, graphEmptyData, delays, durations, cellWidths } from './../constants'
import PropTypes from 'prop-types'

const { name, cap, price, volume, supply, change, chart } = cellWidths

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
  }

  state = {
    topTenData: null,
    firstColumnData: null,
    chartsData: graphEmptyData,
  }

  componentDidMount() {
    //this.getTopTenList()

    this.getFirstColumnData()
    this.getData()
    topTenCoins.map( symbol => {
      fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=13&aggregate=1`)
        .then( resp => resp.json() )
        .then( data => data.Data )
        .then( data => Promise.all(data.map( (data) => {
          return ( {price: data.close} )
        })))
        .then( info => this.setState({ chartsData: this.state.chartsData.map( coin => {
          if (coin.symbol === symbol) coin.data = info
          return coin
        }
        )}))
        .catch( err => (err))
    })
  }

  getTopTenList() {
    fetch('https://api.coinmarketcap.com/v2/ticker/?limit=15&structure=array')
      .then( resp => resp.json() )
      .then( all => all.data )
      .then( data => data.map( e => e.symbol) )
      .then( topTenList => this.setState({ topTenList }) )
      .catch( err => err )
  }

  getFirstColumnData() {
    fetch(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${topTenCoins}&tsym=USD`)
      .then( resp => resp.json() )
      .then( data => data.Data )
      .then( data => data.map( coin => {
        return (
          {
            name: coin.CoinInfo.FullName,
            url: coin.CoinInfo.ImageUrl
          }
        )
      }))
      .then( firstColumnData => this.setState({ firstColumnData }) )
      .catch( err => err)
  }

  getData() {
    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${topTenCoins}&tsyms=USD`)
      .then( resp => resp.json() )
      .then( data => Promise.resolve(data.RAW) )
      .then( topTenData => this.setState({ topTenData}) )
      .catch( err => err)
  }

  renderChart(coin, CHANGEPCT24HOUR) {
    const chartData = this.state.chartsData.find( e => {
      return e.symbol === coin
    })
    const chartColors = CHANGEPCT24HOUR !== 0 ? (CHANGEPCT24HOUR > 0 ? {stroke:'#546AFB', color: 'blue' } : { stroke: '#F171DF', color: 'pink' } ) : { stroke:'#fff', color: 'white' }
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
        <AreaChart data={ chartData.data } >
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
        { theme => {
          return (
            <Row height={ 75 }>
              <HeaderCell theme={ theme } width={ name }>Name</HeaderCell>
              <HeaderCell theme={ theme } width={ cap }>Market Cap</HeaderCell>
              <HeaderCell theme={ theme } width={ price }>Price</HeaderCell>
              <HeaderCell theme={ theme } width={ volume }>Volume<br/>(24h)</HeaderCell>
              <HeaderCell theme={ theme } width={ supply }>Circulating<br/>Supply</HeaderCell>
              <HeaderCell theme={ theme } width={ change }>Change<br/>(24h)%</HeaderCell>
              <HeaderCell theme={ theme } width={ chart }>Price Graph<br/>(14d)</HeaderCell>
            </Row>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderRows() {
    const { topTenData, firstColumnData } = this.state
    const { barTransform, displayMask } = this.props

    return (
      <React.Fragment>
        { topTenCoins.map( (coin, index) => {
          const {
            MKTCAP,
            PRICE,
            VOLUME24HOUR,
            SUPPLY,
            CHANGEPCT24HOUR,
            FROMSYMBOL
          } = topTenData[coin].USD
          const isLastGap = index === topTenCoins.length - 1

          return (
            <ThemeContext.Consumer>
              { theme => {
                const color = CHANGEPCT24HOUR !== 0 ? (CHANGEPCT24HOUR > 0 ? theme.success : theme.warning) : theme.text

                return (
                  <React.Fragment>
                    <DataRow
                      barTransform={ barTransform }
                      displayMask={ displayMask}
                      delay={ delays[index] }
                      duration={ durations[index] }
                    >
                      <Cell theme={ theme } left width={ name }>
                        <Icon src={`https://www.cryptocompare.com/${firstColumnData[index].url}`} />
                        { firstColumnData[index].name }
                      </Cell>
                      <Cell theme={ theme } width={ cap }>
                        ${ MKTCAP.toLocaleString() }
                      </Cell>
                      <Cell theme={ theme } width={ price }>${ PRICE.toLocaleString() }</Cell>
                      <Cell theme={ theme } width={ volume }>${ VOLUME24HOUR.toLocaleString() }</Cell>
                      <Cell theme={ theme } width={ supply }>
                        { SUPPLY.toLocaleString() }
                        &nbsp;{ FROMSYMBOL }
                      </Cell>
                      <Cell
                        theme={ theme }
                        color={ color }
                        width={ change }
                      >
                        { CHANGEPCT24HOUR.toFixed(2) }%
                      </Cell>
                      <Cell theme={ theme } width={ chart }>
                        { this.renderChart(coin, CHANGEPCT24HOUR) }
                      </Cell>
                    </DataRow>
                    { this.renderGap(theme, isLastGap) }
                  </React.Fragment>
                )
              }}
            </ThemeContext.Consumer>
          )
        })
        }
      </React.Fragment>
    )
  }

  renderGap(theme, isLastGap) {
    return(
      <Row theme={ theme } height={19} borderBottom={ isLastGap } >
        <GapCell theme={ theme } width={ name } />
        <GapCell theme={ theme } width={ cap } />
        <GapCell theme={ theme } width={ price } />
        <GapCell theme={ theme } width={ volume } />
        <GapCell theme={ theme } width={ supply } />
        <GapCell theme={ theme } width={ change } />
        <GapCell theme={ theme } width={ chart } />
      </Row>
    )
  }

  render() {
    return (
      <TableWrapper>
        { this.renderHeader() }
        { this.state.topTenData && this.state.firstColumnData &&
           this.renderRows()
        }
      </TableWrapper>
    )
  }
}

export default Table
