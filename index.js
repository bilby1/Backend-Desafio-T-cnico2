const express = require('express')
const uuid = require('uuid')

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())


const users = []

const getCurrentDate = () => new Date().toISOString();

app.get('/users', (request, response) => {


    return response.json(users)
})


app.post('/users', (request, response) => {

    const { nome, email, senha, telefones, data_criacao, data_atualizacao, ultimo_login, token } = request.body

    //const user = { id:uuid.v4(),nome, email, senha, telefones}
    const user = {
        id: uuid.v4(),
        nome,
        email,
        senha,
        telefones,
        data_criacao: getCurrentDate(),
        data_atualizacao: getCurrentDate(),
        ultimo_login: getCurrentDate(),
    }

    const index = users.findIndex(user => user.email === email)

    if (index == 0) {
        return response.status(404).json({ mensagem: "E-mail já existente" })
    }


    users.push(user)

    return response.status(201).json({
        id: user.id,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao,
        ultimo_login: user.ultimo_login,
    })


    //return response.status(201).json(user)
})


app.post('/auth', (request, response) => {

    const { nome, email, senha, telefones, data_criacao, data_atualizacao, ultimo_login, token } = request.body

    const user = {
        id: uuid.v4(),
        nome,
        email,
        senha,
        telefones,
        data_criacao: getCurrentDate(),
        data_atualizacao: getCurrentDate(),
        ultimo_login: getCurrentDate(),
    }

    //const index = users.findIndex(user => user.email === email)

    const index = users.findIndex(user => user.email === email)

    // if (!index || user.senha !== senha) {
        // return response.status(401).json({ mensagem: "Usuário e/ou senha inválidos" })
    // }

    if (index === -1 || users[index].senha !== senha) {
        return response.status(401).json({ mensagem: "Usuário e/ou senha inválidos" })
    }

    users.push(user)

    return response.status(200).json({
        id: user.id,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao,
        ultimo_login: user.ultimo_login,
    })
})


app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { nome, email, senha, telefones } = request.body

    const updatedUser = { id, nome, email, senha, telefones }

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ menssagem: "Usuario não encontrado" })
    }

    users[index] = updatedUser


    return response.json(updatedUser)
})



app.listen(port, () => {
    console.log(`Server started on port ${port}`)

})