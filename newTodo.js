const http = require('http')
const fs = require("fs")


const readfile = fs.readFileSync('Tods.json','utf8')


const server =  http.createServer((req,res)=>{
const Method  = req.method
const Url = req.url

if(Url === '/Todos' && Method === 'GET'){
        res.writeHead(200,{"content-type":"application/json"})
        res.end(readfile)
}
if(Url === '/Todos' && Method === 'POST'){
    let pdata =''
    req.on('data',(chank)=>{
       pdata+=chank
    })
    req.on('end',()=>{
        console.log(pdata);
        const readfile = fs.readFileSync('Tods.json','utf8')
        console.log(readfile);
        const newre = JSON.parse(readfile)
        const body =JSON.parse(pdata)
        console.log(body);
        const newdata= [...newre,body]
        console.log(newdata)
        console.log(JSON.stringify(newdata));
        fs.writeFileSync('Tods.json',JSON.stringify(newdata))
        res.writeHead(201,{'content-type':'application/json'})
        res.end(JSON.stringify(newdata))
    })
}
if(Url === '/Todos' && Method === 'DELETE'){
    const readfile = fs.readFileSync('Tods.json','utf8')

  
}

})


const PORT = 4005

server.listen(PORT,()=>{
    console.log(`server iss renning ${PORT}`);
})