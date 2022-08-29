import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink } from 'react-router-dom';

const Chat = ({
  conversation,
  fetchMoreMessages,
  sendMessage,
  newConversationReceiver,
  isLoading,
  readMessages,
}) => {
  const messagesEnd = useRef();
  useEffect(() => scrollToBottom(), [conversation?.messages?.[0]]);
  useEffect(() => {
    if (!conversation?.id) return;
    readMessages(conversation.id);
  }, [conversation?.id, readMessages]);
  const [newMessage, setNewMessage] = useState('');
  const updateNewMessage = useCallback(
    ({ target: { value } }) => setNewMessage(value),
    []
  );
  const currentUserId = localStorage.getItem('id');
  const fetchMore = useCallback(() => {
    if (!conversation.id) return;
    fetchMoreMessages(conversation.id, conversation?.messages?.length);
  }, [conversation.id, conversation?.messages?.length, fetchMoreMessages]);
  const send = useCallback(
    (e) => {
      e.preventDefault();
      if (!conversation.id) {
        sendMessage(newConversationReceiver?.id, newMessage, true);
        return setNewMessage('');
      }
      sendMessage(
        conversation.userId1 === parseInt(currentUserId || '-1')
          ? conversation.userId2
          : conversation.userId1,
        newMessage
      );
      setNewMessage('');
    },
    [
      currentUserId,
      sendMessage,
      conversation,
      newMessage,
      newConversationReceiver?.id,
    ]
  );
  const messagesPreview = useMemo(() => {
    const messages = conversation.messages ? [...conversation.messages] : [];
    messages.reverse();
    return (
      messages.map((message, index) => {
        const lastMessageSenderId =
          index === 0 ? undefined : messages[index - 1].senderId;
        return (
          <div
            key={message.id}
            className={`${
              message.receiverId === parseInt(currentUserId || '-1')
                ? 'receiver'
                : 'sender'
            } message`}
          >
            {message.senderId !== lastMessageSenderId && (
              <NavLink to={`/user/${message.senderId}`} className="sender-name">
                {message.sender?.firstName} {message.sender?.lastName}
              </NavLink>
            )}
            <div className="message-content">{message?.message}</div>
          </div>
        );
      }) || null
    );
  }, [conversation.messages, currentUserId]);
  const handleScroll = useCallback(
    ({ target: { scrollTop } }) => {
      if (scrollTop === 0) fetchMore();
    },
    [fetchMore]
  );
  const scrollToBottom = useCallback(() => {
    if (!messagesEnd?.current) return;
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messagesEnd]);
  return conversation?.id || conversation?.receiverId ? (
    <>
      <div className="chat-inner">
        <div onScroll={handleScroll}>
          {isLoading && (
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {messagesPreview}
          <div ref={messagesEnd} />
        </div>
      </div>
      <form onSubmit={send} className="new-message-wrapper">
        <input
          type="text"
          className="new-message"
          value={newMessage}
          onChange={updateNewMessage}
        />
        <Button variant="primary" type="submit" className="new-message-submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </Button>
      </form>
    </>
  ) : null;
};

export default Chat;
