# React Todo App

A modern, feature-rich Todo application built with React and Vite. This application demonstrates best practices in React development, including component composition, state management, and testing.

## Features

- ✨ Add, complete, and delete todos
- 🎯 Priority levels (Low, Medium, High)
- 🔍 Filter todos by status and priority
- 📊 Sort todos by date or priority
- 📱 Responsive design
- 📈 Real-time statistics
- 🧪 Comprehensive test suite

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

## Project Structure

```
src/
├── components/
│   ├── TodoForm.jsx      # Form for adding new todos
│   ├── TodoList.jsx      # List of todos with actions
│   └── TodoStats.jsx     # Statistics display
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

Run tests with:
```bash
npm test
```

## Styling

The application uses SCSS for styling with:
- CSS variables for theming
- Mixins for reusable styles
- Nested rules for better organization
- Responsive design patterns

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
