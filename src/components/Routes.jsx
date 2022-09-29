import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Transactions from '../pages/Transactions';
import Users from '../pages/Users';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import Reviews from '../pages/Reviews';
import Drivers from '../pages/Drivers';
import NotFound from '../pages/NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/customers" exact component={Customers} />
      <Route path="/transactions" exact component={Transactions} />
      <Route path="/analytics" exact component={Analytics} />
      <Route path="/users" exact component={Users} />
      <Route path="/drivers" exact component={Drivers} />
      <Route path="/reviews" exact component={Reviews} />
      <Route path="/settings" exact component={Settings} />
      <Redirect from="*" to="/login" />
    </Switch>
  );
};

export default Routes;
