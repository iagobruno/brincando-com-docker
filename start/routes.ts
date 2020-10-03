import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/health', async () => {
  const report = await HealthCheck.getReport()
  return report
})

Route.group(() => {
  Route.get('/', 'PostsController.index').as('home-page')

  Route.get('/topic/:slug', 'CategoriesController.show').as('category-page')

  Route.get('/post/:slug', 'PostsController.show').as('post-page')
  Route.post('/post/:slug/comments', 'CommentsController.store')

  Route.get('/:slug', 'PagesController.show')
})
  .middleware('injectDataIntoView')
