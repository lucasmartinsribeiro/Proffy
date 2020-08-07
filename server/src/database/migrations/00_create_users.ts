import Knex from 'knex';

//método up, crio e altero relazições no banco de dados
export async function up(knex: Knex) {
 return knex.schema.createTable('users', table => {
   table.increments('id').primary();
   table.string('name').notNullable();
   table.string('avatar').notNullable();
   table.string('whatsapp').notNullable();
   table.string('bio').notNullable();
 })
}

//método down, voltar aquela alteraçõa do campo e remover aquela tabela que eu criei
export async function down(knex: Knex) {
  return knex.schema.dropTable('users')
}