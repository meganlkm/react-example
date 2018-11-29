FROM debian:stretch-slim

RUN apt-get update && \
    apt-get install --no-install-recommends --no-install-suggests -y \
        curl software-properties-common gnupg2 procps && \
    curl -sL https://deb.nodesource.com/setup_11.x | bash - && \
    apt-get install --no-install-recommends --no-install-suggests -y nodejs && \
    npm install pm2 -g

COPY ./ /opt/server
WORKDIR /opt/server

RUN npm install

RUN mkdir /opt/uploads && \
    mkdir /opt/downloads && \
    apt-get install --no-install-recommends --no-install-suggests -y python-pip && \
    pip install -r /opt/server/scripts/requirements.pip

EXPOSE 5000

ENTRYPOINT ["/opt/server/entrypoint.sh"]
CMD ["pm2", "logs"]
