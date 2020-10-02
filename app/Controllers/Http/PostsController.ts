import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index ({ view }: HttpContextContract) {
    const result = await Post.query()
      .apply(scopes => scopes.published())
      .orderBy('published_at', 'desc')
    const [featuredPost, ...latestPosts] = result

    const publicCategories = await Category.getPublicCategories()

    return view.render('pages/home', {
      latestPosts,
      featuredPost,
      publicCategories
    })
  }

  public async show ({ }: HttpContextContract) {
  }

}
