# GameVault Backend API

## Overview

This repository contains the Node.js, Express and MongoDB backend for **GameLib**, a personal gaming library. Players can track the games they own, set each game's completion status (Playing, Completed, Dropped), give it a personal rating, and leave reviews on games in the community.



## Related Links
- **Frontend Repository:** [project-3-frontend](https://github.com/adamsami21455/project-3-frontend)

## Technologies Used

- **Node.js** – JavaScript runtime
- **Express** – web framework and routing
- **MongoDB** – NoSQL database
- **Mongoose** – schemas, validation and relationships
- **JSON Web Tokens (jsonwebtoken)** – stateless authentication
- **bcrypt** – password hashing
- **dotenv** – environment variables
- **Morgan** – HTTP request logging
- **CORS** – lets the frontend talk to the API
- **express-rate-limit** – rate limiting

## Features

- User registration and sign-in
- JWT authentication middleware that protects private routes
- Full CRUD API for games
- Create, read, update and delete reviews
- Filtering a library by status and platform
- MongoDB relationships between users, games and reviews
- Ownership-based authorization (only owners can edit or delete their games and reviews)
- Request validation, including ObjectId checks on route parameters
- Rate limiting on sign-in attempts and general requests
- Clear error handling with proper status codes
- Passwords are hashed and never returned in responses

## Project Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   ├── game.controller.js
│   └── review.controller.js
├── middleware/
│   ├── rateLimiters.js
│   ├── validateObjectId.js
│   └── verifyToken.js
├── models/
│   ├── User.js
│   ├── Game.js
│   └── Review.js
├── routes/
│   ├── auth.routes.js
│   ├── game.routes.js
│   └── review.routes.js
├── .env
└── server.js
```

### Folder Responsibilities

| Folder / File | Purpose |
|---|---|
| `config` | MongoDB connection setup |
| `controllers` | HTTP request and response handling |
| `middleware` | Authentication, ObjectId validation and rate limiting |
| `models` | Mongoose schemas and models |
| `routes` | Express route definitions |
| `server.js` | Express app setup, middleware, routes, database connection and server startup |

## Getting Started

### Prerequisites


## Database Models

### User

| Field | Type | Rules |
|---|---|---|
| `username` | String | Required, unique, trimmed, lowercase |
| `hashedPassword` | String | Required, hashed with bcrypt, removed from all JSON responses |
| `createdAt` | Date | Generated automatically |
| `updatedAt` | Date | Generated automatically |

### Game

| Field | Type | Rules |
|---|---|---|
| `title` | String | Required |
| `platform` | String | One of: PC, PlayStation, Xbox, Switch, Mobile, Other |
| `genre` | String | Optional |
| `status` | String | One of: Playing, Completed, Dropped. Defaults to Playing |
| `personalRating` | Number | Optional, 1–5 |
| `coverImage` | String | Optional, image URL |
| `notes` | String | Optional |
| `owner` | ObjectId | Required, references `User` |
| `createdAt` | Date | Generated automatically |
| `updatedAt` | Date | Generated automatically |

### Review

| Field | Type | Rules |
|---|---|---|
| `rating` | Number | Required, 1–5 |
| `body` | String | Required |
| `game` | ObjectId | Required, references `Game` |
| `author` | ObjectId | Required, references `User` |
| `createdAt` | Date | Generated automatically |
| `updatedAt` | Date | Generated automatically |

## Entity Relationships

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/sign-up` | Public | Create a new account |
| POST | `/auth/sign-in` | Public | Sign in and receive a JWT |
| GET | `/auth/me` | Authenticated | Get the signed-in user |

### Games

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/games` | Authenticated | Get the signed-in user's library. Supports `?status=` and `?platform=` filters |
| GET | `/games/community` | Authenticated | Browse games from all users' libraries |
| GET | `/games/:gameId` | Authenticated | Get one game and its reviews |
| POST | `/games` | Authenticated | Add a game to your library |
| PUT | `/games/:gameId` | Owner | Update a game (details, status, rating) |
| DELETE | `/games/:gameId` | Owner | Delete a game and its reviews |

### Reviews

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/games/:gameId/reviews` | Authenticated | Get all reviews for a game |
| POST | `/games/:gameId/reviews` | Authenticated | Write a review on a game |
| PUT | `/reviews/:reviewId` | Author | Update your review |
| DELETE | `/reviews/:reviewId` | Author | Delete your review |

## Status Codes

| Status | Meaning in this API |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 400 | Invalid request (missing fields, password too short, validation error) |
| 401 | Missing, invalid or expired token, or wrong username/password |
| 403 | Signed in but not the owner of the resource |
| 404 | Resource not found or invalid ID |
| 409 | Username already exists |
| 429 | Too many requests or sign-in attempts |
| 500 | Unexpected server error |

## Future Enhancements

- Automated API tests with Jest and Supertest
- Search for games by title
- Integration with the RAWG video game database to auto-fill titles and cover art
- Hours-played tracking and a stats endpoint (total games, % completed)
- Wishlist for games users want to buy
- Sorting by title, rating or date added

## Team Members

| Name | GitHub | Responsibilities |
|---|---|---|
| Adam Alabbasi | [GitHub profile](https://github.com/adamsami21455) | Authentication, Review API |
| Hamad Abdulla | [GitHub profile](https://github.com/) | Game API |

## Credits
- GA Material
- Omar
- Zaid