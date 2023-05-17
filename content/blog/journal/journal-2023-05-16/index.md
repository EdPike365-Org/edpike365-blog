---
title: "Journal: Ending 2022-01-21"
date: "2022-01-21T22:12:03.284Z"
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

### My Goals in 2022

#### Strategic

1. Work as a consultant and be able to offer the following services:

- Modernize legacy Java web apps
  - The market is not sexy but its large.
  - From "lift and shift" to re-architect and refactor.
  - From monolith to microservices.
  - Migrate state to a seperate datastore to facilitate horizontal scaling.
  - Implement vanilla, MPA web client or SPA.
  - Upgrade to latest Java LTS (17) and native compilation
- Offer pub/sub integration to increase performance and resilience.
- Containerized, vendor neutral, serverless APIs
- Introduce or enhance DevOps Infrastructure, and custom DevOps tools if needed.
  - Turnkey CI/CD: Integrated with existing client infrastructure or de novo.
    - Migrate from classic Jenkins to [Jenkins Files](https://www.jenkins.io/doc/book/pipeline/jenkinsfile/)
    - Automated load and security testing during dev
  - Converting IT/Ops to IaC
    - Create on prem Kubernetes cluster to leverage existing data center
    - Containerize everything (migrate from pet servers on VMs to generic containerized versions with state and data somewhere else)
    - IaC build scripts for dev, staging, prod
      - for n clusters, nodes
    - Create cloud vendor clusters.
- Improve App and API integrated security
  - Federated auth, AD integration.
  - Move secrets to secret repos and secret services (same for configs)

1. Earn Kubernetes certs (I've already bought them and they must be used)

#### Tactical

I will be learning and demonstrating the following things to support strategic goals. It will be a very busy year as I run to get back on this fast moving train.

Front End

- App Frameworks
  - Maintain: GatsbyJS, React
  - Improve: Next.js, Redux
  - Explore: SvelteKit, Angular 2, [Remix](https://remix.run/)
  - Skip: Vue/Nuxt, React Native, Flutter, Ruby, Android, Swift
- SSO: Okta, AuthO
- API Consumption: GraphQL and gRPC
- Master SPA and webworkers
- Master Typescript and auto testing

Back End

- Serverless APIs
  - Use cloud neutral, kubernetes native, OpenFaaS serveless framework and OCI containers.
    - [Knative (Google)](https://knative.dev/docs/)
  - Improve Java startup speed, resource usage by moving to [GraalVM Native](https://developer.okta.com/blog/2021/06/18/native-java-framework-comparison):
    - [**Quarkus**](https://quarkus.io/): [GraalVM Native option](https://quarkus.io/guides/building-native-image)
    - [Micronaut](https://micronaut.io/): [GraalVM Native option](https://docs.micronaut.io/latest/guide/index.html#graal)
    - [Spring Boot](https://spring.io/projects/spring-boot): [Spring Native Beta (GraalVM option)](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/)
  - [OpenAPI](https://www.openapis.org/) compliance
  - [GraphQL](https://graphql.org/) where appropriate
- Create a reference NodeJS API with auto testing. [Koa](https://nestjs.com/) or [NestJS](https://koajs.com/)

DevOps

- Enable more self serve capacity creation and management:
  - Multi Cluster (vs Namespaces): [vcluster](https://www.vcluster.com/) virtual clusters that provide more isolation than namespaces (though they in fact live in a namespace)
  - [Gitpod](https://www.gitpod.io/)
- Enable multicloud packaging and deployment: [KubeVela](https://kubevela.io/)
- Offer transition away from Docker, Docker Desktop. [Rancher Desktop](https://rancherdesktop.io/)
- Master [TerraForm](https://www.terraform.io/)
- Master [Jenkinsfile](https://www.jenkins.io/doc/book/pipeline/jenkinsfile/).
- Security scanning build plugin: [Probley](https://www.jenkins.io/doc/book/pipeline/jenkinsfile/)

SysOps

- Logging: [Grafana Loki](https://grafana.com/oss/loki/)
- Monitoring: [Prometheus](https://prometheus.io/)
- Visualization: [Grafana Dashboards](https://grafana.com/grafana/dashboards/)
- Health Monitoring: [Kuberhealthy](https://github.com/kuberhealthy/kuberhealthy)
- Troubleshooting: [Komodor](https://komodor.com/)
- Cluster Mgt GUI: [Rancher Kubernetes Dashboard](https://rancher.com/docs/k3s/latest/en/installation/kube-dashboard/)

- Create [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) and Config service reference. I'm still trying to nail this down:

  - Argo CD
    - [Bitnami Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) Current Top Choice
      - [How To Store Kubernetes Secrets in Git Repos](https://www.youtube.com/watch?v=xd2QoV6GJlc)
    - [Helm Secrets](https://github.com/jkroepke/helm-secrets)
  - [Kubernetes ConfigMap and Secret as Kubernetes Volumes](https://www.youtube.com/watch?v=FAnQTgr04mU)

  - [External Secrets Operator (was GoDaddy)](https://github.com/external-secrets/external-secrets). Backends:
    - [Hashicorp Vault](https://external-secrets.io/provider-hashicorp-vault/) Stable. [Vault](https://www.vaultproject.io/)
    - [GCP SM](https://external-secrets.io/provider-google-secrets-manager/) Stable
    - [ASM (Amazon Secrets Manager)](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) beta
  - [Fabric8 Config](https://fabric8.io/guide/develop/configuration.html)?

Containers

- Build Container Images on Kubernetes: [Shipwright](https://shipwright.io/) using [Kaniko](https://github.com/GoogleContainerTools/kaniko) (Shipwright requires Tekton)
- Know how to deploy Kubernetes, including serverless function containers, to [GKE](https://cloud.google.com/kubernetes-engine), [AWS EKS](https://aws.amazon.com/eks/), [Azure AKS](https://azure.microsoft.com/en-us/services/kubernetes-service/#overview).
- Self Service API: [CrossPlane](https://crossplane.io/)

### My Goals in 2023

- Offer HA Multi Cluster architecture
  - Beyond Dev, Staging and Prod clusters
- Offer migration from vendor specific solutions to vendor neutral Kubernetes options.
- Master GoLang
  - Be able to migrate Java apps to GoLang
  - Be able to create cloud native apps (Kubernetes is written in Go)
  - Be able to offer de novo API's
- Master DevSecOps
  - Automated Pentesting
- IOT DevOps
  - On prem equipment
  - Biology Cloud Lab Automation
- Master Python
  - Be able to migrate POC ML jobs to scalable production apps
- MLOps
  - TensorFlow, Keras
  - Data/Feature Engineering Pipelines
  - NGS (Next Generation Sequencer) data pipelines (very large files).
- Explore Rust
- Get more Cloud Vendor certs

### Log (LIFO)

### Articles

### Books

### Events

### Companies, Orgs

### People

### Training

### Definitions, Acronyms

### Future Research

Things I ran across and thought "Oh yeah, I need to look into that sometime, but not now."
