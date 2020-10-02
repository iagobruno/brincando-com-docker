import Factory from '@ioc:Adonis/Lucid/Factory'
import Post from 'App/Models/Post'
import { PostStatus } from 'Contracts/enums'
import { DateTime } from 'luxon'

export const PostFactory = Factory.define(Post, ({ faker }) => ({
  status: PostStatus.DRAFT,
  slug: faker.lorem.slug(),
  title: faker.lorem.sentence(6),
  body: faker.lorem.paragraphs(5),
  summary: faker.lorem.sentence(20),
  thumbnailUrl: faker.image.image(),

}))
  .state('draft', (post) => post.status = PostStatus.DRAFT)
  .state('private', (post) => post.status = PostStatus.PRIVATE)
  .state('published', (post) => {
    post.status = PostStatus.PUBLIC
    post.publishedAt = DateTime.utc()
  })
  .build()
