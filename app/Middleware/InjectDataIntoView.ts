import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class InjectDataIntoView {
  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    // @ts-ignore
    ctx.request.publicCategories = await Category.getPublicCategories()

    await next()
  }
}
