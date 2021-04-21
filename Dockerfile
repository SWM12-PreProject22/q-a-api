FROM node:14

RUN mkdir -p /server

WORKDIR /server

ADD ./ /server

RUN yarn install; \
    yarn run build

EXPOSE 7777

CMD [ "yarn", "run", "on"]