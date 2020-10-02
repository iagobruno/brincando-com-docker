import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import NewCommentValidator from 'App/Validators/NewCommentValidator'

export default class CommentsController {
  public async store ({ request, params, response }: HttpContextContract) {
    const data = await request.validate(NewCommentValidator)

    const post = await Post.findByOrFail('slug', params.slug)

    await post.related('comments').create({
      body: data.comment_body
    })

    return response.redirect().back()
  }
}
