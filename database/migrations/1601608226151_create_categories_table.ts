import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { CategoryStatus } from 'Contracts/enums'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'
  protected pivotTableName = 'category_post'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('status', Object.values(CategoryStatus)).defaultTo(CategoryStatus.PRIVATE).notNullable()
      table.string('slug').notNullable().unique().index()
      table.string('title').notNullable()
      table.timestamps(true)
    })

    this.schema.createTable(this.pivotTableName, (table) => {
      table.increments('id')
      table.integer('post_id')
        .unsigned()
        .notNullable()
        .references('id').inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('category_id')
        .unsigned()
        .notNullable()
        .references('id').inTable(this.tableName)
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.pivotTableName)

    this.schema.dropTable(this.tableName)
  }
}
