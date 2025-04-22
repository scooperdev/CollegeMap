#!/bin/bash

# Stop and remove existing container if it already exists
docker stop college-map-db 2>/dev/null
docker rm college-map-db 2>/dev/null

# build the docker image
echo "Building Docker image..."
docker build -t college-map-db .

# Run the container
echo "Starting MariaDB container..."
docker run -d \
  --name college-map-db \
  -p 3307:3306 \
  college-map-db

# give mariadb time to initialize, adjust sleep if getting errors
echo "Waiting for MariaDB to start..."
sleep 10

# connect to mariadb
echo "Connecting to MariaDB shell..."
docker exec -it college-map-db mariadb -u user -pcollegepass college_map

# do docker stop college-map-db when done, it will not do it on its own when exiting mariadb