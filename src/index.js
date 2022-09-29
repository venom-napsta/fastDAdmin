import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as Prv } from 'react-redux';

import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/theme.css';
import './assets/css/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import App from './App';

// To be migrated to the context api
import { createStore } from 'redux';
import rootReducer from './redux/reducers';

// logger
import LogRocket from 'logrocket';
import { BrowserRouter } from 'react-router-dom';
import logger from './services/logService';
logger.init();
// logger.log();

const store = createStore(rootReducer);
LogRocket.init('aqhytn/fastd');

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Prv store={store}>
        <App />
      </Prv>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
