# Campus Connect

A student-centric campus facility issue reporting and tracking system that enables students to report facility problems and administrators to manage and resolve them efficiently.

## Overview

Campus Connect is a modern web application designed to streamline the process of reporting and managing facility issues on campus. Students can easily report issues like maintenance problems, infrastructure concerns, and facility improvements, while administrators can track, prioritize, and resolve these issues effectively.

## Features

- **Student Dashboard**: Browse and manage reported issues
- **Issue Reporting**: Easy-to-use form for reporting facility problems
- **Admin Dashboard**: Comprehensive admin panel for issue management
- **Issue Tracking**: Real-time status updates on reported issues
- **User Authentication**: Secure login and signup for students
- **Issue Details**: View comprehensive information about each reported issue
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui
- **Form Management**: React Hook Form
- **Testing**: Vitest
- **Code Quality**: ESLint

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or bun package manager

## Installation & Setup

### Step 1: Clone the Repository

`sh
git clone <YOUR_GIT_URL>
cd campus-connect-58-main
`

### Step 2: Install Dependencies

Using npm:
`sh
npm install
`

Or using bun:
`sh
bun install
`

### Step 3: Start the Development Server

`sh
npm run dev
`

The application will start on http://localhost:5173 (or the next available port).

## Available Scripts

### Development
`sh
npm run dev
`
Starts the development server with hot module replacement (HMR).

### Build
`sh
npm run build
`
Creates an optimized production build in the dist folder.

### Preview
`sh
npm run preview
`
Serves the production build locally for testing.

### Testing
`sh
npm run test
`
Runs the test suite once.

`sh
npm run test:watch
`
Runs tests in watch mode.

### Linting
`sh
npm run lint
`
Checks code quality and style issues.

## Project Structure

```
campus-connect-58-main/
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn-ui components
│   │   ├── AppHeader.tsx
│   │   ├── BottomNav.tsx
│   │   └── ...
│   ├── pages/          # Application pages
│   │   ├── StudentHome.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── ReportIssuePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── ...
│   ├── context/        # React context for state management
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── data/           # Mock data
│   ├── App.tsx         # Root component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── package.json        # Project dependencies
└── vite.config.ts      # Vite configuration
```

## How to Use

### For Students

1. **Login**: Use your 10-digit student ID and school portal password
2. **Report Issue**: Navigate to "Report Issue" and fill in the details
3. **Track Status**: View your reported issues and their current status on "My Issues"

### Test Accounts

For prototype testing, use these demo student accounts:

| Student ID | Password | Dorm |
|---|---|---|
| `6730123456` | `student123` | Auto-assigned |
| `6510987654` | `student123` | Auto-assigned |

Admin Login:
- Username: `admin`
- Password: `admin123`

### For Administrators

1. **Login**: Access the admin dashboard with admin credentials
2. **View Issues**: See all reported issues on the dashboard
3. **Manage Issues**: Update issue status and add notes
4. **Analytics**: Track issue statistics and resolution rates

## Development Tips

- The application uses React Context for state management (see src/context/)
- UI components are from shadcn-ui, located in src/components/ui/
- Mock data is available in src/data/mockData.ts for testing
- Tailwind CSS is pre-configured with custom styling in 	ailwind.config.ts

## Troubleshooting

**Port already in use?**
Vite will automatically use the next available port. You can also specify a port:
`sh
npm run dev -- --port 3000
`

**Dependency issues?**
Clear node_modules and reinstall:
`sh
rm -r node_modules
npm install
`

## Contributing

When contributing to this project:
1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting to ensure code quality
4. Submit a pull request with a clear description

## License

This project is part of the Campus Connect initiative.
