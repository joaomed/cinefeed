import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateCountries extends BaseSchema {
  protected tableName = 'countries'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('gentilico').notNullable()
      table.string('nome_pais').notNullable()
      table.string('nome_pais_int').notNullable()
      table.string('sigla').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
