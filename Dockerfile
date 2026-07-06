FROM node:24.11-alpine3.22

#ARG JWT_SECRET
WORKDIR /app

COPY package.json yar.lock ./

#  si on est en npm : RUN npm ci
RUN yarn install --production --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]