import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany, scope } from '@ioc:Adonis/Lucid/Orm'
import { PostStatus } from 'Contracts/enums'
import Category from 'App/Models/Category'
import Comment from 'App/Models/Comment'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: PostStatus

  @column()
  public slug: string

  @column()
  public title: string

  @column()
  public body: string

  @column()
  public thumbnailUrl: string

  @column()
  public summary: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public publishedAt: DateTime


  public static published = scope((query) => {
    query.where('status', PostStatus.PUBLIC)
  })


  @manyToMany(() => Category)
  public categories: ManyToMany<typeof Category>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>
}
