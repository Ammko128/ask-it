import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import localHistory from "../../localHistory";
import "./register.scss";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters!")
    .required("Please enter your password"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  confirmPassword: Yup.string()
    .required("Your passwords do not match!")
    .oneOf([Yup.ref("password")], "Your passwords do not match!"),
});

const Register = ({ actions }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) localHistory.push("/");
  }, [localStorage]);
  const handleSubmit = useCallback(
    (values) => {
      const { email, password, firstName, lastName } = values;
      actions.register(email, password, firstName, lastName);
    },
    [actions]
  );
  return (
    <div className="register-form-container bg-gradient bg-secondary">
      <Formik
        validateOnBlur
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          confirmPassword: "",
        }}
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
            className="register-form border border-primary p-4 bg-white"
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
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                value={values.firstName}
                onChange={handleChange}
                name="firstName"
                placeholder="Enter your first name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                value={values.lastName}
                onChange={handleChange}
                name="lastName"
                placeholder="Enter your last name"
              />
            </Form.Group>
            <div className="mb-3 text-center">
              <Link to="/login">Already have an account? Sign in instead.</Link>
            </div>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Sign up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
