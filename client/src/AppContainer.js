import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import VerifyEmail from './components/VerifyEmail';
import Layout from './components/Layout';

const AppContainer = ({ history }) => (
  <div className="app-wrapper">
    <Switch location={history.location}>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />
      <Route path="/verify-email" exact component={VerifyEmail} />
      <Route path="/" component={Layout} />
    </Switch>
  </div>
);
export default withRouter(AppContainer);
