# React Todo App with Filtering and Sorting

## Overview
Create a functional todo application with filtering, sorting, and basic statistics. This project should be completable within 2 hours while still demonstrating important React concepts.

## Requirements

### Core Features
1. **Todo Management**
   - Add new todos with a title and priority level (Low, Medium, High)
   - Mark todos as completed
   - Delete todos

2. **Filtering & Sorting**
   - Filter todos by status (All, Active, Completed)
   - Filter todos by priority level
   - Sort todos by creation date or priority

3. **Statistics Summary**
   - Display count of total/active/completed todos
   - Show the highest priority incomplete todo

### Technical Requirements
1. **State Management**
   - Use React's useState and useEffect hooks
   - Optionally use useReducer for more complex state logic

2. **Component Structure**
   - Create at least 3 separate components:
     - TodoForm (for adding new todos)
     - TodoList (for displaying and managing todos)
     - TodoStats (for showing statistics)

3. **Styling**
   - Basic responsive design (usable on mobile and desktop)
   - Visual indication of priority levels (colors, icons, etc.)

## Data Structure

Use the following data structure for todos:

```javascript
const initialTodos = [
  {
    id: 1,
    title: "Learn React Hooks",
    completed: false,
    priority: "High",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Complete practice project",
    completed: true,
    priority: "Medium",
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  }
];
```

## Implementation Steps

1. **Setup Project** (5 minutes)
   - Create a new React project with Create React App or Vite

2. **Create Components** (45 minutes)
   - Implement the form for adding todos
   - Create the todo list with completion toggle and delete functionality
   - Build the statistics component

3. **Add Filtering & Sorting** (30 minutes)
   - Implement filter controls
   - Add sorting functionality

4. **Styling and Polish** (30 minutes)
   - Style the components
   - Add responsive design
   - Implement visual priority indicators

5. **Testing & Bug Fixes** (10 minutes)
   - Test all functionality
   - Fix any issues

## Bonus Features (If Time Permits)
- Add local storage persistence
- Add edit functionality for existing todos
- Implement keyboard shortcuts
- Add due dates for todos

## Evaluation Criteria
- Functionality of all required features
- Code organization and component structure
- Proper use of React hooks
- UI/UX considerations
- Code readability and best practices
