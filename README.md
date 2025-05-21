# React Todo App

## Live Demo

[View the app on GitHub Pages](https://ctharings.github.io/React-Assignment/)

A modern, feature-rich Todo application built with React and Vite. This application demonstrates best practices in React development, including component composition, state management, and testing.

## Features

- ✨ Add, complete, and delete todos
- 🎯 Priority levels (Low, Medium, High)
- 🔍 Filter todos by status and priority
- 📊 Sort todos by date or priority
- 📱 Responsive design
- 📈 Real-time statistics
- 🧪 Comprehensive test suite
- 💾 Local storage persistence
- ♿ Accessibility features
- ⌨️ Keyboard navigation
- 🚨 Error boundary handling
- ⏳ Loading states
- 📝 Empty state handling

## Tech Stack

- React 19
- Vite
- SCSS
- Vitest
- Testing Library
- ESLint

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
src/
├── components/
│   ├── TodoForm.jsx      # Form for adding new todos
│   ├── TodoList.jsx      # List of todos with actions
│   ├── TodoStats.jsx     # Statistics display
│   ├── ErrorBoundary.jsx # Error handling component
│   ├── LoadingSpinner.jsx # Loading state component
│   └── EmptyState.jsx    # Empty state component
├── hooks/
│   └── useLocalStorage.js # Custom hook for persistence
├── test/
│   └── setup.js          # Test configuration
├── App.jsx              # Main application component
├── App.scss             # Global styles
└── main.jsx            # Application entry point
```

## Testing

The project uses Vitest and Testing Library for comprehensive testing. Tests are organized by component and cover:

- Component rendering
- User interactions
- State management
- Edge cases
- Error handling
- Loading states
- Empty states

Run tests with:
```bash
npm test
```

### Test Coverage

The project maintains high test coverage:

```
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |   93.87 |    92.85 |   88.88 |   93.87 |
src             |    86.9 |       90 |   77.77 |    86.9 |
 App.jsx        |   97.33 |    94.73 |    87.5 |   97.33 | 32-33
 main.jsx       |       0 |        0 |       0 |       0 | 1-10
src/components  |    99.1 |    95.45 |     100 |    99.1 |
 TodoForm.jsx   |     100 |      100 |     100 |     100 |
 TodoList.jsx   |   97.43 |     90.9 |     100 |   97.43 | 11
 TodoStats.jsx  |     100 |      100 |     100 |     100 |
----------------|---------|----------|---------|---------|-------------------
```

To generate a coverage report, run:

```bash
npm run test:coverage
```

The report will be available in the terminal and as an HTML file in the `coverage/` directory.

## Features in Detail

### Error Handling
- Global error boundary catches and displays runtime errors
- Graceful fallback UI with refresh option
- Error logging for debugging

### Loading States
- Animated loading spinner
- Accessible loading indicators
- Screen reader support

### Empty States
- Clear messaging for no todos
- Call-to-action for adding first todo
- Consistent styling with main UI

### Local Storage
- Automatic persistence of todos
- Seamless state restoration
- Error handling for storage issues

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

## Styling

The application uses SCSS for styling with:
- CSS variables for theming
- Mixins for reusable styles
- Nested rules for better organization
- Responsive design patterns
- Animations for better UX

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
