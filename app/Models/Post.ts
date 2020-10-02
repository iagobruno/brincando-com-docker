import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { PostStatus } from 'Contracts/enums'

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
}
