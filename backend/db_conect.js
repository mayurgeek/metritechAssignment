const mongoose = require('mongoose');

const connectToDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/testdb', ()=>{
        console.log("Connected to DataBase Successfully");
    })
}

module.exports = connectToDB;