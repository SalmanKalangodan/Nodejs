const fs = require('fs');
const readline = require('readline');

const todosFile = 'todos.txt';

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Read todos from file
function readTodos() {
  try {
    const data = fs.readFileSync(todosFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Save todos to file
function saveTodos(todos) {
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));
}

// Display todos
function displayTodos() {
  const todos = readTodos();
  if (todos.length === 0) {
    console.log('No todos yet.');
  } else {
    console.log('Todos:');
    todos.forEach((todo, index) => {
      console.log(`${index + 1}. ${todo}`);
    });
  }
}

// Add todo
function addTodo(todo) {
  const todos = readTodos();
  todos.push(todo);
  saveTodos(todos);
  console.log('Todo added successfully.');
}

// Remove todo
function removeTodo(index) {
  const todos = readTodos();
  if (index >= 1 && index <= todos.length) {
    todos.splice(index - 1, 1);
    saveTodos(todos);
    console.log('Todo removed successfully.');
  } else {
    console.log('Invalid todo index.');
  }
}

// Main menu
function mainMenu() {
  console.log('\nTodo List');
  console.log('1. Display Todos');
  console.log('2. Add Todo');
  console.log('3. Remove Todo');
  console.log('4. Exit');

  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        displayTodos();
        break;
      case '2':
        rl.question('Enter todo: ', (todo) => {
          addTodo(todo);
          mainMenu();
        });
        break;
      case '3':
        rl.question('Enter index of todo to remove: ', (index) => {
          removeTodo(parseInt(index));
          mainMenu();
        });
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid choice.');
        mainMenu();
    }
  });
}

// Start the application
mainMenu();
