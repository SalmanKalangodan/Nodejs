const http = require('http');
const fs = require('fs');
const path =require('path')

const Server = http.createServer((req,res)=>{
    fs.readFile('Index.html',(err,data)=>{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        res.end
    })
})


Server.listen(3000,()=>{
    console.log("server");
})

console.log(path);


