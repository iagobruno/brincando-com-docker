import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PageFactory, PostFactory } from 'Database/factories'

export default class InitialDatumSeeder extends BaseSeeder {
  public async run () {
    // Empty entire database
    await Database.from('pages').delete()
    await Database.from('posts').delete()
    await Database.from('comments').delete()
    await Database.from('categories').delete()
    await Database.from('category_post').delete()


    await PageFactory
      .merge({
        title: 'Sobre',
        slug: 'sobre',
      })
      .apply('public')
      .create()


    await PostFactory
      .apply('draft')
      .create()
    await PostFactory
      .apply('published')
      .with('comments', 5)
      .with('categories', 2, (cat) => cat.apply('public'))
      .createMany(10)

    await pause(1000)

    await PostFactory
      .apply('published')
      .merge({
        title: 'Hello darkness 🌚',
        slug: 'hello-darkness',
        summary: 'This site has a dark theme!',
        thumbnailUrl: 'https://lh3.googleusercontent.com/zxKVYXJ0X6NIVQNz9XyPI-K1xEok7dtY7kQ72q0t-sqXET7gzl_nr67ybgOMpS6hvzIwEhZ0=w640-h400-e365-rj-sc0x00ffffff',
      })
      .with('comments', 3)
      .with('categories', 1, (cat) => {
        cat.merge({
          title: 'Design',
          slug: 'design',
        })
        cat.apply('public')
      })
      .create()

    await pause(1000)

    await PostFactory
      .apply('private')
      .create()
  }
}


function pause (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
