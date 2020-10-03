import { DateTime } from 'luxon'
import { BaseModel, column, computed, HasMany, hasMany, ManyToMany, manyToMany, scope } from '@ioc:Adonis/Lucid/Orm'
import { PostStatus } from 'Contracts/enums'
import Category from 'App/Models/Category'
import Comment from 'App/Models/Comment'
import Route from '@ioc:Adonis/Core/Route'

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
  public thumbnailUrl?: string

  @column()
  public summary?: string

  @column()
  public receiveComments: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public publishedAt?: DateTime

  @computed()
  public get url () {
    return Route.makeUrl('post-page', { slug: this.slug })
  }

  public get hasThumbnail () {
    return typeof this.thumbnailUrl !== 'undefined'
  }

  public get formatedPublishedAt () {
    return this.publishedAt?.toFormat("EEEE, dd 'de' MMMM 'de' yyyy 'às' HH:mm")
  }

  public publish () {
    this.status = PostStatus.PUBLIC
    this.publishedAt = DateTime.local()
    return this.save()
  }

  public static feed () {
    return this.query()
      .where('status', PostStatus.PUBLIC)
      .orderBy('published_at', 'desc')
  }

  public static isPublished = scope((query) => {
    query.where('status', PostStatus.PUBLIC)
  })
  public static latest = scope((query) => {
    query.orderBy('published_at', 'desc')
  })

  @manyToMany(() => Category)
  public categories: ManyToMany<typeof Category>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>
}
