ARG NODEJS_VERSION=12
FROM node:$NODEJS_VERSION-alpine

ARG CORE_VERSION
ARG REGISTRY_URL
ARG REGISTRY_AUTH_TOKEN

ENV NODE_ENV=production

RUN apk --no-cache upgrade && \
    apk --no-cache add --virtual build-dependencies alpine-sdk autoconf automake libtool linux-headers python

RUN addgroup -g 1100 valois && \
    adduser -h /home/valois -s /bin/bash -u 1100 -G valois -D valois

COPY coldstart.sh /home/valois/

USER valois
WORKDIR /home/valois

RUN if [ -n "$REGISTRY_URL" ]; then \
      echo -e "registry=$REGISTRY_URL/\n${REGISTRY_URL#*:}/:_authToken=$REGISTRY_AUTH_TOKEN" >/home/valois/.npmrc; \
    fi
RUN npm install valois-core@$CORE_VERSION && \
    rm -f /home/valois/.npmrc

USER root
RUN apk --no-cache del build-dependencies

USER valois
RUN mkdir /home/valois/.valois
VOLUME ["/home/valois/.valois"]

ENTRYPOINT ["/home/valois/node_modules/.bin/valois-core", "start", "--enable-http-api-plugin", "--api-ws"]
CMD ["--network", "mainnet"]
