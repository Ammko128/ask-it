import React, { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './customEditor.scss';
import { quillFormats, quillModules } from '../../constants';

const CustomEditor = ({
  submitButtonText,
  cancelButtonText,
  initialContent,
  onSubmit,
  onCancel,
}) => {
  const [value, setValue] = useState('');
  const handleSubmit = useCallback(() => {
    onSubmit(value);
    setValue('');
  }, [value, onSubmit]);
  const handleCancel = useCallback(() => {
    if (!onCancel) {
      setValue('');
      return;
    }
    onCancel();
  }, [onCancel]);
  useEffect(() => {
    if (!initialContent) return;
    setValue(initialContent);
  }, [initialContent]);
  return (
    <div className="editor-wrapper">
      <ReactQuill
        placeholder="Click here to start typing"
        theme="snow"
        modules={quillModules}
        formats={quillFormats}
        value={value}
        onChange={setValue}
      />
      <div className="editor-buttons-wrapper">
        <Button
          variant="danger"
          type="button"
          className="editor-cancel"
          onClick={handleCancel}
        >
          {cancelButtonText || 'Reset'}
        </Button>
        <Button
          variant="primary"
          type="button"
          className="editor-submit"
          onClick={handleSubmit}
          disabled={!value}
        >
          {submitButtonText || 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default CustomEditor;
