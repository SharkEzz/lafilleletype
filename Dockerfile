FROM node:22-alpine
WORKDIR /app

COPY . .

RUN echo "DB_FILE_NAME=file:local.db" > .env

RUN npm i -g pnpm && pnpm i && pnpm seed && pnpm build

EXPOSE 3000

ENV PORT=3000

CMD ["pnpm", "start"]
