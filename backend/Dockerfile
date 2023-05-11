FROM node:18.12.1-alpine
RUN npm i -g npm
RUN mkdir -p /src/app/
COPY ./package.json ./package-lock.json /src/app/
WORKDIR src/app/
RUN npm i --production
COPY ./ /src/app

CMD ["npm", "start"]