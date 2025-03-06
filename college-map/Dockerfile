FROM mariadb:latest

ENV MYSQL_ROOT_PASSWORD=rootpass
ENV MYSQL_DATABASE=college_map
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=collegepass

COPY src/db/schema.sql /docker-entrypoint-initdb.d/01-schema.sql
COPY src/db/data.sql /docker-entrypoint-initdb.d/02-data.sql

EXPOSE 3306