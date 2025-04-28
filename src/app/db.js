require('dotenv').config();
const mongoose = require('mongoose');
const dbName = process.env.DB_NAME;

//Conexión de la base de datos
const db = async () => {
 try {
    await mongoose.connect(`mongodb://localhost/${dbName}`);
    
 } catch (err) {
    console.error("No se conecto a la DB", err)
    await mongoose.disconnect();
    process.exit(1);
 }
}

module.exports = db;