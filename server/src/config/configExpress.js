
const express = require('express');
const { session } = require('../middlewares/sesion');
const { cors } = require('../middlewares/cors');

//TODO replace with real router accordind exam description
const secret = 'cookie secret';

function configExpress(app){
   

    
    app.use(cors());
    app.use(session());
    
    app.use(express.json());
    
}


module.exports = { configExpress };