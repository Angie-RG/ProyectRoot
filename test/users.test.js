const request = require('supertest');
const mongoose = require('mongoose');
const db = require('../src/app/db')
const app = require('../app');
const User = require('../src/models/userModel');
const { faker } = require('@faker-js/faker');
const generateHash = require("../src/utils/argon");
const passwordRandom = faker.internet.password({ length: 30 }) ;

describe('pruebas de usuarios API', () => {    
    beforeAll(async () => {
        db(); 
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /api/usuarios', () => {
        let response;
        beforeEach(async () => {
            response = await request(app).get('/api/usuarios').send();
        });

        it('La ruta funciona', async () => {
            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toContain('json');
        });

        it('La petición devuelve un array de usuarios', async () => {
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('POST /api/usuarios/add', () => {
        const email = faker.internet.email();
        afterAll(async () => {
            await User.deleteMany({email: email});
        });

        const usuarioErr = {
            firstname: 'BJCvygq9ueZP8KM6h7wjXP6hvRvrPBVTBkkXHJcDtSuhTgTaHZRhmKVVCBgLggk9UJQpJNsr8qPXtvuSjJmkvZVCaMoz9mktEEnsfn64',
        }

        test('La ruta POST funciona', async () => {
            //Generar información aleatoria de personas para la prueba de la API evitando duplicidad.
            const user = {
                firstname: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: email,
                password: await generateHash(passwordRandom),
            };
            const response = await request(app).post('/api/usuarios/add').send(user);
            expect(response.body._id).toBeDefined();
            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toContain('json');
        });

        it('Generar error al insertar POST', async () => {
            const response = await request(app).post('/api/usuarios/add').send(usuarioErr);
            expect(response.statusCode).toBe(400);
            expect(response.header['content-type']).toContain('json');
        });

    });

    describe('PUT /api/usuarios/update', () => {
        let usuario;
        beforeEach( async () => {
            usuario = await User.create({
                firstname: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: await generateHash(passwordRandom),
            });

        });

        afterEach(async () => {
            await User.findByIdAndDelete(usuario._id);
        });

        it('La ruta funciona', async () => {
            const response = await request(app).put(`/api/usuarios/update/${usuario._id}`).send({
                firstname: 'usuario actualizado',
            });

            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toContain('json');
            expect(response.body._id).toBeDefined();
            expect(response.body.firstname).toBe('usuario actualizado');
        });

    });

    describe('DELETE /api/usuarios/delete', () => {
        let usuario;
        let response;
        beforeEach(async () =>{
            usuario = await User.create({
                firstname: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: await generateHash(passwordRandom),
            });
            response = await request(app).delete(`/api/usuarios/delete/${usuario._id}`).send();
        });

        it('La ruta funciona', () => {
            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toContain('json');
        });

        it('Elimina correctamente', async () => {
            expect(response.body._id).toBeDefined();
            const userFound = await User.findById(usuario._id);
            expect(userFound).toBeNull();
        });
    });

}); 