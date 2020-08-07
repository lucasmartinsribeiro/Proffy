import Knex from 'knex';

export async function up(knex: Knex) {
 return knex.schema.createTable('class_schedule', table => {
   table.increments('id').primary();
   //de 0 a 6, que representa os dias da semana
   table.integer('week_day').notNullable();
   //a partir de que hora começa a atender
   table.integer('from').notNullable();
   //até que horário
   table.integer('to').notNullable();

   table.integer('class_id')
    .notNullable()
    .references('id')
    .inTable('classes')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
 })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('class_schedule')
}