import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index ({ view }: HttpContextContract) {
    const result = await Post.query()
      .apply(scopes => scopes.published())
      .orderBy('published_at', 'desc')

    const [featuredPost, ...latestPosts] = result

    return view.render('pages/home', {
      latestPosts,
      featuredPost
    })
  }

  public async show ({ }: HttpContextContract) {
  }

}
