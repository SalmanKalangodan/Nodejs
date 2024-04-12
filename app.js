const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res)=>{
   const url = req.url.split('?')[0]
   const method = req.method
   console.log(method);
   console.log(url);
   if(url === '/signin' && method === 'GET'){
     fs.readFile(path.join(__dirname,"signin.html"),(err,data)=>{
        if(err) throw err
        res.writeHead(200,{'content-type':'text/html'})
        res.end(data)
     })
   }else if(url==='/signin' && method ==='POST'){
      let userdata = ''
      req.on('data',(data)=>{
        userdata += data
      })
     req.on('end',()=>{
        console.log(userdata);
        const adduser = newuser(userdata)
       const username = adduser.name
      const password = adduser.password
      fs.readFile(path.join(__dirname,"data.json"), (err,use)=>{
        if(err) throw err
        let datass = JSON.parse(use)
        const newdatas= [...datass ,{username,password}]
        fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(newdatas), (err)=>{
         if(err ) throw err
         res.writeHead(201,{location: '/login.html'})
         res.end(path.join(__dirname,"/login.html"))
        })
      })
      
     })
   }else if(url === '/login' && method === 'GET'){
    fs.readFile(path.join(__dirname,'/login.html'),(err,data)=>{
        if(err) throw err;
        res.writeHead(200,{"x-content-type":"text/html"})
        res.end(data)
    })
   }else if(url === '/login' && method === 'POST'){
    let logdata = '';
    req.on('data' , (logdatas)=>{
    logdata+=logdatas
    })
    req.on('end',()=>{
        const filterdata = newuser(logdata)
        const logname = filterdata.name
        const logpassword= filterdata.password
        fs.readFile(path.join(__dirname,'data.json'),'utf-8',async (err,data)=>{
            if(err) throw err
            const users= await JSON.parse(data)
            const find =await users?.find((value)=> value.username===logname && value.password === logpassword)
            console.log(find , logname , logpassword , users);
            if(find){
                res.writeHead(200,{"content-type":'text/html'})
                res.end('<h1>ok</h1>')
            }else{
                res.writeHead(404,{"content-type":'text/html'})
                res.end('<h1>not found</h1>')
            }
        })
    })
   }
})


server.listen(3001, ()=>{
    console.log("server is running");
})

const newuser =(userdata)=>{
    let user = {};
   const narr = userdata.split('&')
    for(x of narr){
        const [key ,value] =x.split('=')
        user[key] = value
    }
    return user
}