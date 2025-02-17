const z = require('zod')

const createTodo=z.object({
    title:z.string().min(3),
    description:z.string().min(5),
    marked:z.boolean()
})

const markedTodo= z.object({
    id:z.number()
})
const signUpBody = z.object({
    username:z.string().min(4),
    password:z.string().min(8)
})
module.exports={
    createTodo:createTodo,
    markedTodo:markedTodo,
    signUpBody:signUpBody
}