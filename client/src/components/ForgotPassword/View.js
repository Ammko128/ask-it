import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import localHistory from "../../localHistory";
import "./forgotPassword.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
});

const ForgotPassword = ({ actions }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) localHistory.push("/");
  }, [localStorage]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = useCallback(
    (values) => {
      const { email } = values;
      actions.forgotPassword(email);
      setIsSubmitted(true);
    },
    [actions]
  );
  return (
    <div className="forgot-password-form-container bg-gradient bg-secondary">
      {!isSubmitted ? (
        <Formik
          validateOnBlur
          initialValues={{ email: "" }}
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
              className="forgot-password-form border border-primary p-4 bg-white"
            >
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
              <div className="mb-3 text-center">
                <Link to="/login">
                  Didn't forgot your password? Sign in now!
                </Link>
              </div>
              <div className="mb-3 text-center">
                <Link to="/register">Don't have an account? Sign up now!</Link>
              </div>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="p-4 border border-primary w-50 text-center">
          <div className="mb-3">
            <strong>
              Your request was submitted. If an account with your email address
              exist, you will receive an email address with instructions on how
              to reset your password.
            </strong>
          </div>
          <Link to="/login">Back to login page.</Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
