import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { PostStatus } from 'Contracts/enums'

export default class PostsController {
  public async index ({ view }: HttpContextContract) {
    const result = await Post.query()
      .apply(scopes => scopes.isPublished())
      .apply(scopes => scopes.newestFirst())

    const [featuredPost, ...latestPosts] = result

    return view.render('pages/home', {
      latestPosts,
      featuredPost,
    })
  }

  public async show ({ params, view }: HttpContextContract) {
    const post = await Post.query()
      .where('slug', params.slug)
      .andWhere('status', PostStatus.PUBLIC)
      .preload('categories')
      .preload('comments', (query) => {
        query.orderBy('created_at', 'desc')
      })
      .firstOrFail()


    return view.render('pages/post', {
      post,
      showCommentsSection: true
    })
  }

}
