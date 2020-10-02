import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { PageStatus } from 'Contracts/enums'

export default class Page extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: PageStatus

  @column()
  public slug: string

  @column()
  public title: string

  @column()
  public body: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  public publish () {
    this.status = PageStatus.PUBLIC
    return this.save()
  }
}
