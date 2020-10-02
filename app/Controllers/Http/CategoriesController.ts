import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async show ({ params, view }: HttpContextContract) {
    const category = await Category.findByOrFail('slug', params.slug)
    await category.preload('posts')

    const publicCategories = await Category.getPublicCategories()

    return view.render('pages/category', {
      category,
      publicCategories
    })
  }
}
