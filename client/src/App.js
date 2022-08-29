import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './localHistory';
import AppContainer from './AppContainer';
import Toaster from './components/Toaster';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Toaster />
      <AppContainer />
    </Router>
  </Provider>
);

export default App;
