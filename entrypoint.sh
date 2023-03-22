#!/bin/sh

npx prisma migrate deploy

yarn start
