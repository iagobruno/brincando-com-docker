#!/bin/sh
node ace build
# node ace migration:rollback --batch 0
node ace migration:run
# node ace db:seed
node ace serve --watch
