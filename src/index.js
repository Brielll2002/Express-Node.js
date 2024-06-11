const express = require('express')
const app = express()
const cors = require('cors')
const port = 3100
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))


const cadastro = require('./service/userService') 
app.use('/user', cadastro)


app.listen(port, (err)=>{
    if(err)console.error(err)

    console.log(`Aplicação rodando na porta: ${port}`)
})