import * as React from 'react';
import styled from 'styled-components';
import { ThemeContext } from './../theme-context';

const Data = styled.div`
  width: 100%;
  border: 2px dotted orange;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 100px repeat(10, 100px [col-start] 25px [col-end]) 100px;
  padding: 20px;
`;

const Cell = styled.div`
  background-color: ${props => props.theme.barColor};
  display: flex;
  align-items: center;
  justify-content: ${ props => props.left ? 'flex-start' : 'flex-end' };
  text-align: ${ props => props.left ? 'left' : 'right' };
  padding: 20px;
  color: ${ props => props.theme.text };
  font-size: 15px;

  &:nth-of-type(7n + 1) {
    margin-left: -5px;
    border-left: 5px solid ${props => props.theme.barColor};
  }

  &:nth-of-type(7n + 7) {
    margin-right: -10px;
    border-right: 10px solid ${props => props.theme.barColor};
  }
`;

const GapCell = styled.div`
  border-left: 2px solid #2f3033;

  &:nth-of-type(7n + 7) {
    border-right: 2px solid #2f3033;
  }
  &:nth-last-of-type(n + 1):nth-last-of-type(-n + 7) {
    border-bottom: 2px solid #2f3033;
  }
`;

const HeaderCell = GapCell.extend`
  border-top: 2px solid #2f3033;
  padding: 16px;
  color: #939393;
  font-size: 14px;
  line-height: 1.43;

  &:not(:first-of-type) {
    text-align: right;
  }
`;

class Table extends React.Component {

  state = {
    coinsData: null,
    coinsList: null,
  }

  componentDidMount() {
    fetch('https://api.coinmarketcap.com/v2/ticker/?limit=10&structure=array').then( resp => {
      resp.json()
        .then( all => {
          console.log(all.data);
          return all.data;
        })
        .then( coinsData => this.setState({coinsData}))
        .catch( err => console.log('Błąd!', err));
    });

    fetch('https://min-api.cryptocompare.com/data/all/coinlist')
      .then( resp => resp.json()
        .then( data => data.Data)
        .then( coinsList => this.setState({ coinsList }))
        .catch( err => console.log('Błąd!', err))
      );

  }

  renderHeader() {
    return (
      <ThemeContext.Consumer>
        { theme => {
          return (
            <React.Fragment>
              <HeaderCell theme={theme}>Name</HeaderCell>
              <HeaderCell>Market Cap</HeaderCell>
              <HeaderCell>Price</HeaderCell>
              <HeaderCell>Volume<br/>(24h)</HeaderCell>
              <HeaderCell>Circulating<br/>Supply</HeaderCell>
              <HeaderCell>Change<br/>(24h)%</HeaderCell>
              <HeaderCell>Price Graph<br/>(7d)</HeaderCell>
            </React.Fragment>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  renderIcon(symbol) {
    const coin = this.state.coinsList ? this.state.coinsList[symbol] : null;
    const coinId = coin ? coin.Id : null;
    // if (coinId) {

    //   fetch(`https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${coinId}`)
    //     .then ( resp => console.log(resp)

    //       // .then ( data => console.log(data))
    //       .catch( err => console.log('Błąd!', err))
    //     );
    // }

    return <p>{coinId}</p>;
    //, { mode: 'no-cors'}
  }

  renderRow(coinsData) {
    return (
      coinsData.map((coinData) => {
        return(
          <ThemeContext.Consumer>
            { theme => {
              return (
                <React.Fragment>
                  <Cell theme={theme} left>
                    { this.renderIcon(coinData.symbol) }
                    { coinData.name }

                  </Cell>
                  <Cell theme={theme}>${ coinData.quotes.USD.market_cap }</Cell>
                  <Cell theme={theme}>${ coinData.quotes.USD.price }</Cell>
                  <Cell theme={theme}>${ coinData.quotes.USD.volume_24h }</Cell>
                  <Cell theme={theme}>{ coinData.circulating_supply }</Cell>
                  <Cell theme={theme}>{ coinData.quotes.USD.percent_change_24h }</Cell>
                  <Cell theme={theme}>graph</Cell>
                  { this.renderGap() }
                </React.Fragment>
              );
            }}
          </ThemeContext.Consumer>
        );
      })
    );
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
    );
  }

  render() {
    return (
      <Data>
        { this.renderHeader() }
        { this.state.coinsData &&
           this.renderRow(this.state.coinsData)
        }
      </Data>
    );
  }
}

export default Table;
