# User Management System Monorepo

A full-stack user management system built with Next.js, Express.js, and Firebase, using Turborepo for monorepo management. This project demonstrates modern web development practices including type safety, shared code, and microservices architecture.

## 🌟 Features

- **Authentication & Authorization**
    - Firebase Authentication integration
    - JWT-based session management
    - Protected routes and API endpoints

- **User Management**
    - User profile creation and updates
    - Data validation and sanitization
    - Real-time data synchronization

- **Technical Features**
    - Type-safe development with TypeScript
    - Shared code between frontend and backend
    - Mobile-responsive Material UI components
    - State management with Redux Toolkit
    - Firebase Emulator support for local development

## 🏗️ Architecture

```
monorepo/
├── apps/
│   ├── frontend/          # Next.js application
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   ├── store/        # Redux store
│   │   └── apis/         # API integration
│   │
│   └── backend/          # Express.js application
│       ├── controllers/  # Request handlers
│       ├── middleware/   # Express middleware
│       ├── routes/       # API routes
│       └── repository/   # Data access layer
│
├── packages/
│   └── shared/           # Shared utilities
│       ├── types/        # TypeScript interfaces
│       ├── utils/        # Common functions
│       └── constants/    # Shared constants
│
└── package.json          # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 8.x or later
- Firebase project with Authentication and Firestore enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/user-management-monorepo.git
cd user-management-monorepo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create `.env.local` in the frontend directory (apps/frontend):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Create `.env` in the backend directory (apps/backend):
```env
PORT=3000
FIREBASE_SERVICE_ACCOUNT_KEY=your_service_account_key_json
FIREBASE_DATABASE_URL=your_database_url
```

4. Build the shared package:
```bash
turbo run build --filter=@repo/shared
```

5. Start development servers:
```bash
turbo run dev
```

### Running with Firebase Emulator

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Start emulators:
```bash
cd apps/backend
firebase emulators:start --only auth,firestore,functions
```

## 🛠️ Development

### Working with the Monorepo

- Build all packages and apps:
```bash
turbo run build
```

- Run tests across all packages and apps:
```bash
turbo run test
```

- Lint all packages and apps:
```bash
turbo run lint
```

### Code Organization

- **Frontend (Next.js)**
    - Pages use App Router (Next.js 14+)
    - Components are organized by feature
    - Material UI for consistent styling
    - Redux for state management

- **Backend (Express.js)**
    - RESTful API endpoints
    - Controller-based architecture
    - Firebase Admin SDK integration
    - Middleware for authentication

- **Shared Package**
    - Type definitions
    - Validation utilities
    - Common constants
    - Shared interfaces

## 📚 API Documentation

### Authentication Endpoints

```typescript
POST /api/auth/register
Body: {
  email: string
  password: string
  name: string
  phoneNumber?: string
}

POST /api/auth/login
Body: {
  email: string
  password: string
}
```

### User Management Endpoints

```typescript
GET /api/users/fetch-user-data
Headers: {
  Authorization: "Bearer <token>"
}

PUT /api/users/update-user-data
Headers: {
  Authorization: "Bearer <token>"
}
Body: {
  name?: string
  phoneNumber?: string
}
```

## 🔒 Security

- Firebase Authentication for secure user management
- JWT token validation for API requests
- Input validation and sanitization
- Protected API endpoints
- Secure HTTP headers with Helmet
- CORS configuration for API access

## 🧪 Testing

```bash
# Run all tests
turbo run test

# Run frontend tests
cd apps/frontend
npm test

# Run backend tests
cd apps/backend
npm test
```

## 📦 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Backend Deployment (Cloud Functions)

1. Configure Firebase project
2. Update environment variables
3. Deploy functions:
```bash
cd apps/backend
firebase deploy --only functions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write unit tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/)
- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [Firebase](https://firebase.google.com/)
- [Material UI](https://mui.com/)

## 📞 Support

For support, email ikoafianando123@gmail.com

---

Built with ❤️ using modern web technologies