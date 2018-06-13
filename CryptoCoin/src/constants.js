import * as icons from './components/icons/icons.js'

const filters = [
  {
    name: null,
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: 'accent',
  },
  {
    name: 'MARKET CAP',
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: true,
  },
  {
    name: 'TREND VOLUME',
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: true,
  },
  {
    name: 'TRENDING',
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: true,
  },
  {
    name: 'TOOLS',
    options: ['zzz', 'xxx', 'ccc', 'vvv'],
    background: true,
  },
]

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

const graphEmptyData = topTenCoins.map( e => ({ symbol: e, data: null }))

const delays = [.4, .32, .25, .18, .15, .12, .1, .1, .1, .1]

const durations = [.58, .65, .71, .76, .78, .79, .8, .8, .8, .8]

const cellWidths = {
  name: 'calc(0.23 * (100% - 240px))',
  cap: 'calc(0.20 * (100% - 240px))',
  price: '120px',
  volume: 'calc(0.18 * (100% - 240px))',
  supply: 'calc(0.20 * (100% - 240px))',
  change: '120px',
  chart: 'calc(0.22 * (100% - 240px))',
}

export { filters, menuItems, topTenCoins, graphEmptyData, delays, durations, cellWidths }