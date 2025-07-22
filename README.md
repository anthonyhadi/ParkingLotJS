# Parking Lot Web Service (TypeScript + Node.js)

A robust RESTful API for managing a parking lot, built with TypeScript, Node.js, and Express. This project follows industry best practices with proper type safety, error handling, validation, logging, and testing.

## 🏗️ Project Structure

```
ParkingLotJS/
├── src/                    # TypeScript source files
│   ├── config/            # Configuration files
│   │   ├── app.ts         # Application configuration
│   │   └── database.ts    # Database configuration
│   ├── middleware/        # Express middleware
│   │   ├── errorHandler.ts # Error handling middleware
│   │   └── validation.ts  # Request validation middleware
│   ├── utils/             # Utility functions
│   │   └── logger.ts      # Logging utility
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # All type definitions
│   ├── index.ts           # Main server entry point
│   ├── routes.ts          # API route definitions
│   └── parkingLot.ts      # Business logic
├── tests/                 # Test files
│   └── parkingLot.test.ts # Unit tests
├── dist/                  # Compiled JavaScript output
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 🚀 Features

- **TypeScript** with strict type checking and modern ES2020 features
- **RESTful API** with proper HTTP status codes
- **Type Safety** with comprehensive TypeScript interfaces
- **Input Validation** with comprehensive error messages
- **Error Handling** with centralized error management
- **Logging** with configurable log levels
- **Security** with Helmet, CORS, and rate limiting
- **Testing** with Jest and ts-jest
- **Code Quality** with ESLint and TypeScript ESLint
- **Health Checks** for monitoring
- **Graceful Shutdown** handling

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🛠️ Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ParkingLotJS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Start the server:**
   ```bash
   # Production mode (from compiled JavaScript)
   npm start
   
   # Development mode (with auto-reload and TypeScript)
   npm run dev
   ```

   The server will start on `http://localhost:3000`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📚 API Documentation

All endpoints are prefixed with `/api`.

### 1. Create a Parking Lot

- **URL:** `POST /api/create-lot`
- **Description:** Creates a new parking lot with specified capacity
- **Body:**
  ```json
  {
    "capacity": 6
  }
  ```
- **Success Response (201):**
  ```json
  {
    "success": true,
    "message": "Created a parking lot with 6 slots.",
    "data": {
      "capacity": 6
    }
  }
  ```

### 2. Park a Car

- **URL:** `POST /api/park`
- **Description:** Parks a car in the first available slot
- **Body:**
  ```json
  {
    "carId": "KA-01-HH-1234"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Allocated slot number: 1",
    "data": {
      "slotNumber": 1,
      "carId": "KA-01-HH-1234"
    }
  }
  ```

### 3. Unpark a Car

- **URL:** `DELETE /api/unpark/:slotNumber`
- **Description:** Removes a car from a specific slot
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Car with registration number KA-01-HH-1234 has been unparked from slot 1.",
    "data": {
      "slotNumber": 1
    }
  }
  ```

### 4. Get Parking Lot Status

- **URL:** `GET /api/status`
- **Description:** Gets the current status of all parking slots
- **Success Response (200):**
  ```json
  {
    "success": true,
    "data": [
      {
        "slotNumber": 1,
        "carId": "KA-01-HH-1234"
      },
      {
        "slotNumber": 2,
        "carId": null
      }
    ],
    "summary": {
      "totalSlots": 6,
      "occupiedSlots": 1,
      "availableSlots": 5
    }
  }
  ```

### 5. Health Check

- **URL:** `GET /api/health`
- **Description:** Health check endpoint for monitoring
- **Success Response (200):**
  ```json
  {
    "success": true,
    "service": "parking-lot-api",
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

## 🔧 Configuration

The application can be configured using environment variables:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Logging level (info/warn/error/debug)
- `CORS_ORIGIN` - CORS origin (default: *)
- `MAX_CAPACITY` - Maximum parking lot capacity (default: 1000)

## 🛡️ Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common error scenarios:
- Invalid input data
- Parking lot not created
- Car already parked
- Parking lot full
- Invalid slot number
- Slot already empty

## 📝 Logging

The application includes comprehensive logging:
- HTTP request/response logging
- Parking lot operation logging
- Error logging with stack traces
- Configurable log levels and formats

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Rate limiting** (100 requests per 15 minutes per IP)
- **Input validation** and sanitization
- **Error handling** without exposing sensitive information

## 🚀 Deployment

The application is ready for deployment with:
- Environment-based configuration
- Graceful shutdown handling
- Health check endpoints
- Production-ready logging
- Compiled JavaScript output in `dist/` directory

## 🔧 Development

### TypeScript Features

- **Strict Type Checking** - All code is type-safe
- **Interface Definitions** - Comprehensive type definitions
- **Modern ES2020** - Latest JavaScript features
- **Source Maps** - Easy debugging
- **Declaration Files** - Generated `.d.ts` files

### Available Scripts

```bash
npm run build          # Compile TypeScript to JavaScript
npm start              # Start production server
npm run dev            # Start development server with auto-reload
npm test               # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage
npm run type-check     # Type checking without compilation
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite and type checking
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 