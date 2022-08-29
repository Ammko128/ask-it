import React, { useCallback, useMemo, useState } from 'react';
import parse from 'html-react-parser';
import Button from 'react-bootstrap/Button';
import CustomEditor from '../../CustomEditor';
import { Link } from 'react-router-dom';

const AnswerPreview = ({
  answer,
  handleUpvote,
  handleDownvote,
  handleUpdate,
  handleDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const isOwner = useMemo(
    () => answer.userId === parseInt(localStorage.getItem('id')),
    [answer.userId]
  );
  const handleEdit = useCallback(() => setIsEditing((prev) => !prev), []);
  const submitEdit = useCallback(
    (content) => {
      handleUpdate(content);
      handleEdit();
    },
    [handleUpdate, handleEdit]
  );
  const onUpvote = useCallback(
    (...values) => {
      if (!localStorage.getItem('id')) return () => undefined;
      return handleUpvote(...values);
    },
    [handleUpvote]
  );
  const onDownvote = useCallback(
    (...values) => {
      if (!localStorage.getItem('id')) return () => undefined;
      return handleDownvote(...values);
    },
    [handleDownvote]
  );
  return (
    <div className="answer-preview ql-editor">
      <div className="answer">
        {!isEditing ? (
          parse(answer.content || '')
        ) : (
          <CustomEditor
            submitButtonText="Submit"
            onSubmit={submitEdit}
            initialContent={answer.content}
            onCancel={handleEdit}
            cancelButtonText={'Cancel'}
          />
        )}
      </div>
      <div className="ratings">
        <div
          className={`upvotes-wrapper ${
            answer.currentUserUpvoted ? 'active' : ''
          } ${!localStorage.getItem('id') ? 'disabled' : ''}`}
          onClick={onUpvote(answer.id, answer.currentUserUpvoted)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={answer.currentUserUpvoted ? '#77c' : 'currentColor'}
            viewBox="0 0 16 16"
          >
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
          </svg>
          {answer.answerUpvotes.length}
        </div>
        <div
          className={`downvotes-wrapper ${
            answer.currentUserDownvoted ? 'active' : ''
          } ${!localStorage.getItem('id') ? 'disabled' : ''}`}
          onClick={onDownvote(answer.id, answer.currentUserDownvoted)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={answer.currentUserDownvoted ? '#77c' : 'currentColor'}
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
          {answer.answerDownvotes.length}
        </div>
      </div>
      <div className="author">
        by{' '}
        <Link to={`/user/${answer.userId}`}>
          {isOwner ? 'you' : `${answer.user.firstName} ${answer.user.lastName}`}
        </Link>
        <div>
          {answer.edited &&
            ` (Edited on ${new Date(answer.updatedAt).toDateString()})`}
        </div>
      </div>
      {isOwner && !isEditing && (
        <div className="action-buttons">
          <Button
            className="edit-button"
            variant="primary"
            type="button"
            onClick={handleEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </Button>
          <Button
            className="delete-button"
            variant="danger"
            type="button"
            onClick={handleDelete(answer.questionId, answer.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnswerPreview;
