import React, { useEffect, useMemo } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useLocation } from 'react-router-dom';
import './verifyEmail.scss';

const VerifyEmail = ({ actions, emailVerified }) => {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  useEffect(() => {
    actions.verifyEmail(query.get('token'));
  }, [query]);
  return (
    <>
      {emailVerified === true && (
        <div className="verify-email p-4 border border-primary w-50 text-center">
          <div className="mb-3">
            <strong>You successfully verified your email.</strong>
          </div>
          <Link to="/login">Back to login page.</Link>
        </div>
      )}
      {emailVerified === null && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {emailVerified === false && (
        <div className="verify-email p-4 border border-primary w-50 text-center">
          <div className="mb-3">
            <strong>
              Email verification went wrong. Please click on the link in your
              email.
            </strong>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
