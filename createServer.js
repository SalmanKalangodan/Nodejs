const http = require('http')
const fs = require('fs')
const path =require('path')


const server = http.createServer((req , res)=>{
    const url = req.url
    const route ={
        '/':'index.html',
        '/contact':"contact.html",
        '/about':'about.html'
    };

  route[url]?  fs.readFile(path.join(__dirname,route[url]),(err,data)=>{
        if (err) throw err;
        res.end(data);
    }):res.end('page not fount')
})

server.listen(8000,()=>{
    console.log('server running');
})