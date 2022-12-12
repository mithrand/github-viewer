FROM node:18-alpine AS builder

COPY . .

RUN npm install
RUN npm run build

FROM node:18-alpine

WORKDIR /github-viewer

ENV NODE_ENV='production'

RUN npm install serve --global

COPY --from=builder ./build ./build

CMD ["serve", "build"]