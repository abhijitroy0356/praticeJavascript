const { Client } = require('pg');
const express = require('express')
const cors = require('cors')
const fs = require('fs')
// Connection string for PostgreSQL
const connectionString = '';

const client = new Client({
  connectionString: connectionString
});
// client.connect() // Connect once when the app starts
//     .then(() => console.log('✅ Connected to PostgreSQL!'))
//     .catch(err => console.error('❌ Connection Error:', err));
 const app = express()
app.use(express.json())

app.get('/addtodo',async(req, res)=>{
   
    console.log('Connected to PostgreSQL database!');
    
    // Query to get all data from the todos table
    const ans= await client.query('SELECT * FROM todos');
    return res.json(ans.rows)

})
app.get('/id', async (req, res)=>{
    
    const id =  req.query.id
    const ans = await client.query(`SELECT * FROM todos WHERE id=${id}`);
    return res.json(ans.rows);
})
app.post('/newdata',async(req, res)=>{
    try{
    const title = req.body.title;
    const description= req.body.description;
    console.log(title,description)
    const ans = await client.query(`INSERT INTO todos (title , description) VALUES($1,$2)`,[title,description])
    return res.send(ans);
    }
    catch(err){
        console.error('some issues there', err)
    }
})
app.get('/del/:id',async(req,res)=>{
    try{
        const key = req.params.id
        console.log(key)
        const ans = await client.query(`DELETE FROM todos WHERE id=${key}`)
        if(!ans.rowCount){
            return res.status(404).json({message:"not found"})
        }
        return res.json(ans);
    }
    catch(err){
        console.error(err);
    }
})
app.get('/file', (req,res)=>{
    fs.readdir('./files',(err, files)=>{
        if(err){
            console.error("error here")
        }
        res.json({
            msg:files
        })
    })
    
})

app.get('/file/:filename', async (req,res)=>{
    const filename = req.params.filename;
    console.log(filename)
    try{
    await fs.access(`./files/${filename}.txt`, fs.constants.R_OK, async (err)=>{
        if(err){
            res.json({
                msg:'not found'
            })
        }
        
            const ans=fs.promises.readFile(`./files/${filename}.txt`,'utf-8').then((t)=>{
                res.json({
                    t
                })
            })
           
            
    
    })
}catch(err){
    res.json({
        msg :"error in to find such file"
    })
}
})



app.listen(3000,()=>{
    console.log('success')
})