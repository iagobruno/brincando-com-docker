import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Page from 'App/Models/Page'

export default class PagesController {
  public async show ({ params, view }: HttpContextContract) {
    const page = await Page.findByOrFail('slug', params.slug)

    return view.render('pages/post', {
      post: page,
      showCommentsSection: false,
    })
  }
}
