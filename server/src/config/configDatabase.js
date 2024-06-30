const mongoose = require('mongoose');

require('../models/User');
require('../models/Furniture'); //TODO import real data model

async function configDatabase(){
    //TODO set database name
    const connectionString = 'mongodb://localhost:27017/furniture';

    await mongoose.connect(connectionString);

    console.log('Database connected');
}


module.exports = { configDatabase };