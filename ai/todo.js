const http = require('http');
const fs = require('fs');

const todosFile = 'todos.json';

// Helper function to read todos from file
function readTodos() {
  try {
    const data = fs.readFileSync(todosFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper function to save todos to file
function saveTodos(todos) {
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));
}

// HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/todos' && req.method === 'GET') {
    // GET /todos - Get all todos
    const todos = readTodos();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos));
  } else if (req.url.startsWith('/todos/') && req.method === 'DELETE') {
    // DELETE /todos/:id - Delete a todo by id
    const id = req.url.split('/')[2];
    const todos = readTodos();
    const updatedTodos = todos.filter(todo => todo.id !== parseInt(id));
    saveTodos(updatedTodos);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Todo deleted successfully.');
  } else if (req.url === '/todos' && req.method === 'POST') {
    // POST /todos - Add a new todo
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const todo = JSON.parse(body);
      const todos = readTodos();
      todo.id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
      todos.push(todo);
      saveTodos(todos);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(todo));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
const PORT =  30000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
