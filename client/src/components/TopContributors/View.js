import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import './topContributors.scss';

const TopContributors = ({ topContributors, actions, isLoading }) => {
  useEffect(() => {
    actions.fetchTopContributors();
  }, []);
  const topContributorsPreview = useMemo(
    () =>
      topContributors.map((user, index) => {
        return (
          <tr key={user.id}>
            <td>#{index + 1}</td>
            <td className="name">
              <Link className="button" to={`/user/${user.id}`}>
                {user.firstName} {user.lastName}
              </Link>
            </td>
            <td>{user.answerCount}</td>
          </tr>
        );
      }),
    [topContributors]
  );
  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <div className="top-contributors-wrapper">
      <table className="top-contributors-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Answers</th>
          </tr>
        </thead>
        <tbody>{topContributorsPreview}</tbody>
      </table>
    </div>
  );
};

export default TopContributors;
