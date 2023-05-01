import {createGlobalStyle} from "styled-components"


export const GlobalStyle = createGlobalStyle`
*,*::before,*::after,h1,h2,h3,h4,h5,h6 {
    margin: 0;
    padding: 0;
  }
  h&,h2,h3,h4,h5,h6 {
    display: inline-block;
  }
  body {
    margin: 0;
    padding: 0;
    overflow-x:hidden;
    font-family: "Poppins", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
`