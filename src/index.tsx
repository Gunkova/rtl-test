import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import store from './modules/store';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Open Sans:300,400,700', 'sans-serif']
    }
});

const GlobalStyle = createGlobalStyle`
    html, body {
      height: 100%;
      margin: 0;
    }

  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background: #fefefe;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 320px;
  }
  
  a {
    color: inherit;
    text-decoration: underline;
    
    &:hover {
        color: #368a55;
    }
  }
  
  .app {
    min-height: 100%;
    display: grid;
    grid-template-rows: 120px auto 60px;
  }
`;

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <Provider store={store}>
        <App />
    </Provider>
  </React.Fragment>,
  document.body
);

// If you want your app to work offline and load faster, you can changereact-router-dom
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
