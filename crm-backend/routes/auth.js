const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Employee = require('../models/Employee')

// Helper: generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Employee registration and login
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new employee
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Akash Sharma
 *               email:
 *                 type: string
 *                 example: akash@company.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Employee registered successfully
 *       400:
 *         description: Missing fields or email already exists
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' })
    }

    const exists = await Employee.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'Employee with this email already exists' })
    }

    const employee = await Employee.create({ name, email, password })

    return res.status(201).json({
      message: 'Employee registered successfully',
      token: generateToken(employee._id),
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
      },
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an employee and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: akash@company.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    const employee = await Employee.findOne({ email })
    if (!employee) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await employee.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    return res.status(200).json({
      message: 'Login successful',
      token: generateToken(employee._id),
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
      },
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

module.exports = router
