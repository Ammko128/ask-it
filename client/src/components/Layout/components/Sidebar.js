import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import NotificationsPopover from './NotificationsPopover';
import { routes } from '../../../constants';

const Sidebar = ({
  logout,
  readNotifications,
  notifications,
  fetchNotifications,
  ...props
}) => {
  const handleNotificationsToggle = useCallback(
    (show) => {
      if (show) {
        readNotifications(notifications.map(({ id }) => id));
        return setShowNotifications(true);
      }
      fetchNotifications();
      setShowNotifications(false);
    },
    [notifications, fetchNotifications, readNotifications]
  );
  const closePopover = useCallback(() => setShowNotifications(false), []);
  const [showNotifications, setShowNotifications] = useState(false);
  const routesPreview = (
    !!localStorage.getItem('token')
      ? routes
      : routes.filter(({ auth }) => !auth)
  ).map((route) => (
    <NavLink
      exact={route.exact}
      key={route.name}
      className="nav-link"
      to={`${route.to}${
        route.param ? `/${localStorage.getItem(route.param)}` : ''
      }`}
    >
      {route.icon}
      <div>{route.name}</div>
      {route.showCount && (
        <div
          className={`${route.countProp}-count ${
            props[route.countProp] ? `has-${route.countProp}` : ''
          }`}
        >
          {props[route.countProp] < 100 ? props[route.countProp] : '99+'}
        </div>
      )}
    </NavLink>
  ));
  return (
    <div className="sidebar">
      <div className="navlinks-wrapper">
        {routesPreview}
        {!!localStorage.getItem('token') ? (
          <OverlayTrigger
            trigger="click"
            overlay={
              <NotificationsPopover
                id="popover-contained"
                notifications={notifications}
                closePopover={closePopover}
              />
            }
            rootClose
            show={showNotifications}
            onToggle={handleNotificationsToggle}
            placement="right"
          >
            <button
              className={`notifications-button ${
                showNotifications ? 'open' : ''
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
              </svg>
              Notifications
              <div
                className={`notifications-count ${
                  notifications.length ? 'has-notifications' : ''
                }`}
              >
                {notifications.length < 100 ? notifications.length : '99+'}
              </div>
            </button>
          </OverlayTrigger>
        ) : (
          <>
            <NavLink exact className="nav-link" to="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                />
              </svg>
              <div>Sign in</div>
            </NavLink>
            <NavLink exact className="nav-link" to="/register">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path
                  fillRule="evenodd"
                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                />
              </svg>
              <div>Sign up</div>
            </NavLink>
          </>
        )}
      </div>
      {!!localStorage.getItem('token') && (
        <button onClick={logout} className="logout-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
          <div>Logout</div>
        </button>
      )}
    </div>
  );
};
export default Sidebar;
