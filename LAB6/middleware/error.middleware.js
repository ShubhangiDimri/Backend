// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);
    
    // Determine error status
    const status = err.status || 500;
    
    // Send error response
    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: status,
            timestamp: new Date().toISOString()
        }
    });
};

module.exports = errorHandler;