import React, { useCallback, useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import localHistory from '../../../localHistory';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(5, 'Password must be at least 5 characters!')
    .required('Please enter your password'),
  confirmPassword: Yup.string()
    .required('Your passwords do not match!')
    .oneOf([Yup.ref('newPassword')], 'Your passwords do not match!'),
});

const ProfileInfo = ({
  user,
  currentUser,
  updateUser,
  updateUserPassword,
  isLoading,
}) => {
  const isOwner = useMemo(
    () => user.id === currentUser.id,
    [user.id, currentUser.id]
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setIsPasswordEditing(false);
  }, []);
  const handlePasswordChange = useCallback(() => {
    setIsEditing(false);
    setIsPasswordEditing(true);
  }, []);
  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);
  const handlePasswordChangeCancel = useCallback(() => {
    setIsPasswordEditing(false);
  }, []);
  const handleSubmit = useCallback(
    (values) => {
      updateUser(values.firstName, values.lastName);
      setIsEditing(false);
    },
    [updateUser]
  );
  const handlePasswordChangeSubmit = useCallback(
    (values) => {
      updateUserPassword(values.newPassword, values.confirmPassword);
      setIsPasswordEditing(false);
    },
    [updateUserPassword]
  );
  const sendMessageHandler = useCallback(() => {
    localHistory.push('/messages', { newConversationReceiver: user });
  }, [user]);
  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      {!isEditing ? (
        <div className="profile-info">
          <div className="attribute">
            <div className="label">First name:</div>
            <strong>{user.firstName}</strong>
          </div>
          <div className="attribute">
            <div className="label">Last name:</div>
            <strong>{user.lastName}</strong>
          </div>
          <div className="attribute">
            <div className="label">Email address:</div>
            <strong>{user.email}</strong>
          </div>
          {isOwner && !isPasswordEditing && (
            <>
              <div>
                <Button onClick={handleEdit} variant="primary" type="button">
                  <strong>Edit</strong>
                </Button>
              </div>
              <div>
                <Button
                  onClick={handlePasswordChange}
                  variant="primary"
                  type="button"
                >
                  <strong>Change password</strong>
                </Button>
              </div>
            </>
          )}
          {!isOwner && !!currentUser?.id && (
            <div>
              <Button
                onClick={sendMessageHandler}
                variant="warning"
                type="button"
              >
                <strong>Send a message</strong>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Formik
          validateOnBlur
          initialValues={{ firstName: user.firstName, lastName: user.lastName }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="user-edit-form border border-primary p-4 bg-white"
            >
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
              <div className="text-center">
                <Button onClick={handleCancel} variant="danger" type="button">
                  <strong>Cancel</strong>
                </Button>
                <Button variant="primary" type="submit">
                  <strong>Submit</strong>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {isPasswordEditing && (
        <Formik
          validateOnBlur
          initialValues={{ newPassword: '', confirmPassword: '' }}
          onSubmit={handlePasswordChangeSubmit}
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
              className="change-password-form border border-primary p-4 bg-white"
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
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="text-center">
                <Button
                  onClick={handlePasswordChangeCancel}
                  variant="danger"
                  type="button"
                >
                  <strong>Cancel</strong>
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ProfileInfo;
