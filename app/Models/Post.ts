import { DateTime } from 'luxon'
import { BaseModel, column, computed, HasMany, hasMany, ManyToMany, manyToMany, scope } from '@ioc:Adonis/Lucid/Orm'
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

  @computed()
  public get url () {
    return `/post/${this.slug}`
  }

  public publish () {
    this.status = PostStatus.PUBLIC
    this.publishedAt = DateTime.local()
    return this.save()
  }

  public static isPublished = scope((query) => {
    query.where('status', PostStatus.PUBLIC)
  })
  public static newestFirst = scope((query) => {
    query.orderBy('published_at', 'desc')
  })

  public static feed () {
    return this.query()
      .where('status', PostStatus.PUBLIC)
      .orderBy('published_at', 'desc')
  }


  @manyToMany(() => Category)
  public categories: ManyToMany<typeof Category>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>
}
