/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import { createStore } from 'redux';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from 'styles';

// import ScrollToTop from 'utils/scrollToTop';
import rootReducer from './redux';
import App from './app';

const trackPageView = (location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
};

const initGa = (history) => {
  ReactGA.initialize('UA-208504722-1');
  trackPageView(history.location);
  history.listen(trackPageView);
};

const history = createBrowserHistory();
initGa(history);

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Router>
      <GlobalStyle />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
