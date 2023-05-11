FROM node:18.12.1-alpine as builder
ARG api_url
ENV REACT_APP_API_URL=${api_url}
RUN npm i -g npm
RUN mkdir -p /src/app/
COPY ./package.json ./package-lock.json /src/app/
WORKDIR src/app/
RUN npm i
COPY ./ /src/app
RUN npm run build

FROM nginx:alpine
COPY --from=builder /src/app/build /usr/share/nginx/html
#COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

