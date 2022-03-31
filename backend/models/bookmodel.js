const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true, 
    },
    ISBN:{
        type: String,
        required: true, 
    },
  });

  module.exports = mongoose.model('Bookstore', BookSchema);