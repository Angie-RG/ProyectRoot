const router = require('express').Router();
const User = require('../models/userModel');
const generateHash = require("../utils/argon");

//Enlistar usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);

    } catch (error) {
        console.error('Error al obtener los usuarios', error);
        res.status(500).json({error: 'Error al obtener la lista de usuarios'});
    }
});

//Genera un nuevo usuario
router.post('/add', async (req, res) => {
    const errList = [];
    if(!req.body.firstname){
        errList.push("El nombre es inválido.");
    }

    if(req.body.firstname?.length > 100){
        errList.push("Los nombres sobrepasan el límite establecido.");
    }

    if(!req.body?.lastName){
        errList.push("Los apellidos son inválidos.");
    }

    if(req.body.lastName?.length > 100){
        errList.push("Los apellidos sobrepasan el límite establecido.");
    }

    if(!req.body?.email){
        errList.push("El correo es inválido.");
    }

    if(!req.body?.password){
        errList.push("La contraseña es inválida.");
    }

    if(req.body?.password?.length > 255){
        errList.push("La contraseña sobrepasa el límite establecido.")
    }

    if(errList.length > 0){
        return res.status(400).json({errList});
    }

    try {
        const newUser = await User.create({
            firstname: req.body.firstname,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await generateHash(req.body.password),
        });
        res.json(newUser);

    } catch (error) {
        console.error('Error al insertar el usuario', error);
        res.status(500).json({error: 'Error al agregar el usuario'});

    }
})

//Actualiza la información del usuario.
router.put('/update/:userId', async (req, res) => {
    const errList = [];
    if(req.body.firstname?.length > 100){
        errList.push("Los nombres sobrepasan el límite establecido.");
    }

    if(req.body.lastName?.length > 100){
        errList.push("Los apellidos sobrepasan el límite establecido.");
    }

    if(req.body.password?.length > 255){
        errList.push("La contraseña sobrepasa el límite establecido.")
    }

    if(errList.length > 0){
        return res.status(400).json({errList});
    }

    try {
        const userUpdate = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            {new: true},
        );
        res.json(userUpdate);
        
    } catch (err) {
        console.error('Error al modificar el usuario', err);
        res.status(500).json({error: 'Error al modificar el usuario'});
    }
});

//Elimina un usuario por ID
router.delete('/delete/:userId', async (req, res) => {
    try {
        const usuario = await User.findByIdAndDelete(req.params.userId);
        res.json(usuario);
        
    } catch (err) {
        console.error('Error al eliminar el usuario', err);
        res.status(500).json({error: 'Error al eliminar el usuario'});
    }
});

module.exports = router;