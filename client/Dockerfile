FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app

COPY ./ /app/

RUN npm install && npm run build

FROM nginx:1.15

RUN rm /etc/nginx/nginx.conf && \
    rm /etc/nginx/conf.d/default.conf

COPY config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build/ /usr/share/nginx/html
