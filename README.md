# adonis5-blog

Um simples blog feito com Adonis 5.

## Getting Started

```bash
> git clone https://github.com/iagobruno/adonis5-blog.git
> cd adonis5-blog
> yarn install
> copy .env.example .env # And edit the values
> node ace build
> node ace generate:key # And copy the value to the APP_KEY field in the .env file
> node ace migration:run
> node ace db:seed # (optional) If you want to populate the database with fake data.
> node ace serve --watch
```

Open http://localhost:3333/ in the browser.
