import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CategoryStatus } from 'Contracts/enums'
import { PostFactory } from 'Database/factories'

export default class InitialDatumSeeder extends BaseSeeder {
  public async run () {
    // Empty entire database
    await Database.from('posts').delete()
    await Database.from('comments').delete()
    await Database.from('categories').delete()
    await Database.from('category_post').delete()


    await PostFactory
      .apply('draft')
      .create()
    await PostFactory
      .apply('published')
      .with('comments', 5)
      .createMany(10)

    await wait(1000)

    await PostFactory
      .merge({
        title: 'Hello darkness 🌚',
        slug: 'hello-darkness',
        summary: 'This site has a dark theme!',
        thumbnailUrl: 'https://lh3.googleusercontent.com/zxKVYXJ0X6NIVQNz9XyPI-K1xEok7dtY7kQ72q0t-sqXET7gzl_nr67ybgOMpS6hvzIwEhZ0=w640-h400-e365-rj-sc0x00ffffff',
      })
      .apply('published')
      .with('comments', 3)
      .create()
      .then(post =>
        post.related('categories').create({
          title: 'Design',
          slug: 'design',
          status: CategoryStatus.PUBLIC,
        })
      )
  }
}


function wait (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
