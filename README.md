# adonis5-blog

Um simples blog feito com Adonis 5.

## Getting Started

```bash
git clone https://github.com/iagobruno/adonis5-blog.git
cd adonis5-blog
yarn install
copy .env.example .env
node ace build
node ace generate:key
node ace migration:run
node ace db:seed
node ace serve --watch
```

Open http://localhost:3333/ in the browser.
