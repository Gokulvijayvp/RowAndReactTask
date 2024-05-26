const TableSchema = require('../models/tableModel');

const getAllTable = async (req,res) =>{
    try {
        const table =  await TableSchema.find()
        res.json(table)        
    } catch (error) {
        console.log(error)
    }
};

const addNewtable = async (req,res) =>{
    try {
        const newtable = new TableSchema(req.body);
        const savedtable = await newtable.save();
        res.status(201).json({ message: 'Table added successfully', data: savedtable });
    } catch (error) {
        res.status(500).json({ message: 'Error adding rows(s)', error: error.message });
    }
};

const updateTable = async (req,res) =>{
    try {
        const id = req.params.id
        const updateuser = await TableSchema.findByIdAndUpdate(id, req.body, {new :true}) 
        res.status(201).json({ message: 'Table update successfully', data: updateuser });
    } catch (error) {
        console.log(error)
    }
};

const deleteTable = async (req,res) =>{
    try {
        const id = req.params.id 
        const deletecourse = await TableSchema.findByIdAndDelete(id) 
        res.json(deletecourse)      
    } catch (error) {
        console.log(error)
    }
};

module.exports = {getAllTable,addNewtable,updateTable,deleteTable};