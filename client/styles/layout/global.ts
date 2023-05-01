import {createGlobalStyle} from "styled-components"


export const GlobalStyle = createGlobalStyle`
*,*::before,*::after,h1,h2,h3,h4,h5,h6 {
    margin: 0;
    padding: 0;
  }
  h&,h2,h3,h4,h5,h6 {
    display: inline-block;
  }
  html,body {
    margin: 0;
    padding: 0;
    overflow-x:hidden;
    font-family: "Righteous";
    height:100%;
    background: linear-gradient(179.02deg, #2A0B5C 0%, rgba(27, 27, 27, 0.934375) 25.28%, #1B1B1B 33.73%, #1B1B1B 38.34%, #290C59 95.8%);
  }
`