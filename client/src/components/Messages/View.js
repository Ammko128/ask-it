import React, { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Chat from './components/Chat';
import Conversations from './components/Conversations';
import './messages.scss';

const Messages = ({ conversations, actions, isLoading }) => {
  useEffect(() => {
    actions.fetchConversations();
  }, []);
  const { state: locationState } = useLocation();
  const newConversationReceiver = useMemo(
    () => locationState?.newConversationReceiver || null,
    [locationState]
  );
  const { id } = useParams();
  const activeConversation = useMemo(() => {
    if (!id && !!newConversationReceiver?.id)
      return {
        receiver: newConversationReceiver,
        receiverId: newConversationReceiver.id,
      };
    if (!Object.keys(conversations).length) return {};
    return id
      ? conversations[`normal-${id}`]
      : conversations[Object.keys(conversations)[0]];
  }, [conversations, newConversationReceiver, id]);
  return (
    <div className="messages">
      <div className="conversations">
        <Conversations
          conversations={conversations}
          newConversationReceiver={newConversationReceiver || {}}
        />
      </div>
      <div className="chat">
        <Chat
          conversation={activeConversation}
          sendMessage={actions.sendMessage}
          fetchMoreMessages={actions.fetchMoreMessages}
          newConversationReceiver={newConversationReceiver || {}}
          isLoading={isLoading}
          readMessages={actions.readMessages}
        />
      </div>
    </div>
  );
};

export default Messages;
