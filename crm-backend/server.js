require('dotenv').config()
const express = require('express')
const cors = require('cors')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const connectDB = require('./config/db')

const authRoutes = require('./routes/auth')
const enquiryRoutes = require('./routes/enquiry')

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// ── Swagger Setup ──────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRM Backend API',
      version: '1.0.0',
      description: 'REST API for CRM system — Employee auth & Lead management',
    },
    servers: [
      { url: 'https://crm-backend-wmjo.onrender.com/', description: 'Production' },
      { url: 'http://localhost:5001', description: 'Local' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [],
  },
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// ──────────────────────────────────────────────────────────

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/enquiry', enquiryRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CRM API is running. Visit /api-docs for Swagger UI.' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`)
})
