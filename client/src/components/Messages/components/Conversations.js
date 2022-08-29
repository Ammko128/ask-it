import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

const truncate = (input, maxLength) =>
  input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;

const Conversations = ({ conversations, newConversationReceiver }) => {
  const currentUserId = localStorage.getItem('id');
  const conversationsPreview = useMemo(() => {
    return Object.keys(conversations).length
      ? Object.values(conversations).map((conversation) => (
          <NavLink
            key={conversation.id}
            className={`conversation ${
              conversation?.messages?.[0]?.isRead === false &&
              conversation?.messages?.[0]?.receiverId ===
                parseInt(currentUserId)
                ? 'new-messages'
                : ''
            }`}
            to={`/messages/${conversation.id}`}
          >
            <div className="title">
              {conversation.userId2 === parseInt(currentUserId)
                ? `${conversation.user1?.firstName} ${conversation.user1?.lastName}`
                : `${conversation.user2?.firstName} ${conversation.user2?.lastName}`}
            </div>
            <div className="last-message">
              {truncate(conversation?.messages?.[0]?.message, 20)}
            </div>
          </NavLink>
        ))
      : null;
  }, [conversations, currentUserId]);
  return (
    <div className="conversations-inner">
      {!!newConversationReceiver?.id && (
        <div className="conversation">
          <div className="title">
            {`${newConversationReceiver.firstName}
            ${newConversationReceiver.lastName}`}
          </div>
          <div className="last-message">New conversation</div>
        </div>
      )}
      {conversationsPreview}
    </div>
  );
};

export default Conversations;
