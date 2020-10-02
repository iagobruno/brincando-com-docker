import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index () {
    const posts = await Post.query()
      .apply(scopes => scopes.published())
      .orderBy('published_at', 'desc')

    return posts
  }

  public async show ({ }: HttpContextContract) {
  }

}
