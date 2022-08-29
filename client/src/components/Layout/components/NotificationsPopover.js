import React, { forwardRef, useMemo } from 'react';
import Popover from 'react-bootstrap/Popover';
import { NavLink } from 'react-router-dom';
import { toastMessages } from '../../../constants';

const NotificationsPopover = forwardRef(
  ({ notifications, closePopover, ...props }, ref) => {
    const notificationsPreview = useMemo(
      () =>
        notifications.map((notification) => {
          return (
            <React.Fragment key={notification.id}>
              <div className="created-at">
                {new Date(notification.createdAt).toDateString()}
              </div>
              <NavLink
                onClick={closePopover}
                to={`/question/${notification.questionId}`}
              >
                {toastMessages[notification.type]}
              </NavLink>
            </React.Fragment>
          );
        }),
      [notifications, closePopover]
    );
    return (
      <Popover placement="right" ref={ref} {...props}>
        <div className="notifications-wrapper">
          {notificationsPreview.length
            ? notificationsPreview
            : 'There are no new notifications.'}
        </div>
      </Popover>
    );
  }
);

export default NotificationsPopover;
