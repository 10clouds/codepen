import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';

const baseStyles = () => injectGlobal`
  ${reset}

  body {
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }

  .container {
    padding: 0 50px;
  }
`;

export default baseStyles;
