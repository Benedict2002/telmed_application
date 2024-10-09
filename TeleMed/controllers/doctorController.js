const DoctorModel = require('../models/doctorModel');

exports.addDoctor = async (req, res) => {
  const { name, specialization, availability } = req.body;
  try {
    await DoctorModel.addDoctor(name, specialization, availability);
    res.status(201).json({ message: 'Doctor added' });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.getAllDoctors();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};
