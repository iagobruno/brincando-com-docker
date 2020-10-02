import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'


Route.get('/', 'PostsController.index')

Route.get('/health', async () => {
  const { healthy, report } = await HealthCheck.getReport()

  return {
    healthy,
    report
  }
})
