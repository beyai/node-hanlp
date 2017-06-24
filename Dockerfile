FROM node:7.9.0
MAINTAINER Hain Wang <hailiang.hl.wang@gmail.com>

RUN apt-get update
RUN apt-get install openjdk-7-jdk -yy

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN /bin/bash -c "mkdir -p /hanlp-api"
COPY . /hanlp-api
WORKDIR /hanlp-api
RUN cnpm install

ENTRYPOINT ["node"]
CMD ["app.js"]

EXPOSE 3001