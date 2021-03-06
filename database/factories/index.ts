import Factory from '@ioc:Adonis/Lucid/Factory'
import Category from 'App/Models/Category'
import Comment from 'App/Models/Comment'
import Page from 'App/Models/Page'
import Post from 'App/Models/Post'
import { CategoryStatus, PageStatus, PostStatus } from 'Contracts/enums'
import { DateTime } from 'luxon'


export const PostFactory = Factory.define(Post, ({ faker }) => ({
  status: PostStatus.DRAFT,
  slug: faker.lorem.slug(),
  title: faker.lorem.sentence(6),
  body: faker.lorem.paragraphs(5),
  summary: faker.lorem.sentence(20),
  thumbnailUrl: faker.image.image(),
  receiveComments: true
}))
  .state('draft', (post) => post.status = PostStatus.DRAFT)
  .state('private', (post) => post.status = PostStatus.PRIVATE)
  .state('published', (post) => {
    post.status = PostStatus.PUBLIC
    post.publishedAt = DateTime.local()
  })
  .relation('comments', () => CommentFactory)
  .relation('categories', () => CategoryFactory)
  .build()


export const CategoryFactory = Factory.define(Category, ({ faker }) => ({
  status: CategoryStatus.PRIVATE,
  title: faker.lorem.words(2),
  slug: faker.lorem.slug(2),
}))
  .state('public', (cat) => cat.status = CategoryStatus.PUBLIC)
  .state('private', (cat) => cat.status = CategoryStatus.PRIVATE)
  .relation('posts', () => PostFactory)
  .build()


export const CommentFactory = Factory.define(Comment, ({ faker }) => ({
  body: faker.lorem.paragraph(),
}))
  .relation('post', () => PostFactory)
  .build()


export const PageFactory = Factory.define(Page, ({ faker }) => ({
  status: PageStatus.PRIVATE,
  slug: faker.lorem.slug(4),
  title: faker.lorem.words(4),
  body: faker.lorem.paragraphs(8),
}))
  .state('public', (page) => page.status = PageStatus.PUBLIC)
  .state('private', (page) => page.status = PageStatus.PRIVATE)
  .build()
