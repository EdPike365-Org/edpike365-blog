---
title: "Back End Tech"
date: "2021-08-23T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - "App Servers"
  - API
  - Auth
  - Databases
---

<a name="web"></a>
[Web Servers](#web) | [App Servers](#appservers) | [APIs](#apis) | [Databases](#dbs) [Auth Services](#auth)

### Web Servers

- [NGINX](https://www.nginx.com/) Also: Kubernetes Ingress fame. Asynch non-blocking.
- [Apache HTTPD](https://httpd.apache.org/) Honored ancestor. Preinstalled on CentOS, Ubuntu. Good for shared envs by using `.htaccess` files.
- [HAProxy](http://www.haproxy.org/)
- [AWS Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/)

### App Servers <a name="appservers"></a>

- [Tomcat](https://tomcat.apache.org/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/) Python. No asynch.
  - [DJango](https://www.djangoproject.com/)
- [Hugo](https://gohugo.io/) GoLang
- [WordPress](https://wordpress.com/) PHP
- [Laravel](https://laravel.com/) PHP

### APIs <a name="apis"></a>

- [Swagger]() API definition
- OpenAPI
- REST
  - [Express.js](https://expressjs.com/) NodeJS
  - [FastAPI](https://fastapi.tiangolo.com/) Async. Highest performing Python.
  - [Spring Boot](https://spring.io/projects/spring-boot) JAX-RS (rest easy?) REST.
    - [Eclipse Jersey (JAX-RS)](https://eclipse-ee4j.github.io/jersey/)
- GraphQL
  - [Apollo](https://www.apollographql.com/)
  - [GraphiQL IDE](https://github.com/graphql/graphiql)
- API Gateways
  - [AWS API Gateway](https://aws.amazon.com/api-gateway/)
  - [GCP Apigee](https://cloud.google.com/apigee)
- Serverless
  - [AWS Lambda](https://aws.amazon.com/lambda/)
  - [GCP Firebase Cloud Functions](https://firebase.google.com/firebase-and-gcp)
- Service Mesh
  - [Istio](https://istio.io/)

### Databases <a name="dbs"></a>

- NoSQL

  - [MongoDB](https://www.mongodb.com/) OG NoSQL. Multicloud option.
  - [AWS DynamoDB](https://aws.amazon.com/dynamodb/) NoSQL. Key-value. Serverless.
  - [Apache Cassandra](https://cassandra.apache.org/_/index.html) NoSQL. Distributed. Fault tolerant. Elastic.

- In Memory

  - [Redis](https://redis.io/) Cache, message broker. Lua scripting. See also AWS Elasticache.
  - [Memcached](https://memcached.org/) key-value. Aimpler than Redis.
  - [AWS Elasticache](https://aws.amazon.com/elasticache/?p=ft&c=db&z=3) Managed Redis or Memcached. [Which?](https://aws.amazon.com/elasticache/redis-vs-memcached/)

- RDMS

  - [PostgresSQL](https://www.postgresql.org/) I pick this over MySQL/Maria because the license is cleaner. PostgresSQL 9.3 and higher has a NoSQL option.
  - [MS SQLServer](https://www.microsoft.com/en-us/sql-server/sql-server-2019) RDMS. I've used this over the years at various jobs. See also Azure SQL.
  - [Oracle](https://www.oracle.com/database/) RDMS. I used this at Reed College. I wrote a PLSQL stored procedure. You can also write them in Java. Powerful but super expensive, largely legacy.
  - [AWS Aurora](https://aws.amazon.com/rds/aurora) RDMS. MySQL and PostgresSQL compatible. Oracle killer.
  - [SQLite](https://www.sqlite.org/index.html): embedded in web client or IOT devices. PostgresSQL syntax.

- Graph DBs

  - [Neo4J](https://neo4j.com/)
  - [AWS Neptune](https://aws.amazon.com/neptune/)

- Object Storage and Warehouse
  - [AWS S3 with Athena](https://aws.amazon.com/athena/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc)
  - [AWS S3 with Select](https://docs.aws.amazon.com/AmazonS3/latest/API/API_SelectObjectContent.html)
  - [AWS Redshift](https://aws.amazon.com/redshift/?p=ft&c=db&z=3)
  - [GCP BigQuery](https://cloud.google.com/bigquery)

### Auth Services <a name="auth"></a>

- [Okta](https://www.okta.com/)
- [Auth0](https://auth0.com/) Bought by Okta.
- [AWS Cognito](https://aws.amazon.com/cognito/)
- [GCP Firebase](https://firebase.google.com/)
- [LDAP](https://ldap.com/)
- [MS Active Directory](https://azure.microsoft.com/en-us/services/active-directory/)
- [Google Cloud Directory Sync](https://tools.google.com/dlpage/dirsync/)
