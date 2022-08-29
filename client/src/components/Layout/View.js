import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from '../Home';
import Question from '../Question';
import Profile from '../Profile';
import Messages from '../Messages';
import './layout.scss';

const Layout = ({ history, notifications, actions, messages }) => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      actions.fetchCurrentUser();
      actions.fetchNotifications();
      actions.fetchMessagesCount();
    }
  }, [actions, localStorage.getItem('token')]);
  return (
    <div className="app-layout">
      <Sidebar
        notifications={notifications}
        readNotifications={actions.readNotifications}
        logout={actions.logout}
        fetchNotifications={actions.fetchNotifications}
        messages={messages}
      />
      <div className="content">
        <Switch location={history.location}>
          <Route path="/question/:id" exact component={Question} />
          <Route path="/user/:id" exact component={Profile} />
          <Route path="/messages/:id?" component={Messages} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </div>
  );
};

export default Layout;
