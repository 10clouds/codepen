import * as icons from './components/icons/icons.js'

const filters = {
  currency: {
    name: 'CURRENCY',
    options: ['USD', 'EUR', 'BTC', 'ETH'],
  },
  marketCap: {
    name: 'MARKET CAP',
    options: ['COINS', 'TOKENS'],
  },
  sort: {
    name: 'SORT',
    options: ['MARKET CAP', 'PRICE', 'VOLUME', 'CIRCULATING SUPPLY', 'CHANGE'],
  },
  // trending: {
  //   name: 'TRENDING',
  //   options: ['GAINERS AND LOOSERS', 'RECENTLY ADDED'],
  // },
  // tools: {
  //   name: 'TOOLS',
  //   options: ['zzz', 'xxx', 'ccc', 'vvv'],
  // },
}

const menuItems = [
  {
    item: 'Prices',
    icon: icons.PricesIcon,
  },
  {
    item: 'Wallet',
    icon: icons.WalletIcon,
  },
  {
    item: 'Portfolio',
    icon: icons.PortfolioIcon,
  },
  {
    item: 'Exchange',
    icon: icons.ExchangeIcon,
  },
  {
    item: 'Settings',
    icon: icons.SettingsIcon,
  },
]

const topTenCoins = ['BTC', 'ETH', 'XRP', 'BCH', 'EOS', 'LTC', 'ADA', 'XLM', 'TRX', 'NEO']

const topTenTokens = [ 'EOS', 'TRON', 'USDT', 'BNB', 'VEN', 'ONT', 'OMG', 'ICX', 'ZIL', 'AE' ]

const currencySymbols = {
  USD: '$',
  EUR: '€',
  BTC: 'Ƀ',
  ETH: 'Ξ'
}

const graphEmptyData = topTenCoins.map( e => ({ symbol: e, data: null }))

const delays = [.4, .32, .25, .18, .15, .12, .1, .1, .1, .1]

const durations = [.58, .65, .71, .76, .78, .79, .8, .8, .8, .8]

const cellWidths = {
  nameWidth: 'calc(0.23 * (100% - 240px))',
  capWidth: 'calc(0.20 * (100% - 240px))',
  priceWidth: '120px',
  volumeWidth: 'calc(0.18 * (100% - 240px))',
  supplyWidth: 'calc(0.20 * (100% - 240px))',
  changeWidth: '120px',
  chartWidth: 'calc(0.22 * (100% - 240px))',
}

const headerData = [
  {
    title: { __html: 'Name' },
    width: cellWidths.nameWidth,
    sortOption: null,
  },
  {
    title: { __html: 'Market Cap' },
    width: cellWidths.capWidth,
    sortOption: 'MARKET CAP',
  },
  {
    title: { __html: 'Price' },
    width: cellWidths.priceWidth,
    sortOption: 'PRICE',
  },
  {
    title: { __html: 'Volume<br/>(24h)' },
    width: cellWidths.volumeWidth,
    sortOption: 'VOLUME',
  },
  {
    title: { __html: 'Circulating<br/>Supply' },
    width: cellWidths.supplyWidth,
    sortOption: 'CIRCULATING SUPPLY',
  },
  {
    title: { __html: 'Change<br/>(24h)%' },
    width: cellWidths.changeWidth,
    sortOption: 'CHANGE',
  },
  {
    title: { __html: 'Price Graph<br/>(14d)' },
    width: cellWidths.nameWidth,
    sortOption: null,
  },
]

export { filters, menuItems, topTenCoins, graphEmptyData, delays, durations, cellWidths, currencySymbols, topTenTokens, headerData }