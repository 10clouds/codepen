import { injectGlobal } from 'styled-components'
import reset from 'styled-reset';

const baseStyles = () => injectGlobal`
  ${reset}

  body {
    background-color: #1b1d1f;
    color: #939393;
    font-family: 'Roboto', sans-serif;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  .container {
    padding: 0 50px;
  }
`

export default baseStyles
