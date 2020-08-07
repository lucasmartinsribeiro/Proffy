import knex from 'knex'
import path from 'path'

//migrations - controlam a versão do banco de dados

const db = knex ({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    //usar o conteúdo nulo quando ele não conseguir definir  
    //qual que é conteúdo padrão de um campo no banco dedados
    useNullAsDefault: true, 
})

export default db