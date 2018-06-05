const x = fetch('https://api.coinmarketcap.com/v2/ticker/?limit=10&structure=array')
  .then( resp => resp.json())
  .then( all => all.data )
  .then( data => data.map( e => e.symbol))
  .then( symbols => Promise.resolve(symbols.map( e => {
    return (
      fetch(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${e}&tsym=USD`)
        .then( resp =>  resp.json() )
        .then( data => data.Data[0].CoinInfo.ImageUrl )
        .then( url => Promise.resolve(`<img src='https://www.cryptocompare.com/${url}' />`) )
        .catch( err => err )
    )
  })))
  .catch( err => err)




export default x