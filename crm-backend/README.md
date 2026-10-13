# CRM Backend — Node.js REST API

A CRM (Customer Relationship Management) backend built with Node.js, Express, MongoDB, and JWT.

## Setup

```bash
npm install
```

Create a `.env` file (see `.env.example`):
```
PORT=5001
MONGO_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<your_secret_key>
```

## Run

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Auth (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register employee |
| POST | `/api/auth/login` | Login → returns JWT |

### Enquiry (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enquiry` | Submit a new enquiry form |

### Enquiry (Protected — Bearer Token required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enquiry/public` | Fetch all unclaimed leads |
| GET | `/api/enquiry/my-leads` | Fetch leads claimed by logged-in user |
| POST | `/api/enquiry/:id/claim` | Claim a specific lead |

## Auth Header
```
Authorization: Bearer <token>
```
