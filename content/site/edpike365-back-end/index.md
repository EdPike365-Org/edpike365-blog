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

[Web Servers](#web-servers) | [App Servers](#app-servers) | [APIs](#apis) | [Databases](#databases) [Auth Services](#auth-services)

<!-- excerpt-end -->

### Web Servers

- [NGINX](https://www.nginx.com/) Asynch, non-blocking. Kubernetes Ingress fame. Owned by F5.
- [Apache HTTPD](https://httpd.apache.org/) Honored ancestor. Preinstalled on CentOS, Ubuntu. Uses `.htaccess` files.

### Load Balancers

- [NGINX](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
- [HAProxy](http://www.haproxy.org/)
- [AWS Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/)

### App Servers

#### Java

- [Tomcat](https://tomcat.apache.org/), Tomcat Embedded
- [Jetty](https://www.eclipse.org/jetty/)
- [Spring Boot](https://spring.io/)
- [Dropwizard](https://github.com/dropwizard/dropwizard) Embedded Jetty, [Google Guava](https://github.com/google/guava), Hibernate
- [JHipster](https://www.jhipster.tech/) App generator: Spring Boot plus AngualarJS (sadly).

#### Python

- [DJango](https://www.djangoproject.com/) CMS, large projects
- [Flask](https://flask.palletsprojects.com/en/2.0.x/) No asynch.

#### GoLang

- [Hugo](https://gohugo.io/) GoLang
- [Gin](https://gin-gonic.com/) Identical syntax to Django.
- [Beego](https://github.com/beego/beego) Similar to Django, MVC, ORM
- Others: [Echo](https://echo.labstack.com/), [Kit](https://gokit.io/), [Fiber](https://docs.gofiber.io/), [Iris](https://www.iris-go.com/), [Go-zero](https://go-zero.dev/), [Kratos](https://go-kratos.dev/en/)

#### NodeJS

- [Express](https://expressjs.com/) MVC
- [Fastify](https://www.fastify.io/) 4x faster than Express
- [Koa](https://koajs.com/)
- [tRPC](https://trpc.io/) TS RPCs, new, growing
- [SvelteKit](https://kit.svelte.dev/) data fetching API, GraphQL
- [Nest](https://nestjs.com/)
- [Remix Server](https://remix.run/) Can run in Deno, Cloudflare Workers
- [Strapi](https://strapi.io/) headless CMS and API REST server.

#### Other

- [WordPress](https://wordpress.com/) PHP
- [Laravel](https://laravel.com/) PHP

### APIs

- [OpenAPI](https://swagger.io/specification/) was Swagger API definition
- REST
  - [Express.js](https://expressjs.com/) NodeJS
  - [FastAPI](https://fastapi.tiangolo.com/) Async. Highest performing Python.
  - [Spring Boot](https://spring.io/projects/spring-boot) JAX-RS (rest easy?) REST.
    - [Eclipse Jersey (JAX-RS)](https://eclipse-ee4j.github.io/jersey/)
- GraphQL
  - [Apollo](https://www.apollographql.com/)
  - [GraphiQL IDE](https://github.com/graphql/graphiql)

### Serverless

#### Kubernetes

- [Kubeless](https://kubeless.io/) Lambda compatible
- [Knative](https://knative.dev/docs/) Dev by Google, IBM, RedHat, vmware. Uses [CloudEvents](https://cloudevents.io/). Needs BIG cluster.

#### Cloud

- [AWS Lambda](https://aws.amazon.com/lambda/)
  - [Serverless Framework](serverless.com)
- [GCP Firebase Cloud Functions](https://firebase.google.com/firebase-and-gcp)
- [Azure Serverless](https://azure.microsoft.com/en-us/solutions/serverless/)
- [AWS Fargate](https://aws.amazon.com/fargate/) Serverless for containers.
- [Netlify Functions](https://www.netlify.com/products/functions/)

#### Other

- [AWS Outposts Lambda](https://aws.amazon.com/blogs/compute/running-aws-lambda-functions-on-aws-outposts-using-aws-iot-greengrass/)

### Databases

- NoSQL

  - [MongoDB](https://www.mongodb.com/) OG NoSQL. Multicloud option.
  - [AWS DynamoDB](https://aws.amazon.com/dynamodb/) NoSQL. Key-value. Serverless.
  - [Apache Cassandra](https://cassandra.apache.org/_/index.html) NoSQL. Distributed. Fault tolerant. Elastic.

- In Memory

  - [Redis](https://redis.io/) Cache, message broker. Lua scripting. See also AWS Elasticache.
  - [Memcached](https://memcached.org/) key-value. Aimpler than Redis.
  - [AWS Elasticache](https://aws.amazon.com/elasticache/?p=ft&c=db&z=3) Managed Redis or Memcached. [Which?](https://aws.amazon.com/elasticache/redis-vs-memcached/)

- Headless CMS
  - [Contentful](https://www.contentful.com/)
  - [Sanity.io](https://www.sanity.io/)
  - [Strapi](https://strapi.io/)

- RDMS

  - [PostgresSQL](https://www.postgresql.org/) I pick this over MySQL/Maria because the license is cleaner. PostgresSQL 9.3 and higher has a NoSQL option.
  - [MS SQLServer](https://www.microsoft.com/en-us/sql-server/sql-server-2019) RDMS. I've used this over the years at various jobs. See also Azure SQL.
  - [Oracle](https://www.oracle.com/database/) RDMS. I used this at Reed College. I wrote a PLSQL stored procedure. You can also write them in Java. Powerful but super expensive, largely legacy.
  - [AWS Aurora](https://aws.amazon.com/rds/aurora) RDMS. MySQL and PostgresSQL compatible. Oracle killer.
  - [SQLite](https://www.sqlite.org/index.html): embedded in web client or IOT devices. PostgresSQL syntax.

- Graph DBs
  - [Graph DBs and the Semantic Web](https://graphdb.ontotext.com/documentation/9.11/enterprise/introduction-to-semantic-web.html)
  - [Neo4J](https://neo4j.com/)
  - [AWS Neptune](https://aws.amazon.com/neptune/)
  - [GrapahDB](https://graphdb.ontotext.com/documentation/9.11/enterprise/index.html)

- Object Storage and Warehouse
  - [AWS S3 with Athena](https://aws.amazon.com/athena/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc)
  - [AWS S3 with Select](https://docs.aws.amazon.com/AmazonS3/latest/API/API_SelectObjectContent.html)
  - [AWS Redshift](https://aws.amazon.com/redshift/?p=ft&c=db&z=3)
  - [GCP BigQuery](https://cloud.google.com/bigquery)

### Auth Services

- [Okta](https://www.okta.com/)
- [Auth0](https://auth0.com/) Bought by Okta.
- [GCP Firebase](https://firebase.google.com/)
- [AWS Cognito](https://aws.amazon.com/cognito/)
- [SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) An option in many of the above services.
