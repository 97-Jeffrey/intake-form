import React from 'react';
import './FormList.css';

function FormList({ forms, onDelete, onEdit }) {
  return (
    <div className="form-list">
      {forms.length === 0 ? (
        <p className="no-forms">No forms created yet</p>
      ) : (
        forms.map(form => (
          <div key={form.id} className="form-card">
            <h3>{form.title}</h3>
            <p>{form.fields.length} fields</p>
            <div className="form-actions">
              <button onClick={() => onEdit(form)}>Edit</button>
              <button onClick={() => onDelete(form.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FormList;
