FROM node:18-alpine3.16

RUN apk add --update ffmpeg && \
    apk add --no-cache file && \
    apk --update add imagemagick

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
