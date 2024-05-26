const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
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
});

const TableSchema = mongoose.model('tabledatas', tableSchema);
module.exports = TableSchema;