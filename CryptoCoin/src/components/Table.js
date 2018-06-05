import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import x from './../coinsData'

const Data = styled.div`
  width: 100%;
  border: 2px dotted orange;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 100px repeat(10, 100px [col-start] 25px [col-end]) 100px;
  padding: 20px;
`

const Cell = styled.div`
  background-color: ${ props => props.theme.barColor };
  display: flex;
  align-items: center;
  justify-content: ${ props => props.left ? 'flex-start' : 'flex-end' };
  text-align: ${ props => props.left ? 'left' : 'right' };
  padding: 20px;
  color: ${ props => props.color ? props.color : props.theme.text };
  font-size: 15px;
  letter-spacing: 1.6px;

  &:nth-of-type(7n + 1) {
    margin-left: -5px;
    border-left: 5px solid ${ props => props.theme.barColor };
  }

  &:nth-of-type(7n + 7) {
    margin-right: -10px;
    border-right: 10px solid ${ props => props.theme.barColor };
  }

  div {
    max-height: 100%;
  }
`

const GapCell = styled.div`
  border-left: 2px solid #2f3033;

  &:nth-of-type(7n + 7) {
    border-right: 2px solid #2f3033;
  }
  &:nth-last-of-type(n + 1):nth-last-of-type(-n + 7) {
    border-bottom: 2px solid #2f3033;
  }
`

const HeaderCell = GapCell.extend`
  border-top: 2px solid #2f3033;
  padding: 16px;
  color: #939393;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 1.5px;

  &:not(:first-of-type) {
    text-align: right;
  }
`

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
]

class Table extends React.Component {

  state = {
    topTenList: null,
    coinsList: null,
    coins: null,
    images: null,
  }

  componentDidMount() {
    this.getTopTenList()

    //x.then( (x) => Promise.resolve(this.setState({ x: x})) )

    fetch('https://api.coinmarketcap.com/v2/ticker/?limit=10&structure=array')
      .then( resp => resp.json())
      .then( all => all.data )
      .then( data => data.map( e => e.symbol))
      .then( symbols => Promise.resolve(symbols.map( e => {
        return (
          fetch(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${e}&tsym=USD`)
            .then( resp =>  resp.json() )
            .then( data => data.Data[0].CoinInfo.ImageUrl )
            .then( url => Promise.resolve(`https://www.cryptocompare.com/${url}`))
            .catch( err => err )
        )
      })
      )
      )
      .then( images => this.setState({ images }) )
      .catch( err => err)


    // fetch('https://min-api.cryptocompare.com/data/all/coinlist')
    //   .then( resp => resp.json())
    //   .then( data => data.Data)
    //   .then( coinsList => this.setState({ coinsList }))
    //   .catch( err => console.log('Error!', err))

  }

  getTopTenList() {
    fetch('https://api.coinmarketcap.com/v2/ticker/?limit=10&structure=array')
      .then( resp => resp.json() )
      .then( all => all.data )
      .then( data => data.map( e => e.symbol))
      .then( topTenList => this.setState({ topTenList }))
      .catch( err => console.log('Error!', err))


  }

  renderHeader() {
    return (
      <ThemeContext.Consumer>
        { theme => {
          return (
            <React.Fragment>
              <HeaderCell theme={ theme }>Name</HeaderCell>
              <HeaderCell>Market Cap</HeaderCell>
              <HeaderCell>Price</HeaderCell>
              <HeaderCell>Volume<br/>(24h)</HeaderCell>
              <HeaderCell>Circulating<br/>Supply</HeaderCell>
              <HeaderCell>Change<br/>(24h)%</HeaderCell>
              <HeaderCell>Price Graph<br/>(7d)</HeaderCell>
            </React.Fragment>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderIcon(symbol) {
    const coin = this.state.coinsList ? this.state.coinsList[symbol] : null
    const coinId = coin ? coin.Id : null

    console.log(this.state.imgUrl)

    return <img src={{url:this.state.imgUrl}} />

    //return <img src={this.state.imgUrl} />;

    // if (coinId) {

    // }

  }

  renderRow(coinsData) {
    return (
      coinsData.map((coinData) => {
        const {
          market_cap,
          price,
          volume_24h,
          percent_change_24h
        } = coinData.quotes.USD
        const { circulating_supply, symbol } = coinData

        return (
          <ThemeContext.Consumer>
            { theme => {
              const color = percent_change_24h !== 0 ? (percent_change_24h > 0 ? theme.success : theme.warning) : theme.text
              return (
                <React.Fragment>
                  <Cell theme={ theme } left>
                    { this.renderIcon(coinData.symbol) }
                    { coinData.name }
                  </Cell>
                  <Cell theme={ theme }>${ market_cap.toLocaleString() }</Cell>
                  <Cell theme={ theme }>${ price.toLocaleString() }</Cell>
                  <Cell theme={ theme }>${ volume_24h.toLocaleString() }</Cell>
                  <Cell theme={ theme }>
                    { circulating_supply.toLocaleString() }
                    &nbsp; { symbol }
                  </Cell>
                  <Cell
                    theme={ theme }
                    color={ color } >
                    { percent_change_24h }%
                  </Cell>
                  <Cell theme={ theme }>
                    <ResponsiveContainer height="100%" width="100%">
                      <AreaChart data={ data } >
                        <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Cell>
                  { this.renderGap() }
                </React.Fragment>
              )
            }}
          </ThemeContext.Consumer>
        )
      })
    )
  }

  renderGap() {
    return(
      <React.Fragment>
        <GapCell />
        <GapCell />
        <GapCell />
        <GapCell />
        <GapCell />
        <GapCell />
        <GapCell />
      </React.Fragment>
    )
  }

  renderIcons() {
    if (this.state.images) {

      return (
        <div>
          {this.state.images.map( e => <img src={e} /> )}
      </div>
    )
  }
  }

  render() {
    console.log(this.state.images)

    return (
      <Data>
        { this.renderHeader() }
        { this.state.coinsData &&
           this.renderRow(this.state.coinsData)
        }
        { this.renderIcons() }

      </Data>
    )
  }
}

export default Table
