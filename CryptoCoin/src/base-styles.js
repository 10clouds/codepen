import { injectGlobal } from 'styled-components'
import reset from 'styled-reset'

const baseStyles = () => injectGlobal`
  ${reset}

  body {
    font-family: 'Roboto', sans-serif;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  .container {
    padding: 0 50px;
  }
`

export default baseStyles
