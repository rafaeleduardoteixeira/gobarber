import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body{
        background: #312E38;
        -webkit-font-smoothing: antialiased;
    }

    border-style, input, button {
        font-family: 'Roboto', serif;
        font-size: 13px;    
    }

    h1, h2, h3, h4, h5, h6{
        font-weight: 500;
    }

    button{
        cursor: pointer;
    }
`;

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  bigDesktop: customMediaQuery(2560),
  desktop: customMediaQuery(1920),
  notebook: customMediaQuery(1440),
  smallNotebook: customMediaQuery(1360),
  tablet: customMediaQuery(1024),
  smallTablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
  smallMobile: customMediaQuery(365),
};
