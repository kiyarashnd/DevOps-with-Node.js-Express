FROM node:20
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node","index.js"]
