const express = require('express')
const z = require('zod')
const PORT = 3000
const jwt = require('jsonwebtoken')
const {createTodo , markedTodo, signUpBody} = require('./types')
const SERECT_KEY='shhhh'
const app = express()
app.use(express.json())
let id=1;
let ALL_TODOS= [
    {
        id:id,
        title:"wokr",
        description:"build the todo",
        marked:false
    }
]
app.post('/signin',(req, res)=>{
    

})
app.post('/signup',(req, res)=>{
    const body= req.body;
    const signupBodypayload= signUpBody.safeParse(body);
    if(signupBodypayload.success){
        res.status(401).send('bad request')
    }
    const {username, password} = signupBodypayload
    const jsonval= jwt.sign({username,password}, SERECT_KEY)
    if(!jsonval.success){
        return jsonval;
    }

})
app.post('/addtodo',(req,res)=>{
    const body = req.body
    const createpayload= createTodo.safeParse(body)
    if(!createpayload.success){
        res.status(401).send('bad request')
        return 
    }

   
    id++;
    const {title, description, marked} = createpayload.data
   ALL_TODOS.push(
    {
        id:id,
        title:title,
        description:description,
        marked:marked
    }
)
    res.json({
        msg:"great"
    })
})
app.get('/todos',(req,res)=>{
    res.json({
        ALL_TODOS
    })

})
app.put('/marked',(req,res)=>{
    const markBody= req.body
    const updatepayload=markedTodo.safeParse(markBody)
    if(!updatepayload.success){
        res.status(401).send('bad request');
        return;
    }
    const {id} = updatepayload.data
        ALL_TODOS.filter((f)=>{
            if(f.id==id){
                f.marked=true
                res.json({
                   updatepayload
                })
               
            }
        })
    
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})