import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProfileInfo from './components/ProfileInfo';
import MyQuestions from './components/MyQuestions';
import './profile.scss';

const Profile = ({ currentUser, user, actions, questionsCount, isLoading }) => {
  const { id } = useParams();
  useEffect(() => {
    actions.fetchUser(id);
    actions.setUserQuestions([], 0, true);
    actions.setUserQuestionsCount(0);
    actions.fetchUserQuestions(id, 0);
  }, [id]);
  const handleQuestionUpvote = useCallback(
    (questionId, deleteUpvote) => () =>
      actions.upvoteQuestion(actions.setQuestion, questionId, deleteUpvote),
    [actions]
  );
  const handleQuestionDownvote = useCallback(
    (questionId, deleteDownvote) => () =>
      actions.downvoteQuestion(actions.setQuestion, questionId, deleteDownvote),
    [actions]
  );
  const handleAnswerDownvote = useCallback(
    (answerId, deleteDownvote) => () =>
      actions.downvoteAnswer(actions.setAnswer, answerId, deleteDownvote),
    [actions]
  );
  const handleAnswerUpvote = useCallback(
    (answerId, deleteUpvote) => () =>
      actions.upvoteAnswer(actions.setAnswer, answerId, deleteUpvote),
    [actions]
  );
  const handleNewAnswer = useCallback(
    (questionId, content) =>
      actions.submitAnswer(actions.setAnswer, questionId, content),
    [actions]
  );
  const handleAnswerUpdate = useCallback(
    (questionId, answerId, content) =>
      actions.updateAnswer(actions.setAnswer, questionId, answerId, content),
    [actions]
  );
  const handleQuestionUpdate = useCallback(
    (questionId, content) =>
      actions.updateQuestion(actions.setQuestion, questionId, content),
    [actions]
  );
  const handleQuestionDelete = useCallback(
    (questionId) => () =>
      actions.deleteQuestion(actions.removeQuestion, questionId),
    [actions]
  );
  const handleAnswerDelete = useCallback(
    (questionId, answerId) => () =>
      actions.deleteAnswer(actions.removeAnswer, questionId, answerId),
    [actions]
  );
  return (
    <div className="profile-wrapper">
      <Tabs
        unmountOnExit
        defaultActiveKey="profileInfo"
        id="profile-tabs"
        className="mb-3"
      >
        <Tab unmountOnExit eventKey="profileInfo" title="Profile info">
          <ProfileInfo
            user={user}
            currentUser={currentUser}
            isLoading={isLoading}
            updateUser={actions.updateUser}
            updateUserPassword={actions.updateUserPassword}
          />
        </Tab>
        <Tab unmountOnExit eventKey="myQuestions" title="My questions">
          <MyQuestions
            isLoading={isLoading}
            user={user}
            currentUser={currentUser}
            fetchMore={actions.fetchUserQuestions}
            questionsCount={questionsCount}
            handleQuestionUpvote={handleQuestionUpvote}
            handleQuestionDownvote={handleQuestionDownvote}
            handleNewAnswer={handleNewAnswer}
            handleQuestionUpdate={handleQuestionUpdate}
            handleQuestionDelete={handleQuestionDelete}
            handleAnswerUpdate={handleAnswerUpdate}
            handleAnswerUpvote={handleAnswerUpvote}
            handleAnswerDownvote={handleAnswerDownvote}
            handleAnswerDelete={handleAnswerDelete}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
