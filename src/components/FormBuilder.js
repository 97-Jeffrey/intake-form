import React, { useState, useEffect } from 'react';
import FormPreview from './FormPreview';
import './FormBuilder.css';

const QUESTION_TYPES = {
  SINGLE_CHOICE: 'single_choice',
  MULTIPLE_CHOICE: 'multiple_choice',
  YES_NO: 'yes_no',
  LONG_ANSWER: 'long_answer'
};

function FormBuilder({ onSave, onCancel, editingForm }) {
  const [formData, setFormData] = useState({
    title: '',
    fields: []
  });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (editingForm) {
      setFormData(editingForm);
    }
  }, [editingForm]);

  const addField = () => {
    setFormData({
      ...formData,
      fields: [...formData.fields, {
        id: Date.now(),
        type: QUESTION_TYPES.LONG_ANSWER,
        question: '',
        required: false,
        options: [], // for single/multiple choice questions
      }]
    });
  };

  const updateField = (index, updates) => {
    const newFields = [...formData.fields];
    newFields[index] = { ...newFields[index], ...updates };
    setFormData({ ...formData, fields: newFields });
  };

  const addOption = (fieldIndex) => {
    const newFields = [...formData.fields];
    newFields[fieldIndex].options = [
      ...newFields[fieldIndex].options,
      { id: Date.now(), text: '' }
    ];
    setFormData({ ...formData, fields: newFields });
  };

  const updateOption = (fieldIndex, optionIndex, text) => {
    const newFields = [...formData.fields];
    newFields[fieldIndex].options[optionIndex].text = text;
    setFormData({ ...formData, fields: newFields });
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const newFields = [...formData.fields];
    newFields[fieldIndex].options = newFields[fieldIndex].options.filter((_, i) => i !== optionIndex);
    setFormData({ ...formData, fields: newFields });
  };

  const removeField = (index) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((_, i) => i !== index)
    });
  };

  const renderFieldOptions = (field, index) => {
    switch (field.type) {
      case QUESTION_TYPES.SINGLE_CHOICE:
      case QUESTION_TYPES.MULTIPLE_CHOICE:
        return (
          <div className="options-container">
            {field.options.map((option, optionIndex) => (
              <div key={option.id} className="option-item">
                <input
                  type="text"
                  placeholder="Option text"
                  value={option.text}
                  onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => removeOption(index, optionIndex)}
                  className="remove-option"
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addOption(index)}
              className="add-option"
            >
              Add Option
            </button>
          </div>
        );
      case QUESTION_TYPES.YES_NO:
        return (
          <div className="yes-no-preview">
            <div>Preview:</div>
            <label><input type="radio" disabled /> Yes</label>
            <label><input type="radio" disabled /> No</label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-builder">
      <div className="builder-header">
        <h2>{editingForm ? 'Edit Form' : 'Create New Form'}</h2>
        <button 
          className={`preview-toggle ${showPreview ? 'active' : ''}`}
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? 'Back to Editor' : 'Preview Form'}
        </button>
      </div>


      {showPreview ? (
        <FormPreview formData={formData} />
      ) : (
        <>
            <input
                type="text"
                placeholder="Form Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="title-input"
            />

            <div className="fields-container">
                {formData.fields.map((field, index) => (
                <div key={field.id} className="field-item">
                    <div className="field-header">
                    <select
                        value={field.type}
                        onChange={(e) => updateField(index, { 
                        type: e.target.value,
                        options: e.target.value.includes('choice') ? [] : undefined
                        })}
                    >
                        <option value={QUESTION_TYPES.LONG_ANSWER}>Long Answer</option>
                        <option value={QUESTION_TYPES.SINGLE_CHOICE}>Single Choice</option>
                        <option value={QUESTION_TYPES.MULTIPLE_CHOICE}>Multiple Choice</option>
                        <option value={QUESTION_TYPES.YES_NO}>Yes/No</option>
                    </select>
                    <button onClick={() => removeField(index)} className="remove-field">Remove</button>
                    </div>
                    
                    <input
                    type="text"
                    placeholder="Question Text"
                    value={field.question}
                    onChange={(e) => updateField(index, { question: e.target.value })}
                    className="question-input"
                    />
                    
                    <label className="required-checkbox">
                    <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(index, { required: e.target.checked })}
                    />
                    Required
                    </label>

                    {renderFieldOptions(field, index)}
                </div>
                ))}
            </div>

            <div className="form-actions">
                <button onClick={addField}>Add Question</button>
                <button onClick={() => onSave(formData)}>Save Form</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </>
        
      )}

      
    </div>
  );
}

export default FormBuilder;
