const AppointmentModel = require('../models/appointmentModel');

exports.bookAppointment = async (req, res) => {
  const { patient_id, doctor_id, date } = req.body;
  try {
    await AppointmentModel.bookAppointment(patient_id, doctor_id, date);
    res.status(201).json({ message: 'Appointment booked' });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};

exports.getAppointments = async (req, res) => {
  const patientId = req.user.id;
  try {
    const appointments = await AppointmentModel.getAppointmentsByPatientId(patientId);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};
