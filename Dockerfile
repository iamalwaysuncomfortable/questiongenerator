#Step 1.
FROM node:11.4.0 as build-deps

#Step 2
LABEL version="0.1"
LABEL description="Question Generator"
LABEL maintainer "Mike Turner <superuser@hashsignals.com>"

#Step 3.
RUN mkdir -p /usr/src/qgen
WORKDIR /usr/src/qgen

#Step 4.
COPY package.json /usr/src/qgen
COPY yarn.lock /usr/src/qgen

#Step 5. (set to develop because this is not the container we'll run in.  We're just building in the container.)
ENV NODE_ENV develop

RUN cd /usr/src/qgen
RUN yarn install --frozen-lockfile

#Step 8
COPY .babelrc /usr/src/qgen
COPY src /usr/src/qgen/src
COPY public /usr/src/qgen/public


RUN yarn build

#Step 19
FROM nginx:1.14.2
COPY --from=build-deps /usr/src/qgen/build /usr/share/nginx/html
COPY --from=build-deps /usr/src/qgen/src/default.conf /etc/nginx/conf.d

#Step 10
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
