import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'

const topTenCoins = ['BTC', 'ETH', 'XRP', 'BCH', 'EOS', 'LTC', 'ADA', 'XLM', 'TRX', 'NEO']

const graphEmptyData = topTenCoins.map( e => ({ symbol: e, data: null }))

const Data = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr) 140px repeat(2, 1fr) 90px 1fr;
  grid-template-rows: 75px repeat(10, 75px [col-start] 19px [col-end]);
  padding: 15px;
`

const Cell = styled.div`
  background-color: ${ props => props.theme.barColor };
  display: flex;
  align-items: center;
  justify-content: ${ props => props.left ? 'flex-start' : 'flex-end' };
  text-align: ${ props => props.left ? 'left' : 'right' };
  padding: 15px;
  color: ${ props => props.color ? props.color : props.theme.text };
  font-size: 11px;
  letter-spacing: 1.6px;

  &:nth-of-type(7n + 1) {
    margin-left: -4px;
    border-left: 4px solid ${ props => props.theme.barColor };
  }

  &:nth-of-type(7n + 7) {
    margin-right: -8px;
    border-right: 8px solid ${ props => props.theme.barColor };
  }

  div {
    max-height: 100%;
  }
`

const GapCell = styled.div`
  border-left: 2px solid ${ props => props.theme.tableGrid };

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

  renderChart(coin, chartColors) {
    const chartData = this.state.chartsData.find( e => {
      return e.symbol === coin
    })

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
            <React.Fragment>
              <HeaderCell theme={ theme }>Name</HeaderCell>
              <HeaderCell theme={ theme } >Market Cap</HeaderCell>
              <HeaderCell theme={ theme }>Price</HeaderCell>
              <HeaderCell theme={ theme }>Volume<br/>(24h)</HeaderCell>
              <HeaderCell theme={ theme }>Circulating<br/>Supply</HeaderCell>
              <HeaderCell theme={ theme }>Change<br/>(24h)%</HeaderCell>
              <HeaderCell theme={ theme }>Price Graph<br/>(14d)</HeaderCell>
            </React.Fragment>
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
                const chartColors = CHANGEPCT24HOUR !== 0 ? (CHANGEPCT24HOUR > 0 ? {stroke:'#546AFB', color: 'blue' } : { stroke: '#F171DF', color: 'pink' } ) : { stroke:'#fff', color: 'white' }

                return (
                  <React.Fragment>
                    <Cell theme={ theme } left>
                      <Icon src={`https://www.cryptocompare.com/${firstColumnData[index].url}`} />
                      { firstColumnData[index].name }
                    </Cell>
                    <Cell theme={ theme }>${ MKTCAP.toLocaleString() }</Cell>
                    <Cell theme={ theme }>${ PRICE.toLocaleString() }</Cell>
                    <Cell theme={ theme }>${ VOLUME24HOUR.toLocaleString() }</Cell>
                    <Cell theme={ theme }>
                      { SUPPLY.toLocaleString() }
                      &nbsp; { FROMSYMBOL }
                    </Cell>
                    <Cell
                      theme={ theme }
                      color={ color } >
                      { CHANGEPCT24HOUR.toFixed(2) }%
                    </Cell>
                    <Cell theme={ theme }>
                      { this.renderChart(coin, chartColors) }
                    </Cell>
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
      <React.Fragment>
        <GapCell theme={ theme } />
        <GapCell theme={ theme } />
        <GapCell theme={ theme } />
        <GapCell theme={ theme } />
        <GapCell theme={ theme } />
        <GapCell theme={ theme } />
        <GapCell theme={ theme } />
      </React.Fragment>
    )
  }

  render() {
    console.log(this.props)

    return (
      <Data>
        { this.renderHeader() }
        { this.state.topTenData && this.state.firstColumnData &&
           this.renderRow()
        }
      </Data>
    )
  }
}

export default Table
