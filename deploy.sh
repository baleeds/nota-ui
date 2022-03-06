#!/bin/sh

export REACT_APP_API_URL=https://api.biblenota.com/graphql
yarn build
scp -r ./build nota@67.205.165.157:/home/nota/www
