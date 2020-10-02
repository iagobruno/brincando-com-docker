import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PostStatus } from 'Contracts/enums'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('status', Object.values(PostStatus)).defaultTo(PostStatus.DRAFT).notNullable()
      table.string('slug').notNullable().unique().index()
      table.string('title').notNullable()
      table.text('body').notNullable()
      table.string('thumbnail_url').nullable()
      table.string('summary').nullable()
      table.timestamps(true)
      table.timestamp('published_at').nullable().defaultTo(null)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
