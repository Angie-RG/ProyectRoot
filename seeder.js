const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();
const UserModel = require('./src/models/userModel');
const generateHash = require("./src/utils/argon");
const dbName = process.env.DB_NAME;
const minLength = process.env.MIN_PASSWORD_LENGTH;
const maxLength = process.env.MAX_PASSWORD_LENGTH;
let secretPassword = process.env.RANDOM_PASSWORD;

//Ejecución de Seeder para los usuarios
(async () => {
    await mongoose.connect(`mongodb://localhost/${dbName}`);
    if(secretPassword?.length < minLength){
        secretPassword = faker.internet.password({ length: minLength }) ;
    }

    if(secretPassword?.length > maxLength){
        secretPassword = faker.internet.password({ length: maxLength });
    }

    const hash = await generateHash(secretPassword);

    if (!hash) {
        console.error('no se genero hash')
    }

    const newUser = await UserModel.create({
        firstname: 'Angélica',
        lastName: 'Ramírez',
        email: 'angelica_rgonzalez@outlook.com',
        password: hash,
    });

    console.log(newUser);
})();