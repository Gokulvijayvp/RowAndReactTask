
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');

const PORT = 8080;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyparser.json());

const row_routes = require('./routes/rowsRoute');
const table_routes = require('./routes/tableRoute')

app.get('/', (req, res) => {
    res.send("Hi, I am live");
});

app.use('/api', row_routes);
app.use('/api', table_routes);
 
mongoose.connect('mongodb://127.0.0.1:27017/usersdbs')
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.error('Error connecting to MongoDB:', err));