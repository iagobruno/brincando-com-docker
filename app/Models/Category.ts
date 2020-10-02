import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { CategoryStatus } from 'Contracts/enums'
import Post from 'App/Models/Post'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: CategoryStatus

  @column()
  public slug: string

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @manyToMany(() => Post)
  public posts: ManyToMany<typeof Post>


  public static getPublicCategories () {
    return this.query()
      .where('status', CategoryStatus.PUBLIC)
      .orderBy('created_at', 'desc')
  }
}
