#!/bin/bash

cd /app
npm install
while ! curl -s http://elasticsearch:9200 > /dev/null; 
do 
    echo "Waiting for Elasticsearch to come up.."
    sleep 5;
done;
echo "Connected to Elasticsearch."
nodemon -L /app/app.js