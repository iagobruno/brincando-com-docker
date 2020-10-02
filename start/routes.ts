import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'


Route.get('/', 'PostsController.index').as('home-page')
Route.get('/topic/:slug', 'CategoriesController.show').as('category-page')

Route.get('/health', async () => {
  const { healthy, report } = await HealthCheck.getReport()

  return {
    healthy,
    report
  }
})
