import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PageStatus } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'pages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('status', Object.values(PageStatus)).defaultTo(PageStatus.PRIVATE).notNullable()
      table.string('slug').notNullable().unique().index()
      table.string('title').notNullable()
      table.text('body').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
