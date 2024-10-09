const db = require('./db');

exports.createPatient = async (email, password) => {
  const [result] = await db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, password, 'patient']);
  return result;
};

exports.findPatientByEmail = async (email) => {
  const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return results[0];
};

exports.getPatientById = async (id) => {
  const [results] = await db.query('SELECT id, email FROM users WHERE id = ?', [id]);
  return results[0];
};

exports.updatePatientProfile = async (id, email) => {
  await db.query('UPDATE users SET email = ? WHERE id = ?', [email, id]);
};
