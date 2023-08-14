---
title: "Journal: Ending 2023-08-12"
date: "2023-08-12T22:12:03.284Z"
status: draft
author: EdPike365
tags:
  - edpike365
  - DevOps
  - "Full Stack"
  - SRE
  - SynBio
---

[Log](#log-lifo) | [Articles](#articles) | [Books](#books) | [Events](#events) | [Companies/Orgs](#companies-orgs) | [People](#people) | [Training/Classes](#training) | [Definitions](#definitions-acronyms) | [Future Research](#future-research)

---

### Summary

Caught up with Medium feed summer vacation. You'll notice a lack of full stack web app stuff and a ton of devops stuff. I'll loop back around to the full stack stuff once I get my DevOps/SRE demo ready.

### Log (FILO)

### Articles

- [Apache Druid: overview, running in Kubernetes and monitoring with Prometheus](https://itnext.io/apache-druid-overview-running-in-kubernetes-and-monitoring-with-prometheus-4c8d29f6c8b9): Apache Druid is a distributed, cloud native columnar database focused on working with large amounts of data, combining the features and benefits  of Time-Series Database, Data Warehouse, and search engine. Useful for real-time ingestion, fast queries, and hight uptime. Common use cases: clickstream analytics, risk and fraud analysis, and server metrics storage.

- [An Intro to GitHub Actions + Terraform + AWS](https://medium.com/swlh/lets-do-devops-github-actions-terraform-aws-77ef6078e4f2). Secrets stored in GitHub Actions.

- [Terraform: planning a new project with Dev/Prod environments](https://itnext.io/terraform-planning-a-new-project-with-dev-prod-environments-2724ebd08ba9). [Terraform Best Practices](https://www.terraform-best-practices.com/).

- [Building a Multi-Region Kubernetes Worker Nodes Cluster with Tailscale VPN](https://faun.pub/building-a-multi-region-kubernetes-worker-nodes-cluster-with-tailscale-vpn-646f6767bda6). Spoiler: Tailscale is a VPN mesh built on WireGuard, encrypted. [Free tier](https://tailscale.com/pricing/) is 3 users and 100 devices. I'm really interest in multi region and hybrid on prem DNS routing and failover for intranet apps.

- [DevOps in Argo Rollouts — Blue-green Deployment](https://blog.devgenius.io/devops-in-argo-rollouts-blue-green-deployment-f24084534213):  Argo Rollouts automates the process of creating and managing blue-green replica sets and performing the cutover from the previous to the new version.

- [Securing your CI/CD by Removing Long-Lived Passwords: an OIDC Tutorial (AWS OIDC, HashiCorp Vault)](https://medium.com/4th-coffee/securing-your-ci-cd-by-removing-long-lived-passwords-an-oidc-tutorial-e4f53f271c1d): 
  - Best Practice #1: No Long-Lived Credentials
  - Best Practice #2: Don’t Store Secrets in CI/CD Systems
  - Best Practice #3: Rotate/Refresh Your Passwords (Background task: I'm looking for a painless way to hit a button and have all my passwords rolled over)
  - Consider using OpenID Connect (OIDC)
    - OIDC allows us to use short-lived tokens instead of long-lived passwords, following our best practice #1 mentioned earlier.

    - If integrated with CI, we can configure our CI to request short-lived access tokens and use that to access other systems (of course, other systems need to support OIDC on their end).

- [3 Oreilly SRE books of interest](https://sre.google/books/) hosted on Boogle Books. Manning doesn't seem to have any at the high level. I should read these.

- Prometheus now has OpenTelemetry (OTLP). Prometheus custom format/semantics were not the same as OTLP. Now there is an ingestion endpoint for OTLP metrics. [Whats new in Prometheus](https://www.youtube.com/watch?v=Vui4EgveUxg)
  - turn on the `otlp-write-receiver` to enable
  - metrics are sent to `/otlp/v1/metrics` endpoint

- Learned about Kubernetes image cacheing with [Harbor](https://goharbor.io/docs/2.1.0/administration/configure-proxy-cache/), a recently graduated CNCF project. It's a "pull through" proxy cache.

- CNCF [KEDA](https://www.cncf.io/projects/keda/) can watch an event bus like Kafka, etc, and scale a pod based on rules.

- [EtLT](https://blog.devgenius.io/elt-is-dead-and-etlt-will-be-the-end-of-modern-data-processing-architecture-154b87c1cce0) supplanted ETL because of the need to feed AI training. Learned of the existence of [Apache DolphinScheduler](https://dolphinscheduler.apache.org/en-us) visual workflow orchestration tool for big data. Also [Apache SeaTunnel](https://seatunnel.apache.org/) (formerly Waterdrop) for EtLT.

  E(xtract) — Extraction: EtLT supports traditional on-premises databases, files, and software as well as emerging cloud databases, SaaS software APIs, and serverless data sources. It can perform real-time CDC on database binlog and real-time stream processing (e.g., Kafka Streaming) and also handle bulk data reading (multi-threaded partition reading, rate limiting, etc.).

  t(ransform) — Normalization: In addition to ETL and ELT, EtLT introduces a small “t,” focusing on data normalization. It rapidly converts complex and heterogeneous extracted data sources into structured data that can be readily loaded into the target data storage. It deals with real-time CDC by splitting, filtering, and changing field formats, supporting both batch and real-time distribution to the final Load stage.
  
  L(oad) — Loading: The loading stage is no longer just about data loading but also involves adapting data source structures and content to suit the target data destination (Data Target). It should handle data structure changes (Schema Evolution) in the source and support efficient loading methods such as Bulk Load, SaaS loading (Reverse ETL), and JDBC loading. EtLT ensures support for real-time data and data structure changes, along with fast batch data loading.
  
  (T)ransform — Conversion: In cloud data warehouses, on-premises data warehouses, or new data federations, business logic is processed. This is typically achieved using SQL, either in real-time or batch mode, to transform complex business rules accurately and quickly into data usable by business or AI applications.

### Books

### Events

### Companies, Orgs

### People

### Training

### Definitions, Acronyms

### Future Research

Things I ran across and thought "Oh yeah, I need to look into that sometime, but not now."
