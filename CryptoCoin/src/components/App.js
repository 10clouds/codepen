import * as React from 'react'
import styled from 'styled-components'
import NavbarContainer from './NavbarContainer'
import baseStyles from '../base-styles'
import { ThemeContext, themes } from './../theme-context'
import TableContainer from './TableContainer'
import { filters2, topTenCoins, topTenTokens } from './../constants'

const Wrapper = styled.div`
  align-items: stretch;
  color: ${props => props.theme.text};
  display: flex;
  height: 100%;
  width: 100%;
`

const Circle = styled.div`
  background: ${ props => props.theme.background };
  border-radius: 100%;
  bottom: 0;
  height: 100px;
  left: 0;
  transform: scale(${ props => props.scale });
  transition: transform 2s ease-in;
  width: 100px;
  z-index: ${ props => props.zIndex };
  position: fixed;
`

const Background = styled.div`
  background: ${ props => props.color };
  height: 100%;
  width: 100%;
  z-index: ${ props => props.zIndex };
  position: fixed;
`

class App extends React.Component {

  state = {
    theme: themes.dark,
    scale: 1,
    bgZIndex: '-1',
    circleZIndex: '-2',
    bgTransform: false,
    barTransform: '-100%',
    displayMask: false,
    firstColumnData: [],
    chartsData: null,
    marketCapType: topTenCoins,
    currency: 'USD'
  }

  async componentDidMount() {
    const firstColumnData = await this.getFirstColumnData(this.state.marketCapType)
    const topTenData = await this.getData(this.state.currency, this.state.marketCapType)
    this.setState({
      firstColumnData,
      topTenData
    })

    const graphEmptyData = this.state.marketCapType.map( e => ({ symbol: e, data: null }))

    //TODO: filters
    Promise.all(this.state.marketCapType.map( symbol => {
      fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=${this.state.currency}&limit=13&aggregate=1`)
        .then( resp => resp.json() )
        .then( data => data.Data )
        .then( data => data.map( (data) => {
          return { price: data.close }
        }))
        .then( info => this.setState({ chartsData: graphEmptyData.map( coin => {
          if (coin.symbol === symbol) coin.data = info
          return coin
        }
        ) }))
        .catch( err => err )
    }))
  }

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
      scale: 100,
      bgZIndex: '-2',
      circleZIndex: '-1',
      bgTransform: true,
      barTransform: '0',
      displayMask: true,
    }))

    setTimeout( () => {
      this.setState({
        barTransform: '-100%',
        displayMask: false,
      })
    }, 1100)

    setTimeout(() => {
      this.setState({
        scale: 1,
        bgZIndex: '-1',
        circleZIndex: '-2',
        bgTransform: false,
      })
    }, 2000)
  }


  async handleFilterOptionSelect(filter, option) {
    if ( filter === 'marketCap' ) {
      const marketCapType = option === 'TOKENS' ? topTenTokens : topTenCoins

      const graphEmptyData = marketCapType.map( e => ({ symbol: e, data: null }))
      const currency = this.state.currency ? this.state.currency : 'USD'
      const firstColumnData = await this.getFirstColumnData(marketCapType)
      const topTenData = await this.getData(currency, marketCapType)
      const chartsData = await this.getChartsData(marketCapType, graphEmptyData)

      this.setState({
        [filter]: option,
        firstColumnData,
        topTenData,
        marketCapType,
        chartsData,
      })
    }

    if ( filter === 'currency' ) {
      const marketCapType = this.state.marketCap ? this.state.marketCap : topTenCoins
      const topTenData = await this.getData(option, marketCapType)
      this.setState({
        [filter]: option,
        topTenData
      })

      this.state.marketCapType.map( symbol => {
        fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=13&aggregate=1`)
          .then( resp => resp.json() )
          .then( data => data.Data )
          .then( data => Promise.all(data.map( (data) => {
            return { price: data.close }
          })))
          .then( info => this.setState({ chartsData: this.state.chartsData.map( coin => {
            if (coin.symbol === symbol) coin.data = info
            return coin
          }
          ) }))
          .catch( err => (err))
      })
    }
  }

  getFirstColumnData(marketCapType) {
    return fetch(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${marketCapType}&tsym=USD`)
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
      .then( firstColumnData => firstColumnData )
      .catch( err => err )
  }

  getChartsData(marketCapType, graphEmptyData) {
    return Promise.all(marketCapType.map( (symbol, index) => {
      return fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=13&aggregate=1`)
        .then( resp => resp.json() )
        .then( data => data.Data )
        .then( data => data.map( (data) => {
          return { price: data.close }
        } ))
        .then( info => {
          graphEmptyData[index].data = info
          return graphEmptyData[index]
        })
        .then( x => x )
        .catch( err => err )
    }))
  }

  getData(currency, marketCapType) {
    return fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${marketCapType}&tsyms=${currency}`)
      .then( resp => resp.json() )
      .then( data => Promise.resolve(data.RAW) )
      .then( topTenData => topTenData )
      .catch( err => err)
  }

  render() {
    baseStyles()
    const {
      theme,
      scale,
      bgZIndex,
      circleZIndex,
      bgTransform,
    } = this.state

    const bgColor = !bgTransform ? theme.background : theme.changeThemeBackground

    const selectedFilters = Object.keys(filters2).reduce( (accumulator, currentValue) => {
      const filter = filters2[currentValue]
      return Object.assign({}, accumulator, {
        [currentValue] : this.state[currentValue] ? this.state[currentValue] : filter.options[0]
      })
    }, {} )

    return (
      <ThemeContext.Provider value={{
        theme,
        handleFilterOptionSelect: this.handleFilterOptionSelect.bind(this),
        selectedFilters,
        firstColumnData: this.state.firstColumnData,
        topTenData: this.state.topTenData,
        chartsData: this.state.chartsData,
        marketCapType: this.state.marketCapType
      }}>
        <Wrapper theme={ theme }>
          <Background color={ bgColor } zIndex={ bgZIndex } />
          <NavbarContainer toggleTheme={ this.toggleTheme } />
          <TableContainer barTransform={ this.state.barTransform } displayMask={ this.state.displayMask }/>
          <Circle
            scale={ scale }
            theme={ theme }
            zIndex={ circleZIndex }
          />
        </Wrapper>
      </ThemeContext.Provider>
    )
  }
}

export default App
