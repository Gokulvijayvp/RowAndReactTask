const mongoose = require('mongoose');

const rowSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    pan: {
        type: String,
        required: true,
        unique: true
    }
    
});

const RowsSchema = mongoose.model('rowsdatas', rowSchema);
module.exports = RowsSchema;