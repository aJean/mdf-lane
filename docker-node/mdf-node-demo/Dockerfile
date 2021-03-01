# nginx + node
#FROM registry.cn-hangzhou.aliyuncs.com/medlinker/node-base:qy
FROM qynode
LABEL maintainer="qy"

WORKDIR /www/app

COPY package.json yarn.lock ./
RUN yarn install --registry=https://registry.npm.taobao.org

COPY src ./src
RUN yarn build

COPY dockerfiles/start.sh /bin/
RUN chmod +x /bin/start.sh

COPY dockerfiles/app.conf .

EXPOSE 80 9000

STOPSIGNAL SIGQUIT

ENTRYPOINT ["start.sh"]
