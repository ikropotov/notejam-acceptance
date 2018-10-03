FROM ubuntu:bionic

# Install node.js
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get -y install sudo && \
    apt-get install -y nodejs npm

COPY . /app
WORKDIR /app

# Install application dependencies
RUN npm install -g mocha && \
    npm install

# Set mocha test runner as entrypoint
ENTRYPOINT ["mocha"]
