const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PatientModel = require('../models/patientModel');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await PatientModel.createPatient(email, hash);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await PatientModel.findPatientByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await PatientModel.getPatientById(userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { email } = req.body;
  try {
    await PatientModel.updatePatientProfile(userId, email);
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
