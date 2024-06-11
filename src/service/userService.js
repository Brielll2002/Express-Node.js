const User = require('../model/userModel')
const Response = require('../model/serviceResponse')
const express = require('express')
const app = express()
const user = new User()

app.post('/', async(req, res)=>{
    try {
        const {email, password, key} = req.body
        
        if(email && password && key){
            const verificar = await user.getUser(email, password)

            if(!verificar.result){  
                const sucess = await user.createUser(email, password, key)
                if(sucess){
                    const response = new Response(null, 'Cadastro realizado com sucesso!', sucess)
                    res.status(200).json(response.getResponse())
                }
                else{
                    const response = new Response(null, 'Erro interno. Tente novamente mais tarde!', sucess)
                    res.status(500).json(response.getResponse())
                }
            }
            else{
                const response = new Response(null, 'Enviamos um email para você, verifique para continuar !', false)
                res.status(400).json(response.getResponse())
            }
        }
        else{
            const response = new Response(null, 'Preencha todos os campos!', false)
            res.status(400).json(response.getResponse())
        }

    } 
    catch (error) {
        console.error(error)
        const response = new Response(null, 'Erro interno. Tente novamente mais tarde!', false)
        res.status(500).json(response.getResponse())
        return
    }
})

app.get('/', async(req, res)=>{
    try {
        const {email, password, id} = req.body
    
        if((email && password) || id){
            const data = await user.getUser(email, password, id)

            if(data){
                if(data.result){
                    const response = new Response(data.result, 'Usuário encontrado!', true)
                    res.status(200).json(response.getResponse())
                }
                else{
                    const response = new Response(null, 'Usuário não existente!', false)
                    res.status(400).json(response.getResponse())
                }
            }
            else{
                const response = new Response(null, 'Erro interno. Tente novamente mais tarde!', false)
                res.status(500).json(response.getResponse())
            }
        }
        else{
            const response = new Response(null, 'Preencha todos os campos!', false)
            res.status(400).json(response.getResponse())
        }
    }
    catch (error) {
        console.error(error)
        const response = new Response(null, 'Erro interno. Tente novamente mais tarde!', false)
        res.status(500).json(response.getResponse())
        return
    }
})

app.put('/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const {email, password, key} = req.body
        
        if(key && (email || password)){
            const verificar = await user.getUser(email, password, id)
            
            if(verificar.result){
                const userAtual = await user.getUser(null, null, id)

                const emailSet = email ? email : userAtual.result.email
                const passwordSet = password ? password : userAtual.result.password

                const responseSet = await user.setUser(emailSet, passwordSet, id)

                if(responseSet){
                    const response = new Response(null, 'Usuário atualizado!', responseSet)
                    res.status(200).json(response.getResponse())
                }
                else{
                    const response = new Response(null, 'Erro interno. Tente novamente mais tarde!', responseSet)
                    res.status(500).json(response.getResponse())
                }
            }
            else{
                const response = new Response(null, 'Algo deu errado. Verifique os valores, inclusive o parâmetro!', false)
                res.status(400).json(response.getResponse())
            }
        }
        else{
            const response = new Response(null, 'Preencha todos os campos!', false)
            res.status(400).json(response.getResponse())
        }
    } 
    catch (error) {
        console.error(error)
        const response = new Response(null, 'Erro interno. Tente novamente mais tarde!', false)
        res.status(500).json(response.getResponse())
        return
    }
})

app.delete('/', async(req, res)=>{
    try {
        const {email, password, key} = req.body
    
        if(email && password && key){
            const verificar = await user.getUser(email, password)
            
            if(verificar.result){
                const responseDelete = await user.deleteUser(email, password, key)
                if(responseDelete){
                    const response = new Response(null, 'Usuário deletado com sucesso!', responseDelete)
                    res.status(200).json(response.getResponse())
                }
                else{
                    const response = new Response(null, 'Erro interno. Tente novamente mais tarde!', responseDelete)
                    res.status(500).json(response.getResponse())
                }
            }
            else{
                const response = new Response(null, 'Algo deu errado. Verifique os valores!', false)
                res.status(400).json(response.getResponse())
            }
        }
        else{
            const response = new Response(null, 'Preencha todos os campos!', false)
            res.status(400).json(response.getResponse())
        }
    } 
    catch (error) {
        console.error(error)
        const response = new Response(null, 'Erro interno. Tente novamente mais tarde!', false)
        res.status(500).json(response.getResponse())
        return
    }
})

module.exports = app