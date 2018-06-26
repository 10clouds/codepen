import * as React from 'react'
import styled from 'styled-components'
import NavbarContainer from './NavbarContainer'
import baseStyles from '../base-styles'
import { ThemeContext, themes } from './../theme-context'
import TableContainer from './TableContainer'
import { filters, topTenCoins, topTenTokens } from './../constants'

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
    currency: 'USD',
    rowData: [],
  }

  async componentDidMount() {
    const { marketCapType, currency } = this.state
    const firstColumnData = await this.getFirstColumnData(marketCapType)
    const topTenData = await this.getData(currency, marketCapType)
    const graphEmptyData = marketCapType.map( e => ({ symbol: e, data: null }))
    const chartsData = await this.getChartsData(marketCapType, graphEmptyData, currency)
    const rowDataObj = firstColumnData

    this.createRowDataObj(rowDataObj, topTenData, currency, chartsData)

    this.setState({
      firstColumnData,
      topTenData,
      chartsData,
      rowDataObj
    })
  }

  createRowDataObj(rowDataObj, topTenData, currency, chartsData) {
    rowDataObj.map( obj => {
      const {
        MKTCAP,
        PRICE,
        VOLUME24HOUR,
        SUPPLY,
        CHANGEPCT24HOUR,
        FROMSYMBOL
      } = topTenData[obj.symbol][currency]

      obj.marketCap = MKTCAP
      obj.price = PRICE
      obj.volume = VOLUME24HOUR
      obj.supply = SUPPLY
      obj.change = CHANGEPCT24HOUR
      obj.fromSymbol = FROMSYMBOL
      obj.chartData = chartsData.find( e => e.symbol === obj.symbol ).data
    })
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
      const currency = this.state.currency
      const firstColumnData = await this.getFirstColumnData(marketCapType)
      const topTenData = await this.getData(currency, marketCapType)
      const chartsData = await this.getChartsData(marketCapType, graphEmptyData, currency)

      const rowDataObj = firstColumnData

      this.createRowDataObj(rowDataObj, topTenData, currency, chartsData)

      this.setState({
        [filter]: option,
        firstColumnData,
        topTenData,
        marketCapType,
        chartsData,
        rowDataObj,
      })
    }

    if ( filter === 'currency' ) {
      const marketCapType = this.state.marketCapType
      const topTenData = await this.getData(option, marketCapType)
      const graphEmptyData = marketCapType.map( e => ({ symbol: e, data: null }))
      const chartsData = await this.getChartsData(marketCapType, graphEmptyData, option)

      const rowDataObj = this.state.firstColumnData

      this.createRowDataObj(rowDataObj, topTenData, option, chartsData)

      this.setState({
        [filter]: option,
        topTenData,
        chartsData,
        rowDataObj,
      })
    }

    if ( filter === 'sort' ) {


      //   default:
      //     console.log('Sorry, we are out of ' + expr + '.');
      // }

      // switch (option) {
      //   case 'PRICE': {
      //     const rowDataObj = this.state.rowDataObj.sort( (a, b) => {
      //       return b.price - a.price
      //     })
      //     this.setState({ rowDataObj })
      //     break
      // }


      if ( option === 'PRICE' ) {
        const rowDataObj = this.state.rowDataObj.sort( (a, b) => {
          return b.price - a.price
        })
        this.setState({ rowDataObj })
      } else if ( option === 'MARKET CAP' ) {
        const rowDataObj = this.state.rowDataObj.sort( (a, b) => {
          return b.marketCap - a.marketCap
        })
        this.setState({ rowDataObj })
      } else if ( option === 'VOLUME' ) {
        const rowDataObj = this.state.rowDataObj.sort( (a, b) => {
          return b.volume - a.volume
        })
        this.setState({ rowDataObj })
      } else if ( option === 'CIRCULATING SUPPLY' ) {
        const rowDataObj = this.state.rowDataObj.sort( (a, b) => {
          return b.supply - a.supply
        })
        this.setState({ rowDataObj })
      } else if ( option === 'CHANGE' ) {
        const rowDataObj = this.state.rowDataObj.sort( (a, b) => {
          return b.change - a.change
        })
        this.setState({ rowDataObj })
      }
    }
  }

  getFirstColumnData(marketCapType) {
    return fetch(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${marketCapType}&tsym=USD`)
      .then( resp => resp.json() )
      .then( data => data.Data )
      .then( data => data.map( coin => {
        return (
          {
            symbol: coin.CoinInfo.Name,
            name: coin.CoinInfo.FullName,
            url: coin.CoinInfo.ImageUrl
          }
        )
      }))
      .then( firstColumnData => firstColumnData )
      .catch( err => err )
  }

  getChartsData(marketCapType, graphEmptyData, currency) {
    return Promise.all(marketCapType.map( (symbol, index) => {
      return fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=${currency}&limit=13&aggregate=1`)
        .then( resp => resp.json() )
        .then( data => data.Data )
        .then( data => data.map( (data) => {
          return { price: data.close }
        } ))
        .then( info => {
          graphEmptyData[index].data = info
          return graphEmptyData[index]
        })
        .then( chartData => chartData )
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

    const selectedFilters = Object.keys(filters).reduce( (accumulator, currentValue) => {
      const filter = filters[currentValue]
      return Object.assign({}, accumulator, {
        [currentValue] : this.state[currentValue] ? this.state[currentValue] : filter.options[0]
      })
    }, {} )

    //console.log(this.state.chartsData)


    return (
      <ThemeContext.Provider value={{
        theme,
        handleFilterOptionSelect: this.handleFilterOptionSelect.bind(this),
        selectedFilters,
        firstColumnData: this.state.firstColumnData,
        topTenData: this.state.topTenData,
        chartsData: this.state.chartsData,
        marketCapType: this.state.marketCapType,
        rowDataObj: this.state.rowDataObj
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
