# Intake Form Manager

A dynamic form builder application that allows users to create, manage and preview customized intake forms with various question types.

## Key Features

- Create custom intake forms with multiple question types:
  - Single Choice Questions
  - Multiple Choice Questions 
  - Yes/No Questions
  - Long Answer Questions
- Real-time form preview
- Edit existing forms
- Delete forms
- Required field validation
- Responsive design

## Tech Stack

- **Frontend Framework**: React.js
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Vanilla CSS with Flexbox and Grid
- **Development**: Create React App
- **Testing**: Jest and React Testing Library

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

4. Run tests
```bash
npm test
```

## Project Structure

```bash
intake-form-manager/
├── src/
│   ├── components/
│   │   ├── FormBuilder.js
│   │   ├── FormList.js
│   │   ├── FormPreview.js
│   │   └── *.css
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public/
└── package.json

```

## Usage
1. Click "Create New Form" to start building a new form
2. Add questions by clicking "Add Question"
3. Choose question type and configure options
4. Preview form using the "Preview Form" button
5. Save form to add it to your forms list
6. Edit or delete existing forms from the main dashboard