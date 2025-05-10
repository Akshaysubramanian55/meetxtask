# Activity Booking API

A RESTful API for managing activity bookings built with Node.js, Express, and MongoDB.

## Features

- User authentication (registration, login) with JWT
- Public activity listing
- Activity booking for authenticated users
- User booking management
- MongoDB database with Mongoose ODM

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Token)
- **Testing**: Postman Collection

## API Endpoints

### Authentication

- `POST /register` - Register a new user
- `POST /login` - Login user and get token

### Activities

- `GET /getactivites` - Get all activities (public)
- `GET /getactivity/:id` - Get a specific activity (public)
- `POST /registeractivities` - Create a new activity (admin only in production)

### Bookings

- `POST /bookactivity` - Book an activity
- `GET /mybookings` - Get all bookings for the logged in user

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB instance (local or cloud)
- NPM or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Akshaysubramanian55/meetxtask.git 
   cd activity-booking-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then, edit the `.env` file with your MongoDB connection string and JWT secret.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Seed the database with sample data:
   ```bash
   npm run seed -- -i
   ```

### Testing with Postman

1. Import the provided Postman collection (`Activity_Booking_API.postman_collection.json`)
2. Set the `base_url` variable to your server URL (default: `http://localhost:3000/`)
3. Run the registration and login requests first to get authentication token
4. Use the generated token for authenticated requests



## Data Models

### User Model

```javascript
{
  name: String,
  email: String,
  phone: String,
  password: String (hashed),
  createdAt: Date
}
```

### Activity Model

```javascript
{
  title: String,
  description: String,
  location: String,
  dateTime: Date,
  capacity: Number,
  availableSpots: Number,
  createdAt: Date
}
```

### Booking Model

```javascript
{
  user: ObjectId (reference to User),
  activity: ObjectId (reference to Activity),
  bookingDate: Date,
  status: String (enum: ['confirmed', 'cancelled'])
}
```

## Security Features

- Password hashing using bcrypt
- JWT authentication for protected routes
- Error handling for common scenarios

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:

```json
{
  "success": false,
  "message": "Error message description"
}
```



