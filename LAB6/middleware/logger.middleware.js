// Logging middleware
const logger = (req, res, next) => {
    const start = Date.now();
    
    // Log request details
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Request Body:', req.body);
    
    // Override res.json to log response
    const originalJson = res.json;
    res.json = function(body) {
        const duration = Date.now() - start;
        console.log(`Response Time: ${duration}ms`);
        console.log('Response Body:', body);
        return originalJson.call(this, body);
    };
    
    next();
};

module.exports = logger;