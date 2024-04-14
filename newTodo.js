const http = require('http')
const fs = require("fs")




const server =  http.createServer((req,res)=>{
const Method  = req.method
const Url = req.url

if(Url === '/Todos' && Method === 'GET'){
    fs.readFile('Todo.json','utf8',(err,data)=>{
        if(err) throw err
        res.writeHead(200,{"content-type":"application/json"})
        res.end(data)
    })
}

})


const PORT = 4005
server.listen(PORT,()=>{
    `server iss renning ${PORT}`
})