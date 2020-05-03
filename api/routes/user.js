'use strict'
//-------------------------------------------------------------------------------------------------
// ROUTING DEL CONTROLADOR DE USUARIO
//-------------------------------------------------------------------------------------------------
// Creamos el servidor
var express = require('express');
// Instanciamos el controlador 
var UserController = require('../controllers/user');
// Creacion de la variable para dirigir las rutas
var api = express.Router();
// Middleware de autenticacion
var md_auth = require('../middlewares/authenticated');
// Middleware de subida de imagenes
var multipart = require('connect-multiparty');
// Ubicacion de la carpetas de upload
var md_upload =  multipart({uploadDir: './uploads/users'});
//-------------------------------------------------------------------------------------------------
// RUTAS
//-------------------------------------------------------------------------------------------------
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/users/:page?',md_auth.ensureAuth, UserController.getUsers ); 
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage);
api.get('/get-image-user/:imageFile',UserController.getImageFile);
api.get('/counters/:id?',md_auth.ensureAuth,UserController.getCounters);
// exportamos las rutas
module.exports = api;