const conn = require('../connection/conn')
const { v4: uuidv4 } = require('uuid')
//const bcrypt = require('bcrypt')

class User{
    createUser(email, password, key){
        return new Promise((resolve, reject) =>{
            //const hashPassword = bcrypt.hashSync(password, 10)
            const sql = 'INSERT INTO cadastro (id_user, email, password, `key`) VALUES (?,?,?,?)'
            conn.query(sql, [uuidv4(), email, password, key], (err)=>{
                if(err){
                    console.error(err)
                    return reject(false)
                }
                return resolve(true)
            })
        }).catch (error => {
            console.error(error)
            return false
        })
    }

    getUser(email, password, id){
        return new Promise((resolve, reject)=>{
            if(id){
                const sql = 'SELECT * FROM cadastro WHERE id_user = ?'
                conn.query(sql, [id], (err, result)=>{
                    if(err){
                        console.error(err)
                        return reject(false)
                    }

                    return resolve({result: result[0], response: true})
                })
            }
            else{
                const sql = 'SELECT * FROM cadastro WHERE email = ? AND password = ?'
                conn.query(sql, [email, password], (err, result)=>{
                    if(err){
                        console.error(err)
                        return reject(false)
                    }

                    return resolve({result: result[0], response: true})
                })
            }
        }).catch(error =>{
            console.error(error)
            return false
        })
    }

    setUser(email, password, id){
        return new Promise((resolve, reject)=>{
            const sql = 'UPDATE cadastro SET email = ?, password = ? WHERE id_user = ?'
            conn.query(sql, [email, password, id], (err, result)=>{
                if(err){
                    console.error(err)
                    return reject(false)
                }

                return resolve(true)
            })
        }).catch(error => {
            console.error(error)
            return false
        })
    }

    deleteUser(email, password, key){
        return new Promise((resolve, reject)=>{
            const sql = 'DELETE FROM cadastro WHERE email = ? AND password = ? AND `key` = ?'
            conn.query(sql, [email, password, key], (err)=>{
                if(err){
                    console.error(err)
                    return reject(false)
                }
                return resolve(true)
            })
        })
        .catch (error => {
            console.error(error)
            return false
        })
    }
}

module.exports = User