---
title: "SysOps"
date: "2021-08-23T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - DevOps
---

[SysOps vs SRE](#vs) | [Sysops](#sysops) | [SRE](#sre) | [IaC, EaC](#iac) | [Infrastructure](#infrastructure)

- SysOps practices and tooling overlap with DevOps.
- SRE (Site Reliability Engineering) is a subset of SysOps.

### SYSOPS vs SRE <a name="vs"></a>

#### SysOps Overview

- [Architecture Oversight](https://aws.amazon.com/architecture/well-architected/?wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc): Coordinate with product managers and project managers.
- Defining, maintaining "static" infrastructure that cuts across applications and business units.
  - Directory services (like LDAP, AD)
  - Message busses (Kafka)
  - Long living data storage (DBs)
- Providing self-service tools for DevOps so they can cycle entire dev, staging, and prod resources _safely_.
- Performance Efficiency
- Cost optimization

#### SRE Overview

1. Disaster Prevention

- Fault Tolerance: ability for a system to remain in operation even if some of the components used to build the system fail.
- Resilience: ability of a workload to recover from infrastructure or service disruptions, dynamically acquire computing resources to meet demand, and mitigate disruptions, such as misconfigurations or transient network issues.
  - Auto Backups, onsite, offsite
- _Continuous_ Monitoring/Testing for:
  - Business-wide security
    - threat detection
  - Reliability: distributed system design, recovery planning, and adapting to changing requirements
  - Performance emergencies, playbooks
  - Cost overruns emergencies, playbooks
- Security
  - [Zero Trust](https://www.crowdstrike.com/cybersecurity-101/zero-trust-security/)
  - Data encryption in transit, at rest

2. Disaster Recovery

- Backup and Restore: slow, cheap
- Pilot Light
- Warm Standby
- Multi-site active/active: fast, expensive

3. Disaster Testing: Causing real disasters on purpose

- [Principles of Chaos Engineering](https://principlesofchaos.org/)

### SysOps <a name="sysops"></a>

- Monitoring

  - [Prometheus](https://prometheus.io/)
  - [AWS CloudWatch](https://aws.amazon.com/cloudwatch/)
  - [New Relic](https://newrelic.com/)
  - [dynatrace](https://www.dynatrace.com/)
  - [appdynamics](https://www.appdynamics.com/)
  - [DataDog](https://www.datadoghq.com/)
  - [WireShark](https://www.wireshark.org/)

- Logging

  - [splunk](https://www.splunk.com/): log mining.
  - [Elastic Logstash](https://www.elastic.co/logstash/): log storage, transform
  - Elasticsearch: log mining. Distributed, multitenant-capable full-text search engine with an HTTP web interface
    - [OpenSearch](<https://en.wikipedia.org/wiki/OpenSearch_(software)>): Elasticsearch fork.
  - [Loggly](https://www.loggly.com/) log mining
  - [Nagios](https://www.nagios.org/): monitoring, log storage and mining.

- Visualization

  - [Grafana](https://grafana.com/)
  - [Elastic Kibana](https://www.elastic.co/kibana/): [wiki](https://en.wikipedia.org/wiki/Kibana)

- Messaging
  - [pagerduty](https://www.pagerduty.com/)
  - Slack
  - [AWS SNS](https://aws.amazon.com/sns/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc)

### SRE (Site Reliability Engineering) <a name="sre"></a>

- Continuous Automated Testing

  - [AWS Cloud Security](https://aws.amazon.com/security/continuous-monitoring-threat-detection/)
    - Continuous monitoring and Threat Detection
    - AWS Security Hub
    - Amazon GuardDuty
    - [Amazon Macie](https://aws.amazon.com/macie/) S3 PII exposure.
  - Chaos Engineering: actually break things, without warning

    - [Principles of Chaos Engineering](https://principlesofchaos.org/)
    - [Chaos Monkey](https://netflix.github.io/chaosmonkey/) Netflix
    - [Chaos Conf](https://www.chaosconf.io/)
    - [AWS Fault Injections Simumlator (FIS)](https://aws.amazon.com/fis/)
    - [Gremlin](https://www.gremlin.com/)

  - [Load Testing](https://www.blazemeter.com/blog/open-source-load-testing-tools-which-one-should-you-use)

    - [Apache JMeter](https://jmeter.apache.org/) Written in Java.
      - [Blazemeter Plugin](https://www.blazemeter.com/)
    - [Locust](https://locust.io/) Load testing written in Python.
    - [Gatling](https://gatling.io/open-source/)
    - [The Grinder](http://grinder.sourceforge.net/) Java

  - [Pen Testing](https://en.wikipedia.org/wiki/Penetration_test)
    - [Tools](https://en.wikipedia.org/wiki/List_of_security_assessment_tools)

- Network Security
  - [Kerberos](https://web.mit.edu/kerberos/)

### IaC, EaC <a name="iac"></a>

- [Infrastructure as Code (IaC)](https://en.wikipedia.org/wiki/Infrastructure_as_code)
- [Everything as Code (EaC)](https://www.itprotoday.com/development-techniques-and-management/everything-code-what-it-and-why-its-gaining-traction)

- Git Workflow for Ops Infrastructure

  - [GitOps](https://about.gitlab.com/topics/gitops/) = IaC + MRs + CI/CD
    - Declaritive
    - IaC docs
    - Config docs
  - [Argos Workflow](https://argoproj.github.io/argo-workflows/)

- Self Serve Automated Infrastructure For Devs

  - Local Assets for Developers
  - Remote Assets for Developers
  - Integration Testing Assets for CI Build/Test Tools
  - Staging Assets for CD
    - supports QA, Acceptance Testing workflow
  - [AWS Control Tower](https://aws.amazon.com/controltower/?control-blogs.sort-by=item.additionalFields.createdDate&control-blogs.sort-order=desc)
  - [AWS Organizations](https://aws.amazon.com/organizations/)

- Infrastructure Provisioning

  - [TerraForm](https://www.terraform.io/) HashiCorp
  - [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)
  - [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
  - [Pulumi](https://www.pulumi.com/)

- Configuration Mgt.

  - [Ansible](https://www.ansible.com/) Redhat
  - [Chef](https://www.chef.io/) Legacy
  - [Puppet](https://puppet.com/) Legacy
  - [AWS Systems Manager](https://aws.amazon.com/systems-manager/)

### Infrastructure <a name="infrastructure"></a>

- DNS
- Load Balancers
- CDN
- API Mesh

- File Systems, Storage

  - [Kubernetes Storage](https://kubernetes.io/docs/concepts/storage/_print/)
  - Amazon
    - [Amazon Elastic File System (EFS)](https://aws.amazon.com/efs/)
    - [Amazon S3](https://aws.amazon.com/s3/?nc=sn&loc=0): simple object storage service
    - [Amazon Elastic Block Storage (EBS)](https://aws.amazon.com/ebs/)
    - [AWS Storage Gateway](https://aws.amazon.com/storagegateway/?nc=sn&loc=0) Hybrid on prem
    - [AWS Athena](https://aws.amazon.com/athena/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc) Query S3 data.

- Event Buses

  - [Apache Kafka](https://kafka.apache.org/) Distributed event streaming.
  - [AWS EventBridge](https://aws.amazon.com/eventbridge/) Serverless. Between apps.

- Messaging Queues

  - [RabbitMQ](https://www.rabbitmq.com/) message broker
  - [AWS SQS (simple queue service)](https://aws.amazon.com/sqs/)
  - [Apache ActiveMQ](https://activemq.apache.org/) Java based message broker. JS, Python clients.
    - Artemis: next gen

- Data Analytics

  - [Apache Spark](https://spark.apache.org/): stream and batch processing. 3rd gen.
  - [Apache Flink](https://flink.apache.org/): event-driven apps, stream and batch analytics, pipelines, ETL. Newer than Spark. 4th gen. Auto optimize. Many options for state maintenance. Supports replay. Known for "Big Data" and "Stream Processing"
  - [Amazon Kinesis](https://aws.amazon.com/kinesis/) Data streams into storage.
    - [Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/?nc=sn&loc=0)
    - [Kinesis Data Firehose](https://aws.amazon.com/kinesis/data-firehose/?nc=sn&loc=0)
    - [Kinesis Data Analytics](https://aws.amazon.com/kinesis/data-analytics/?nc=sn&loc=0)
    - [Kinesis Video Streams](https://aws.amazon.com/kinesis/video-streams/?nc=sn&loc=0&amazon-kinesis-video-streams-resources-blog.sort-by=item.additionalFields.createdDate&amazon-kinesis-video-streams-resources-blog.sort-order=desc)

- Data Warehouse, Lake

  - [Data Warehouse](https://www.talend.com/resources/what-is-data-warehouse/): structured, filtered data that has already been processed for a specific purpose
  - [Data Lake](https://www.talend.com/resources/what-is-data-lake/): raw data
  - [AWS Redshift](https://aws.amazon.com/redshift/)
  - [Google BigQuery](https://cloud.google.com/bigquery) Serverless cloud data warehouse.
  - [Snowflake](https://www.snowflake.com/)

- Data Routing and ETL

  - [Apache nifi](https://nifi.apache.org/): "Niagra Falls", named by NSA. Known for "ETL" and "Data Integration". DAGs for data routing and ETL. Low code. Web GUI. "Platform"
  - [Apache Camel](https://camel.apache.org/) Java enterprise integration "Framework".
  - [Example Camel plus Kafka plus Nifi](https://raymondmeester.medium.com/using-camel-and-nifi-in-one-solution-c7668fafe451) Java app uses camel to send messages to Kafka. Nifi consumes from Kafka.
  - [AWS Glue](https://aws.amazon.com/glue/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc) serverless data integration.

- Identity Mgt.

  - [LDAP](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol)
    - [Active Directory](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
  - [AWS Cognito](https://aws.amazon.com/cognito/)
  - [Okta](https://www.okta.com/)

- Workflow Mgt., Event Scheduling

  - [Apache Airflow](https://airflow.apache.org/)
    - [Orchestration Framework](https://www.astronomer.io/blog/what-is-data-orchestration)
    - [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph): directed acyclic graphs. Vertices and edges.
    - [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load)
    - ML training
  - [Spring Batch](https://spring.io/projects/spring-batch) processing large volumes of records, including logging/tracing, transaction management, job processing statistics, job restart, skip, and resource management.
  - [Luigi](https://github.com/spotify/luigi) tasks, data pipelines, batch jobs. Written by Spotify. Python.
  - [CloudWatch Events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html)
