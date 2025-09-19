const http = require('http');

let todos = [
  { id: 1, task: 'Learn Node.js http module', completed: false },
  { id: 2, task: 'Create a simple API', completed: false },
];

const server = http.createServer((req, res) => {
 
  const { method, url } = req;

  //This block handles the incoming request body for POST and PUT requests
  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    // Once all data chunks are received, combine them into a string
    body = Buffer.concat(body).toString();
    
    res.setHeader('Content-Type', 'application/json');

    //Get all items
    if (method === 'GET' && url === '/todos') {
      res.writeHead(200); 
      res.end(JSON.stringify(todos)); 
    
    //Get a single item
    } else if (method === 'GET' && url.match(/^\/todos\/([0-9]+)$/)) {
      const id = parseInt(url.split('/')[2]); 
      const todo = todos.find((t) => t.id === id);

      if (todo) {
        res.writeHead(200);
        res.end(JSON.stringify(todo));
      } else {
        res.writeHead(404); //Not Found
        res.end(JSON.stringify({ message: 'Todo not found' }));
      }
    
    //Create a new item
    } else if (method === 'POST' && url === '/todos') {
      try {
        const { task } = JSON.parse(body); 
        const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
        const newTodo = { id: newId, task, completed: false };
        
        todos.push(newTodo); 
        
        res.writeHead(201); 
        res.end(JSON.stringify(newTodo));
      } catch (error) {
        res.writeHead(400); //Bad Request
        res.end(JSON.stringify({ message: 'Invalid JSON or missing task' }));
      }
    
    //Update an item
    } else if (method === 'PUT' && url.match(/^\/todos\/([0-9]+)$/)) {
      const id = parseInt(url.split('/')[2]);
      const todo = todos.find((t) => t.id === id);

      if (todo) {
        try {
          const { task, completed } = JSON.parse(body);

          if (task !== undefined) todo.task = task;
          if (completed !== undefined) todo.completed = completed;
          
          res.writeHead(200);
          res.end(JSON.stringify(todo));
        } catch (error) {
          res.writeHead(400); 
          res.end(JSON.stringify({ message: 'Invalid JSON' }));
        }
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Todo not found' }));
      }
      
    //Delete an item
    } else if (method === 'DELETE' && url.match(/^\/todos\/([0-9]+)$/)) {
        const id = parseInt(url.split('/')[2]);
        const todoIndex = todos.findIndex((t) => t.id === id);

        if (todoIndex !== -1) {
            todos.splice(todoIndex, 1); 
            res.writeHead(204); 
            res.end();
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Todo not found' }));
        }

 
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  });
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});