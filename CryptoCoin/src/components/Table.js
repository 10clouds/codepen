import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'
import Box from './Box'
import DataRow from './DataRow'

const topTenCoins = ['BTC', 'ETH', 'XRP', 'BCH', 'EOS', 'LTC', 'ADA', 'XLM', 'TRX', 'NEO']
const graphEmptyData = topTenCoins.map( e => ({ symbol: e, data: null }))
const delays = [.4, .32, .25, .18, .15, .12, .1, .1, .1, .1]
const durations = [.58, .65, .71, .76, .78, .79, .8, .8, .8, .8]

const TableWrapper = styled.div`
  width: 100%;
  padding: 15px;
`

const Row = styled.div`
  ${'' /* border: 1px solid magenta; */}
  display: flex;
  justify-content:
  width: 100%;
  height: ${ props => props.height }px;
`

const Cell = styled.div`
  padding: 15px;
  color: ${ props => props.color ? props.color : props.theme.text };
  font-size: 11px;
  letter-spacing: 1.6px;
  ${'' /* border: 1px dashed pink; */}
  width: ${ props => props.width };
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: ${ props => props.left ? 'flex-start' : 'flex-end' };

  div {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${ props => props.left ? 'flex-start' : 'flex-end' };
  }
`

const GapCell = styled.div`
  border-left: 2px solid ${ props => props.theme.tableGrid };
  width: ${ props => props.width };

  &:nth-of-type(7n + 7) {
    border-right: 2px solid ${ props => props.theme.tableGrid };
  }
  &:nth-last-of-type(n + 1):nth-last-of-type(-n + 7) {
    border-bottom: 2px solid ${ props => props.theme.tableGrid };
  }
`

const HeaderCell = GapCell.extend`
  border-top: 2px solid ${ props => props.theme.tableGrid };
  padding: 12px;
  color: #939393;
  font-size: 10px;
  line-height: 1.43;
  letter-spacing: 1.5px;

  &:not(:first-of-type) {
    text-align: right;
  }
`

const Icon = styled.img`
  height: 27px;
  width: 27px;
  border-radius: 100%;
  margin: 0 19px 0 0;
  min-width: 27px;
`

class Table extends React.Component {
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
    fetch('https://api.coinmarketcap.com/v2/ticker/?limit=10&structure=array')
      .then( resp => resp.json())
      .then( all => all.data )
      .then( data => data.map( e => e.symbol))
      .then( topTenList => this.setState({ topTenList }))
      .catch( err => null)
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

    const def = chartColors.color === 'pink' ? (
      <defs>
        <linearGradient id="pink" x1="83.001%" x2="83.001%" y1="-208.062%" y2="100%">
          <stop offset="0%" stopColor={ '#F171DF' } />
          <stop offset="100%" stopColor={ '#D574E5' } stopOpacity="0" />
        </linearGradient>
      </defs>
    ) : (
      <defs>
        <linearGradient id="blue" x1="83.001%" x2="83.001%" y1="-208.062%" y2="100%">
          <stop offset="0%" stopColor={ '#546AFB' } />
          <stop offset="100%" stopColor={ '#7B74E5' } stopOpacity="0" />
        </linearGradient>
      </defs>
    )

    const fill = chartColors.color === 'pink' ? 'url(#pink)' : 'url(#blue)'

    return (
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart data={ chartData.data } >
          { def }
          <Area type='linear' dataKey='price' stroke={ chartColors.stroke } fill={fill} />
          <YAxis hide={true} type="number" domain={['dataMin', 'dataMax']} />
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
              <HeaderCell theme={ theme } width={ 'calc(0.22 * (100% - 210px))' } >Name</HeaderCell>
              <HeaderCell theme={ theme } width={ 'calc(0.19 * (100% - 210px))' } >Market Cap</HeaderCell>
              <HeaderCell theme={ theme } width={ '120px' } >Price</HeaderCell>
              <HeaderCell theme={ theme } width={ 'calc(0.17 * (100% - 210px))' } >Volume<br/>(24h)</HeaderCell>
              <HeaderCell theme={ theme } width={ 'calc(0.24 * (100% - 210px))' } >Circulating<br/>Supply</HeaderCell>
              <HeaderCell theme={ theme } width={ '90px' } >Change<br/>(24h)%</HeaderCell>
              <HeaderCell theme={ theme } width={ 'calc(0.21 * (100% - 210px))' } >Price Graph<br/>(14d)</HeaderCell>
            </Row>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderRow() {
    const { topTenData, firstColumnData } = this.state

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

          return (
            <ThemeContext.Consumer>
              { theme => {
                const color = CHANGEPCT24HOUR !== 0 ? (CHANGEPCT24HOUR > 0 ? theme.success : theme.warning) : theme.text

                return (
                  <React.Fragment>
                    <DataRow
                      barTransform={ this.props.barTransform }
                      displayMask={ this.props.displayMask}
                      delay={ delays[index] }
                      duration={ durations[index] }
                    >
                      <Cell theme={ theme } left width={ 'calc(0.22* (100% - 210px))' }>
                        <Icon src={`https://www.cryptocompare.com/${firstColumnData[index].url}`} />
                        { firstColumnData[index].name }
                      </Cell>
                      <Cell theme={ theme } width={ 'calc(0.19 * (100% - 210px))' }>
                        ${ MKTCAP.toLocaleString() }
                      </Cell>
                      <Cell theme={ theme } width={ '120px' }>${ PRICE.toLocaleString() }</Cell>
                      <Cell theme={ theme } width={ 'calc(0.17 * (100% - 210px))' }>${ VOLUME24HOUR.toLocaleString() }</Cell>
                      <Cell theme={ theme } width={ 'calc(0.24 * (100% - 210px))' }>
                        { SUPPLY.toLocaleString() }
                        &nbsp; { FROMSYMBOL }
                      </Cell>
                      <Cell
                        theme={ theme }
                        color={ color }
                        width={ '90px' }
                      >
                        { CHANGEPCT24HOUR.toFixed(2) }%
                      </Cell>
                      <Cell theme={ theme } width={ 'calc(0.21 * (100% - 210px))' }>
                        { this.renderChart(coin, CHANGEPCT24HOUR) }
                      </Cell>
                    </DataRow>
                    { this.renderGap(theme) }
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

  renderGap(theme) {
    return(
      <Row height={19}>
        <GapCell theme={ theme } width={ 'calc(0.22 * (100% - 210px))' } />
        <GapCell theme={ theme } width={ 'calc(0.19 * (100% - 210px))' } />
        <GapCell theme={ theme } width={ '120px' } />
        <GapCell theme={ theme } width={ 'calc(0.17 * (100% - 210px))' } />
        <GapCell theme={ theme } width={ 'calc(0.24 * (100% - 210px))' } />
        <GapCell theme={ theme } width={ '90px' } />
        <GapCell theme={ theme } width={ 'calc(0.21 * (100% - 210px))' } />
      </Row>
    )
  }

  render() {
    return (
      <TableWrapper>
        { this.renderHeader() }
        { this.state.topTenData && this.state.firstColumnData &&
           this.renderRow()
        }
      </TableWrapper>
    )
  }
}

export default Table
