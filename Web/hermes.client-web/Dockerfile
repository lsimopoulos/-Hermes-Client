# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build
RUN apk update && \
    apk add --update openssl && \     
    openssl genrsa -des3 -passout pass:"GuwyTUzzDDh3UCaCmuLk" -out localhost.pass.key 4096 && \
    openssl rsa -passin pass:"GuwyTUzzDDh3UCaCmuLk" -in localhost.pass.key -out localhost.key && \
    rm localhost.pass.key && \
    openssl req -new -key localhost.key -out localhost.csr \
        -subj "/C=SE/ST=SomeCity/L=SomeState/O=Hermes/CN=localhost.local" && \
    openssl x509 -req -days 36500 -in localhost.csr -signkey localhost.key -out localhost.crt 

# final stage
FROM nginx:stable-alpine as final-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/localhost.crt /etc/letsencrypt/live/localhost/localhost.crt
COPY --from=build-stage /app/localhost.key /etc/letsencrypt/live/localhost/localhost.key
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]