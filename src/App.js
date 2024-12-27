import React, { useState } from 'react';
import FormList from './components/FormList';
import FormBuilder from './components/FormBuilder';
import './App.css';

function App() {
  const [forms, setForms] = useState([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [editingForm, setEditingForm] = useState(null);

  const addForm = (newForm) => {
    setForms([...forms, { ...newForm, id: Date.now() }]);
    setIsBuilding(false);
  };

  const deleteForm = (id) => {
    setForms(forms.filter(form => form.id !== id));
  };

  const editForm = (form) => {
    setEditingForm(form);
    setIsBuilding(true);
  };

  const updateForm = (updatedForm) => {
    setForms(forms.map(form => 
      form.id === updatedForm.id ? updatedForm : form
    ));
    setIsBuilding(false);
    setEditingForm(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Intake Form Manager</h1>
        <button onClick={() => setIsBuilding(true)}>Create New Form</button>
      </header>
      
      {isBuilding ? (
        <FormBuilder 
          onSave={editingForm ? updateForm : addForm}
          onCancel={() => {
            setIsBuilding(false);
            setEditingForm(null);
          }}
          editingForm={editingForm}
        />
      ) : (
        <FormList 
          forms={forms} 
          onDelete={deleteForm}
          onEdit={editForm}
        />
      )}
    </div>
  );
}

export default App;
