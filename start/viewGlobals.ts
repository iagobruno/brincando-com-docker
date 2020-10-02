import View from '@ioc:Adonis/Core/View'
import marked from 'marked'

View.global('markdown', (content) => {
  return marked(content)
})
