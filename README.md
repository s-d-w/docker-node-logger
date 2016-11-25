## A logging service built with Docker Compose, Node/Express, Elasticsearch, and HAProxy

##### Usage

Just clone and issue docker-compose up --build
Runs on port 80 by default

##### Endpoints:
GET localhost/logs  (optional localhost/logs?q=someterm&page=somepage&amount=someAmount  where q is a search term)
POST localhost/logs - use curl or any method to post any arbitrary JSON payload

Features:
* hot reloading of local code edits using nodemon
* persistence of Elasticsearch data outside the container
* can scale up the app service (Node). i.e to add 2 instances issue docker-compose scale 3 (HAProxy automatically detects and adds to its load balancer pool)
* keyword searching: add ?q=someterm to endpoint GET /logs
* pagination: add ?page=somepage&amount=someAmount to endpoint GET /logs  (both pagination and keyword searching can be combined)