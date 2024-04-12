const http = require('http')
const fs = require('fs')
const path = require('path')
const { Axios } = require('axios')


const server = http.createServer((req, res)=>{
    const url = req.url.split('?')[0]
    console.log(url);

   if(url==='/'){
   const filepath= path.join(__dirname, "Index1.html")
   const fileStream =fs.createReadStream(filepath)
   fileStream.on('error',(err)=>{
    res.writeHead(500,{"content-type":"text/plain"})
    res.end('500 error')
   })
   res.setHeader("content-type","text/html")
   fileStream.pipe(res)
   }if(url==='/submit'){
    const name = req.url.split('?')[1].split('=')[1]
    console.log(name);
    fs.appendFile("name.txt" ,name , (err)=>{
        if(err) console.log(err);
    })
    res.setHeader("content-type","text/plain")
    res.end()
   }
   if(url === '/list'){
    fs.readFile('name.txt', 'utf-8', (err,data)=>{
        if(err) throw err ;
        const list = data
        console.log(list);
        res.end(list)
    })
   }
})

server.listen(4000 , ()=>{
    console.log("server is running");
})

// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((req, res) => {
//     const url = req.url.split('?')[0];

//     if (url === '/') {
//         const filepath = path.join(__dirname, 'Index1.html');
//         const fileStream = fs.createReadStream(filepath);

//         fileStream.on('error', (err) => {
//             res.writeHead(500, { 'content-type': 'text/plain' });
//             res.end('500 error: ' + err.message);
//         });

//         res.setHeader('content-type', 'text/html'); // Set correct content type
//         fileStream.pipe(res);
//     } else if (url === '/submit') {
//         // Uncomment and modify this section to handle query parameters
//         const name = req.url.split('?')[1];
//         const newname = req.url.split('=')[1];
//         fs.appendFile('name.txt', newname + '\n', (err) => {
//             if (err) {
//                 console.error('Error writing to file:', err);
//                 res.writeHead(500, { 'content-type': 'text/plain' });
//                 res.end('Error writing to file.');
//             } else {
//                 res.writeHead(200, { 'content-type': 'text/plain' });
//                 res.end('Data received and saved successfully!');
//             }
//         });
//         res.setHeader('content-type', 'text/plain');
//         res.end('hello');
//     } else {
//         res.writeHead(405, { 'content-type': 'text/plain' });
//         res.end('Method not allowed.');
//     }
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });
