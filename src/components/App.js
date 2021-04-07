import 'normalize.css';
import { createGlobalStyle } from 'styled-components';
import {LocationProvider} from "../context/LocationContext"
import Header from './Header'

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 16px;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  background: #f8f8f8;
}
`


function App() {
  return (
    <LocationProvider>
      <GlobalStyle />
      <Header title={ 'Cities by NASA' }/>
    <LocationProvider/>
  );
}

export default App;
