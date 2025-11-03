const express = require('express');
const connectDB = require('./db/databaseConnection');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const taskRoutes = require('./routes/tasks.routes');

// Welcome route
app.get('/', function (req, res) {
    res.send('Welcome to the Todo API with Advanced Routing!');
});

// Use the task routes
app.use('/tasks', taskRoutes);

// Connect to database and start server
const PORT = 3000;
connectDB('mongodb://localhost:27017/todolist').then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});