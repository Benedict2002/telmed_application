const db = require('./db');

exports.addDoctor = async (name, specialization, availability) => {
  const [result] = await db.query('INSERT INTO doctors (name, specialization, availability) VALUES (?, ?, ?)', [name, specialization, availability]);
  return result;
};

exports.getAllDoctors = async () => {
  const [results] = await db.query('SELECT * FROM doctors');
  return results;
};
