const express = require('express')
const router = express.Router()
const Enquiry = require('../models/Enquiry')
const { protect } = require('../middleware/auth')

/**
 * @swagger
 * tags:
 *   name: Enquiry
 *   description: Lead/Enquiry management
 */

/**
 * @swagger
 * /api/enquiry:
 *   post:
 *     summary: Submit a new enquiry (public form — no login required)
 *     tags: [Enquiry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, courseInterest]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Verma
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               courseInterest:
 *                 type: string
 *                 example: Full Stack Development
 *     responses:
 *       201:
 *         description: Enquiry submitted successfully
 *       400:
 *         description: Missing required fields
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, courseInterest } = req.body

    if (!name || !email || !courseInterest) {
      return res.status(400).json({ message: 'Name, email and courseInterest are required' })
    }

    const enquiry = await Enquiry.create({ name, email, phone, courseInterest })

    return res.status(201).json({
      message: 'Enquiry submitted successfully',
      enquiry,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 * /api/enquiry/public:
 *   get:
 *     summary: Get all unclaimed (public) enquiries
 *     tags: [Enquiry]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of unclaimed enquiries
 *       401:
 *         description: Unauthorized
 */
router.get('/public', protect, async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ claimedBy: null }).sort({ createdAt: -1 })

    return res.status(200).json({
      count: enquiries.length,
      enquiries,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 * /api/enquiry/my-leads:
 *   get:
 *     summary: Get all leads claimed by the logged-in employee
 *     tags: [Enquiry]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of leads claimed by the logged-in employee
 *       401:
 *         description: Unauthorized
 */
router.get('/my-leads', protect, async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ claimedBy: req.employee._id }).sort({ createdAt: -1 })

    return res.status(200).json({
      count: enquiries.length,
      enquiries,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 * /api/enquiry/{id}/claim:
 *   post:
 *     summary: Claim an unclaimed enquiry
 *     tags: [Enquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The enquiry ID to claim
 *     responses:
 *       200:
 *         description: Enquiry claimed successfully
 *       400:
 *         description: Enquiry already claimed
 *       404:
 *         description: Enquiry not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/claim', protect, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' })
    }

    if (enquiry.claimedBy) {
      return res.status(400).json({ message: 'This enquiry has already been claimed' })
    }

    enquiry.claimedBy = req.employee._id
    await enquiry.save()

    return res.status(200).json({
      message: 'Enquiry claimed successfully',
      enquiry,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

module.exports = router
