# adonis5-blog

Um simples blog feito com Adonis 5. Forked from [iagobruno/adonis5-blog](https://github.com/iagobruno/adonis5-blog).

## Getting Started

```bash
> git clone https://github.com/iagobruno/brincando-com-docker.git
> cd brincando-com-docker
> copy .env.example .env # And edit the values
> docker-compose up -d --build
```

Open http://localhost:3333/ in the browser.

## Seeding database

Run the following command to populate the database with fake data.

> Run `docker ps -a` to get the <container_id>.

```bash
> docker exec -it <container_id> node ace db:seed
```
