import React, { useCallback, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import localHistory from '../../localHistory';
import './resetPassword.scss';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(5, 'Password must be at least 5 characters!')
    .required('Please enter your password'),
  confirmPassword: Yup.string()
    .required('Your passwords do not match!')
    .oneOf([Yup.ref('newPassword')], 'Your passwords do not match!'),
});

const ResetPassword = ({ actions }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) localHistory.push('/');
  }, [localStorage]);
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const handleSubmit = useCallback(
    (values) => {
      const { newPassword, confirmPassword } = values;
      actions.resetPassword(query.get('token'), newPassword, confirmPassword);
    },
    [actions, query]
  );
  return (
    <div className="reset-password-form-container bg-gradient bg-secondary">
      <Formik
        validateOnBlur
        initialValues={{ newPassword: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="reset-password-form border border-primary p-4 bg-white"
          >
            <Form.Group
              required
              onBlur={handleBlur}
              className="mb-3"
              controlId="formBasicNewPassword"
            >
              <Form.Label>New password</Form.Label>
              <Form.Control
                value={values.newPassword}
                onChange={handleChange}
                type="password"
                name="newPassword"
                placeholder="Enter your new password"
                isInvalid={touched.newPassword && !!errors.newPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.newPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              required
              onBlur={handleBlur}
              className="mb-3"
              controlId="formBasicConfirmPassword"
            >
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                value={values.confirmPassword}
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
