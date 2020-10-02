import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index ({ view }: HttpContextContract) {
    const latestPosts = await Post.query()
      .apply(scopes => scopes.published())
      .orderBy('published_at', 'desc')

    return view.render('pages/home', { latestPosts })
  }

  public async show ({ }: HttpContextContract) {
  }

}
