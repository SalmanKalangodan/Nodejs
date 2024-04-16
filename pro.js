const http = require('http')
const fs = require('fs')




const server  =  http.createServer((req,res)=>{
    const url = req.url
    const method = req.method
    console.log(url);
    if(url==='/pro'&&method === 'GET'){
        fs.readFile('pro.json','utf8',(err,data)=>{
            if(err) throw err
         res.writeHead(200, {'content-type':'applycation/json'})
         res.end(data)
        })
    }
    if(url==='/pro'&&method === 'POST'){
        fs.readFile('pro.json','utf8',(err,data)=>{
            if(err) throw err;
            const olddata = JSON.parse(data)
            let body = ''
            req.on('data', (chank)=>{
                 body +=chank
            })
           
            req.on('end',()=>{
                const d = JSON.parse(body)
                console.log(d);
                const newid = obj(d)
                const newData = [...olddata,newid]
                const n = JSON.stringify(newData)
                fs.writeFileSync('pro.json',n)
                   res.writeHead(201,{'content-type':'apllication/json'})
                   res.end(JSON.stringify(newData))
            })
         
        })
    }
    if(url.startsWith('/pro/')&& method === 'DELETE'){
       console.log(url);
       const id = url.split('/')[2]
       console.log(id);
       fs.readFile('pro.json','utf8',async (err,cd)=>{
           if(err) throw err
           const da =JSON.parse(cd)
           const newdata=await da.filter((value)=>{
            console.log(value.id);
            return value.id !==Number(id)
        })
        fs.writeFile('pro.json',JSON.stringify(newdata),(err)=>{
            if(err) throw err
            res.writeHead(200,{"content-type":'apllication/json'})
            res.end(JSON.stringify(newdata))
        })
       })
    }if(url.startsWith('/pro/') && method === "PUT"){
        const id = url.split('/')[2]
        fs.readFile('pro.json','utf8', (err,data)=>{
            if(err) throw err
            const datas = JSON.parse(data)
          const pdata=  datas.filter((value)=> {value.id === Number(id)
            req.on('data' , (chank)=>{
                value = chank
                console.log(chank);
            })
        })
        req.on('end',()=>{
                
        })
          const ndata=  datas.filter((value)=> value.id === Number(id))
          

           
        })
    }
})

const PORT =3003


server.listen(PORT,()=>{
    console.log('server is running');
})

const obj = (data) =>{
  const newobj = Math.floor(Math.random()*100000)
  console.log(data);
   data.id=newobj
 return data
}





  