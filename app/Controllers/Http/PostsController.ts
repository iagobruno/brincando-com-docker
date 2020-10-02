import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { PostStatus } from 'Contracts/enums'

export default class PostsController {
  public async index () {
    const posts = await Post.query()
      .where('status', PostStatus.PUBLIC)
      .orderBy('published_at', 'desc')

    return posts
  }

  public async show ({ }: HttpContextContract) {
  }

}
