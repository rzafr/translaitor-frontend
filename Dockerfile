FROM node:18.20.2 as build-step
RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
COPY ./ /usr/local/app
RUN npm install -g @angular/cli@16.2.0
RUN npm install
RUN npm run build --prod

FROM nginx:1.23.1
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-step /usr/local/app/dist/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["ng", "serve", "--host", "0.0.0.0", "--proxy-config", "src/proxy.conf.json"]

# docker build -t frontend:1.0 .
# docker image list
