import Knex from 'knex';

export async function up(knex: Knex) {
 return knex.schema.createTable('classes', table => {
   table.increments('id').primary();
   table.string('subject').notNullable();
   table.decimal('cost').notNullable();

   table.integer('user_id')
    .notNullable()
    .references('id')
    .inTable('users')
    //CASCADE: deleta ou atualiza tudo de forma automática
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
 })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('classes')
}