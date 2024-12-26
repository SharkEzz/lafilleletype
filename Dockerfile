FROM node:22-alpine
WORKDIR /app

COPY . .

RUN npm i -g pnpm && pnpm i && pnpm build && pnpm seed

EXPOSE 3000

ENV PORT=3000

CMD ["pnpm", "start"]
