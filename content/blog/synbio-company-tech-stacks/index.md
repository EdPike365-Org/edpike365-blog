---
title: "SynBio Company Tech Stacks"
date: "2021-12-27T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - edpike365
  - "Full Stack"
  - DevOps
  - SysOps
---

This info was gathered by me by looking at help wanted postings from these companies and other sources. It is a cross cutting view of what the industry as a whole is using, per company.

The technologies listed here are explored in more depth in my blog post [biotech libraries and languages](/glossary-libraries-languages).

I'll be creating this data in table form at some point.

- [Ginkgo Bioworks](https://www.ginkgobioworks.com/) I maintain a blog post about [Ginkgo DevOps](/company-ginkgo-bioworks) which is more detailed and has more about the company in general.

  - General Stack: Python, SQL, DNA, Postgres, Snowflake, Airflow, AWS DMS, Spark on EMR
  - Data Eng:
    - Data Pipeline: Airflow, Luigi, etc
    - Big Data tools: Snowflake, Hive, Spark
    - AWS cloud: EC2, EMR, RDS, Redshift, S3
    - Python, Java, Scala, etc
    - Linux
  - Syn Bio Eng: Python, NGS
  - Computational Protein Eng: Python, Rosetta, Schrodinger, molecular simulations (MOE), deep learning
  - Computational Biologist: Python/R, bash, bioinformatics tools (samtools/bwa), snakemake/nextflow, SQL, GraphQL, AWS/Google Cloud distributed computing, Docker, git
  - IT: IAM, AD/LDAP, GPO?, Okta SSO, Centrify?, AWS in general
  - Apps:
    - AWS, Docker, Django, REST, GraphQL, React, MySQL, Postgres, Elastic Search, Airflow
    - Python, Javascript, CI/CD, AWS

- [Emerald Cloud Lab](https://www.emeraldcloudlab.com/). FYI Emerald is [building a Cloud Lab at Carnegie Mellon](https://www.cmu.edu/bio/news/2021/0830_cloud-lab-partnership.html).

  - ECL (Emerald's Sybolic Lab Language (SLL written in Wolfram))
  - Infrastructure and Tools Eng:
    - ECL, Go, Python, Bash, Wolfram Language
    - Functional Programming: (e.g. Haskell, F#, Elixir)
    - AWS EKS, Lambda, Fargate
    - AWS Postgres RDS
    - Envoy+Contour, Terraform, Prometheus, Grafana, AlertManager, PagerDuty, SendGrid, Auth0,
    - AWS services: EC2, EKS, RDS, ELB/ALB/NLB, IAM, S3, Certificate Manager, CloudWatch, Route 53, ElastiCache, RDS, SQS, VPC, premises-to-cloud VPN, security groups, CloudFront
    - Linux Sys Admin
  - Web Apps and Devops: React, Next.js?, [Travis CI](https://www.travis-ci.com/)
  - Platform Eng: ECL, Go, AWS: Postgres RDS, S3, EC2, SQS, Docker, Kubernetes

- [Strateos](https://strateos.com/)

  - SCLE (Strateos Common Lab Env)
  - DevOps:
    - OS: Memory Mgr, File Syts
    - OSI networking
    - AWS EC2, VPC, ELB
  - BackEnd:
    - Java, SpringBoot, Scala, EKS
    - Swagger
  - FrontEnd: REST, RabbitMQ (or Kafka), S3, Postgres, Consul?
  - Automated Synth Chemistry
    - Synthetic and anlaysis (LCMS?, NMR?)
    - Automated chemical synthesis platform: ChemSpeed? or Zinsser?

- [Synthego](https://www.synthego.com/)

  - LIMS (Lab Info Mgt System) (aka Synthego's brain)
  - Computational Biologist:
    - Sequencing (Sanger, NGS)
    - BioInformatics: bwa, GATK, Picard, etc.
    - Python, R, MATLAB
  - Data Engineer
    - Python, SQL, Airflow, ETL pipelines, Tableau dashboards
    - AWS ECS, ECR, EC2, SQS. Docker, OLTP/OLAP SQL
    - Python Web apps and ORMs (SQLalchemy, Django ORM)
  - Software Dev (LIMS)
    - Python, Django, React, Redux, gRPC
  - Front End Instrumentation: Mocha, Jest, Linux CLI
    - Python, JS/TS, Node.js, React, Djano, Interest in IOT, Redux
  - Data Eng (other)
    - Python Data (Pandas, Numpy, etc), SQL, AWS
    - Djano REST/ORM, Flask/SQLAlchemy
    - BI tools (Tableau)
    - Workflow mgt: Airflow, Luigi, Prefect

- [Riffyn](https://riffyn.com/) No jobs posted Dec 2021

#### Bio Lab Automation, Software Focused

- [Synthace](https://www.synthace.com/). Boston and London.
  - Full Stack: React, GraphQL
  - App: TS, Go, Postgres, GCP, Kubernetes, GraphQL.
    - Good in at least 1 lang (Go, Java, etc)
    - HA and distributed
- [Radix](https://www.radix.bio/)
  - Eng: Scala, TS (no jobs Dec 2021)

#### Other Companies

- [Mammoth Biosciences](https://mammoth.bio/)
  - BioInformatics: Python, R, SQL, jupyter, pandas, plotting, PCR, qPCR, IVD assay
  - Full Stack:
    - React, Redux, Python, Django, SQL
    - AWS EB, Batch, Lambda, Step funtions, Terraform, Docker
  - Automation Eng:
    - Tecan Freedom Evo or Fluent, Labcyte Echo, SQL
    - MJP/R/SAS, Benchling
- [Twist Biosciences](https://www.twistbioscience.com/)
- [Benchling](https://www.benchling.com/) Lab automation, config, integration
- Thermo Fischer: Invitogen
