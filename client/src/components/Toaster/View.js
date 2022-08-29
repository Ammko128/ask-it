import React, { useMemo } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';

const Toaster = ({ toasts, actions }) => {
  const toastsPreview = useMemo(
    () =>
      toasts.map((toast) => {
        const onClose = () => actions.hideToast(toast.id);
        return (
          <Toast key={toast.id} autohide delay={5000} onClose={onClose} show>
            <ToastHeader className="text-danger d-flex justify-content-between">
              <strong>{toast.title}</strong>
            </ToastHeader>
            <ToastBody>{toast.message}</ToastBody>
          </Toast>
        );
      }),
    [toasts, actions]
  );
  return (
    <ToastContainer className="p-3" position="top-end">
      {toastsPreview}
    </ToastContainer>
  );
};

export default Toaster;
