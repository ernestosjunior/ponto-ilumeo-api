FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN apt-get -qy update && apt-get -qy install openssl

RUN yarn --prod

RUN npx prisma generate --schema ./prisma/schema.prisma

COPY . .

RUN yarn build

EXPOSE 3333

CMD ["/bin/bash","/app/entrypoint.sh"]














