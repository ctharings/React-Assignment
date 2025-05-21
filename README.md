# React Todo App with Filtering and Sorting

## Live Demo

<a href="https://ctharings.github.io/React-Assignment/" target="_blank" rel="noopener noreferrer">View the app on GitHub Pages</a>

A feature-rich todo application built with React that includes filtering, sorting, and basic statistics. The app is designed to be responsive and user-friendly, with a focus on accessibility and keyboard navigation.

## Features
- Add new todos with title and priority level (Low, Medium, High)
- Mark todos as completed
- Delete todos
- Filter todos by status (All, Active, Completed)
- Filter todos by priority level
- Sort todos by creation date or priority
- Display statistics (total/active/completed todos, highest priority incomplete todo)
- **Local Storage Persistence**: Todos are automatically saved to local storage and restored on page reload
- **Edit Functionality**: Edit existing todos (title, priority, due date)
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + N`: Focus on new todo input
  - `Ctrl/Cmd + F`: Focus on filter
  - `Esc`: Cancel editing
- **Due Dates**: Add due dates to todos with visual indication for overdue items

## Getting Started

### Prerequisites
- Node.js (v16 or higher)

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd react-todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

### Adding a Todo
1. Type your todo title in the input field
2. Select a priority level (Low, Medium, High)
3. Optionally set a due date
4. Click "Add Todo" or press Enter

### Editing a Todo
1. Click the "Edit" button on any todo
2. Modify the title, priority, or due date
3. Click "Update Todo" to save changes
4. Press `Esc` to cancel editing

### Filtering and Sorting
- Use the status filter to show All, Active, or Completed todos
- Use the priority filter to show todos by priority level
- Sort todos by creation date or priority using the sort dropdown

### Keyboard Navigation
- Use `Ctrl/Cmd + N` to quickly add a new todo
- Use `Ctrl/Cmd + F` to focus on the filter controls
- Press `Esc` to cancel editing
- Use Tab to navigate between interactive elements
- Press Enter or Space to toggle todo completion

## Development

### Project Structure
```
src/
  ├── components/
  │   ├── TodoForm.jsx
  │   ├── TodoList.jsx
  │   ├── TodoStats.jsx
  │   ├── ErrorBoundary.jsx
  │   ├── LoadingSpinner.jsx
  │   └── EmptyState.jsx
  ├── hooks/
  │   └── useLocalStorage.js
  ├── App.jsx
  └── App.scss
```

### Testing
Run the test suite:
```bash
npm test
```

### Building for Production
```bash
npm run build
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original assignment requirements can be found in [ASSIGNMENT.md](./ASSIGNMENT.md)
- Built with [Vite](https://vitejs.dev/)
- Testing powered by [Vitest](https://vitest.dev/)
