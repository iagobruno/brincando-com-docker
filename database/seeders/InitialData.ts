import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PostFactory } from 'Database/factories'

export default class InitialDatumSeeder extends BaseSeeder {
  public async run () {
    // Empty entire database
    await Database.from('posts').delete()

    await PostFactory
      .apply('published')
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
      .create()
  }
}


function wait (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
