import React, { useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import localHistory from '../../localHistory';
import './login.scss';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters!')
    .required('Please enter your password'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter your email address'),
});

const Login = ({ actions, location }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) localHistory.push('/');
  }, [localStorage]);
  const handleSubmit = useCallback(
    (values) => {
      const { email, password } = values;
      actions.login(email, password);
    },
    [actions]
  );
  const loginMessage = useMemo(() => {
    return (
      (location.state?.registered &&
        "You signed up successfully. You'll have to verify your email.") ||
      (location.state?.logout &&
        "You logged out successfully. Don't forget to visit us again to get all of your answers.") ||
      (location.state?.retry &&
        "Your token is invalid or you tried to visit a page you don't have access to. Please log in again into your account.") ||
      (location.state?.resetPassword &&
        'Password reset succesfully. Please log in with your new credentials so you can continue enjoying Ask.it.') ||
      null
    );
  }, [location]);
  return (
    <div className="login-form-container bg-gradient bg-secondary">
      <Formik
        validateOnBlur
        initialValues={{ email: '', password: '' }}
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
            className="login-form border border-primary p-4 bg-white"
          >
            {loginMessage && (
              <div className="mb-3 text-center">
                <strong>{loginMessage}</strong>
              </div>
            )}
            <Form.Group
              required
              onBlur={handleBlur}
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={values.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Enter your email address"
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              required
              onBlur={handleBlur}
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={values.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter your password"
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="mb-3 text-center">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>
            <div className="mb-3 text-center">
              <Link to="/register">
                Don't have an account? Sign up instead?
              </Link>
            </div>
            <div className="mb-3 text-center">
              <Link to="/">
                <Button variant="warning" type="button">
                  <strong>Continue as a guest</strong>
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <Button variant="primary" type="submit">
                <strong>Sign in</strong>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
