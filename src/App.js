import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import store from './features/store';

// import { Routes as Rts, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import { Provider } from 'react-redux';

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <ToastContainer />
        <Layout />
      </Provider>
    </Fragment>
  );
}
export default App;
