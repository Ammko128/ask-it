import React, { useCallback } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import NewQuestions from '../NewQuestions';
import HotQuestions from '../HotQuestions';
import TopContributors from '../TopContributors';
import CustomEditor from '../CustomEditor';
import './home.scss';

const Home = ({ actions }) => {
  const submitNewQuestion = useCallback(
    (newQuestionContent) => {
      actions.submitQuestion(newQuestionContent);
    },
    [actions]
  );
  return (
    <div className="home-wrapper">
      <div className="new-question">
        {!!localStorage.getItem('token') ? (
          <>
            <h2>New question:</h2>
            <CustomEditor
              submitButtonText="Submit"
              onSubmit={submitNewQuestion}
            />
          </>
        ) : (
          <h2>
            Please <Link to="/login">sign in</Link> to ask a new question.
          </h2>
        )}
      </div>
      <Tabs
        unmountOnExit
        defaultActiveKey="new"
        id="home-tabs"
        className="mb-3"
      >
        <Tab unmountOnExit eventKey="new" title="New questions">
          <NewQuestions />
        </Tab>
        <Tab unmountOnExit eventKey="hot" title="Hot questions">
          <HotQuestions />
        </Tab>
        <Tab unmountOnExit eventKey="topContributors" title="Top contributors">
          <TopContributors />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Home;
