const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookAppointment);
router.get('/', authMiddleware, getAppointments);

module.exports = router;
