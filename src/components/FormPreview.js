import React, { useState } from 'react';
import './FormPreview.css';

function FormPreview({ formData }) {
  const [responses, setResponses] = useState({});

  const handleInputChange = (fieldId, value) => {
    setResponses({
      ...responses,
      [fieldId]: value
    });
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'single_choice':
        return (
          <div className="preview-field-input">
            {field.options.map(option => (
              <label key={option.id} className="radio-label">
                <input
                  type="radio"
                  name={`field-${field.id}`}
                  value={option.text}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  checked={responses[field.id] === option.text}
                />
                {option.text}
              </label>
            ))}
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="preview-field-input">
            {field.options.map(option => (
              <label key={option.id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={option.text}
                  onChange={(e) => {
                    const currentValues = responses[field.id] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.text]
                      : currentValues.filter(val => val !== option.text);
                    handleInputChange(field.id, newValues);
                  }}
                  checked={(responses[field.id] || []).includes(option.text)}
                />
                {option.text}
              </label>
            ))}
          </div>
        );

      case 'yes_no':
        return (
          <div className="preview-field-input">
            <label className="radio-label">
              <input
                type="radio"
                name={`field-${field.id}`}
                value="yes"
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                checked={responses[field.id] === 'yes'}
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name={`field-${field.id}`}
                value="no"
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                checked={responses[field.id] === 'no'}
              />
              No
            </label>
          </div>
        );

      case 'long_answer':
        return (
          <textarea
            className="preview-textarea"
            value={responses[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder="Enter your answer here..."
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-preview">
      <h3 className="preview-title">{formData.title}</h3>
      <div className="preview-fields">
        {formData.fields.map(field => (
          <div key={field.id} className="preview-field">
            <label className="preview-question">
              {field.question}
              {field.required && <span className="required-mark">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormPreview;
