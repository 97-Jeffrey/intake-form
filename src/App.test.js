import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders initial empty state correctly', () => {
    render(<App />);
    expect(screen.getByText('Intake Form Manager')).toBeInTheDocument();
    expect(screen.getByText('Create New Form')).toBeInTheDocument();
  });

  test('switches to form builder when create button clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Create New Form'));
    expect(screen.getByText('Create New Form')).toBeInTheDocument();
  });

  test('adds new form and displays in list', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Create New Form'));
    
    // Fill form details
    const testForm = {
      title: 'Test Form',
      fields: [{
        type: 'long_answer',
        question: 'Test Question',
        required: true
      }]
    };
    
    // Simulate form save
    const formBuilder = screen.getByRole('form');
    fireEvent.submit(formBuilder, { testForm });
    
    // Verify form appears in list
    expect(screen.getByText('Test Form')).toBeInTheDocument();
  });

  test('deletes form from list', async () => {
    render(<App />);
    // Add a form first
    fireEvent.click(screen.getByText('Create New Form'));
    const testForm = {
      title: 'Delete Test Form',
      fields: []
    };
    const formBuilder = screen.getByRole('form');
    fireEvent.submit(formBuilder, { testForm });
    
    // Delete the form
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    // Verify form is removed
    expect(screen.queryByText('Delete Test Form')).not.toBeInTheDocument();
  });

  test('edits existing form', () => {
    render(<App />);
    // Add initial form
    fireEvent.click(screen.getByText('Create New Form'));
    const initialForm = {
      title: 'Initial Form',
      fields: []
    };
    const formBuilder = screen.getByRole('form');
    fireEvent.submit(formBuilder, { initialForm });
    
    // Edit the form
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    // Verify edit mode
    expect(screen.getByText('Edit Form')).toBeInTheDocument();
  });

  test('cancels form creation', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Create New Form'));
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    // Verify return to list view
    expect(screen.queryByText('Create New Form')).toBeInTheDocument();
  });
});
