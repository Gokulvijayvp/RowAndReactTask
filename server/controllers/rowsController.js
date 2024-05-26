const RowsSchema = require('../models/rowsModel');

const getAllRows = async (req,res) =>{
    try {
        const rows =  await RowsSchema.find()
        res.json(rows)        
    } catch (error) {
        console.log(error)
    }
};

const addNewRow = async (req,res) =>{
    try {
        const { rows } = req.body; 
        if (Array.isArray(rows) && rows.length > 0) {
            const newRows = rows.map((data) => new RowsSchema(data)); 
            const savedRows = await RowsSchema.insertMany(newRows);
            res.status(201).json({ message: 'Rows added successfully', data: savedRows });
        } else if (rows && typeof rows === 'object') {
            const newRows = new RowsSchema(rows);
            const savedRows = await newRows.save();
            res.status(201).json({ message: 'Rows added successfully', data: savedRows });
        } else { 
            res.status(400).json({ message: 'Invalid input data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding course(s)', error: error.message });
    }
};

const updateRow = async (req,res) =>{
    try {
        const id = req.params.id
        const updaterow = await RowsSchema.findByIdAndUpdate(id, req.body, {new :true}) 
        res.status(201).json({ message: 'Row update successfully', data: updaterow });
    } catch (error) {
        console.log(error)
    }
};

const deleteRow = async (req,res) =>{
    try {
        const id = req.params.id 
        const deleteRow = await RowsSchema.findByIdAndDelete(id) 
        res.json(deleteRow)      
    } catch (error) {
        console.log(error)
    }
};

module.exports = {getAllRows,addNewRow,updateRow,deleteRow};