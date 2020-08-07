import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());

//para fazer o express entender o json, estou falando para o app, introduza o pacote/plugin express.json()
app.use(express.json());

app.use(routes);

//localhost:3333
app.listen(3333);


/*
get: buscar ou lista uma informação
post: criar alguma nova informação
put: atualizar uma informção existente
delete: deletar uma informaçõa existente
*/

//Corpo (Request Body): Dados para criação ou atualização de um registro
//Route Params: Identificar qual recurso eu quero atualizar ou deletar 
//Query Params: Paginação, filtros, ordenação

// //metodo get
// app.get('/users', (request, response) => {
//     const users = [
//         { name: 'Lucas', age: 22},
//         { name: 'Diego', age: 25},
//     ]

//     return response.json(users)
// })

// //metodo post
// app.post('/users', (request, response) => {
//     console.log(request.body)

//     const users = [
//         { name: 'Lucas', age: 22},
//         { name: 'Diego', age: 25},
//     ]

//     return response.json(users)
// })

// Route Params usando o metodo delete
//os dois pontos é para falar que é um parâmetro
// app.delete('/users/:id', (request, response) => {
//     console.log(request.params)

//     const users = [
//         { name: 'Lucas', age: 22},
//         { name: 'Diego', age: 25},
//     ]

//     return response.json(users)
// })

// Query Params usando o metodo get
// app.get('/users', (request, response) => {
//     console.log(request.query)

//     const users = [
//         { name: 'Lucas', age: 22},
//         { name: 'Diego', age: 25},
//     ]

//     return response.json(users)
// })