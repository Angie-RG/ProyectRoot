const argon2 = require('argon2');
const minLength = process.env.MIN_PASSWORD_LENGTH;
const maxLength = process.env.MAX_PASSWORD_LENGTH;

//hashing de constraseña con argon2id
//Argon2 es un algoritmo seguro de hash de contraseñas. 
//Está diseñado para permitir tanto un tiempo de ejecución como un consumo de memoria configurables. 
const generateHash = async (password) => {
    if(password?.length < minLength){
        password = faker.internet.password({ length: minLength }) ;
    }
    
    if(password?.length > maxLength){
        password = faker.internet.password({ length: maxLength });
    }

    try {
        const hash = await argon2.hash(password);
        return hash;

    } catch (err) {
        console.error('Error al generar el hash', err);
        return null;
    }
};

module.exports = generateHash;
