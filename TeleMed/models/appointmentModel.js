const db = require('./db');

exports.bookAppointment = async (patient_id, doctor_id, date) => {
  const [result] = await db.query('INSERT INTO appointments (patient_id, doctor_id, date) VALUES (?, ?, ?)', [patient_id, doctor_id, date]);
  return result;
};

exports.getAppointmentsByPatientId = async (patientId) => {
  const [results] = await db.query('SELECT * FROM appointments WHERE patient_id = ?', [patientId]);
  return results;
};
