import React, { useEffect, useState } from 'react';

import './layout.css';

import Sidebar from '../sidebar/Sidebar';
import TopNav from '../topnav/TopNav';
import Routes from '../Routes';

import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

// import ThemeAction from '../../redux/actions/ThemeAction';
import Signin from '../../pages/Signin';
import NotFound from '../../pages/NotFound';
import TailBar from '../sidebar/TailBar';

const Layout = () => {
  // const themeReducer = useSelector((state) => state.ThemeReducer);

  const history = useHistory();

  // useEffect(() => {
  //   const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');

  //   const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');

  //   dispatch(ThemeAction.setMode(themeClass));

  //   dispatch(ThemeAction.setColor(colorClass));
  // }, [dispatch]);

  const { userInfo, userToken, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userToken) {
      history.push('/login');
    }
  }, [loading, userInfo, userToken, history]);

  const [show, setShow] = useState(false);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) => (
            <div>
              <Signin />
            </div>
          )}
        />
        <Route
          exact
          render={(props) => (
            <div className={`w-full layout bg-gray-500 theme-mode-light`}>
              {/* <TailBar /> */}
              <Sidebar
                show={show}
                onShow={() => setShow(true)}
                onClose={() => setShow(false)}
                {...props}
              />
              <div className="layout__content">
                <TopNav
                  show={show}
                  onShow={() => setShow(true)}
                  onClose={() => setShow(false)}
                />
                <div className="layout__content-main">
                  <Routes />
                </div>
              </div>
            </div>
          )}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Layout;
