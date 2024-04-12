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