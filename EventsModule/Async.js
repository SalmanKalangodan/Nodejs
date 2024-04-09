
// Asynchronous code execution
_____________________________

// Next, let's take a look at asynchronous code execution. Consider the code snippet below.
//  There are three log statements, but this time the second log statement is within a callback 
//  function passed to fs.readFile().


const fs = require('fs')

console.log(1);
fs.readFile('Index.html' ,()=>{
    console.log(2);
})
console.log(3);  // the output is  1 , 3, 2


// The main thread of execution always starts in the global scope. The global function is pushed onto the stack. Execution then comes to line 1. At 1ms, "First" is logged in the console, and the function is popped off the stack. Execution then moves on to line 3. At 2ms, the readFile method is pushed onto the stack. Since readFile is an asynchronous operation, it is off-loaded to libuv.

// JavaScript pops off the readFile method from the call stack because its job is done as far as the execution of line 3 is concerned. In the background, libuv starts to read the file contents on a separate thread. At 3ms, JavaScript proceeds to line 7, pushes the log function onto the stack, "Third" is logged to the console, and the function is popped off the stack.

// At about 4ms, let's say that the file read task is completed in the thread pool. The associated callback function is now executed on the call stack. Within the callback function, the log statement is encountered.

// That is pushed to the call stack, "Second" is logged to the console, and the log function is popped off. As there are no more statements to execute in the callback function, it is popped off as well. There's no more code to run, so the global function is also popped off the stack.

// The console output is going to read "First", "Third", and then "Second".

// Libuv and asynchronous operations


// It is pretty clear libuv helps handle asynchronous operations in Node.js. For async operations like handling a network request, libuv relies on the operating system primitives. For async operations like reading a file that has no native OS support, libuv relies on its thread pool to ensure that the main thread is not blocked. However, that does inspire a few questions.

// When an async task completes in libuv, at what point does Node decide to run the associated callback function on the call stack?
// Does Node wait for the call stack to be empty before running the callback function, or does it interrupt the normal flow of execution to run the callback function?
// What about other async methods like setTimeout and setInterval, which also delay the execution of a callback function?
// If two async tasks such as setTimeout and readFile complete at the same time, how does Node decide which callback function to run first on the call stack? Does one get priority over the other?
// All of these questions can be answered by understanding the core part of libuv, which is the event loop.

// What is the event loop?
// Technically, the event loop is just a C program. But, you can think of it as a design pattern that orchestrates or coordinates the execution of synchronous and asynchronous code in Node.js.