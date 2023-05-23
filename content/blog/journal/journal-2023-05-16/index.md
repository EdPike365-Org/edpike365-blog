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




## Things I Bought

I have a backburner project to do some CV (computer vision) and general ML on edge/SBC (Single Board Computer). I'll be blogging about adding CV/ML capabilities to RPis, add that and a NVIDIA Jetson Nano to a Kubernetes cluster. Later I'll get a Jetson Xavier.

- 1 x [Jetson Nano Developer Kit](https://developer.nvidia.com/embedded/jetson-nano-developer-kit)

- 2 x [Coral M.2 ML Accelerator with Dual Edge TPU](https://coral.ai/products/m2-accelerator-dual-edgetpu/)
  "Each Edge TPU coprocessor is capable of performing 4 trillion operations per second (4 TOPS), using 2 watts of power. For example, it can execute state-of-the-art mobile vision models such as MobileNet v2 at almost 400 FPS, in a power efficient manner.

  With the two Edge TPUs in this module, you can double the inferences per second (8 TOPS) in several ways, such as by running two models in parallel or pipelining one model across both Edge TPUs."

- 1 x [USB Accelerator](https://coral.ai/products/accelerator)
  The on-board Edge TPU coprocessor is capable of performing 4 trillion operations (tera-operations) per second (TOPS), using 0.5 watts for each TOPS (2 TOPS per watt). For example, it can execute state-of-the-art mobile vision models such as MobileNet v2 at almost 400 FPS, in a power efficient manner.

- 2 x [Raspberry Pi Camera Module 3](https://www.google.com/search?q=raspberry+pi+camera+v3+noir&rlz=1C1RXQR_enUS1024US1024&oq=raspberry+pi+camera+v3+noir&aqs=chrome..69i57j0i22i30l2j0i390i650l4.4996j0j4&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:36743c48,vid:1EIFfln3Kxs,st:0) Bought 1 wide angle, 1 wide angle NOIR (nice pun). I have not had time to check if these are good for feeding my Edge TPUs.

## A Raft of Google Stuff from Google IO

- [Multicloud Private DNS](https://www.youtube.com/playlist?list=PLIivdWyY5sqLSAMruve7x6-107DB9NR7c)
Advanced Networking Series, Google Cloud Tech

- [Create immersive 3D map experiences with Photorealistic 3D Tiles](https://cloud.google.com/blog/products/maps-platform/create-immersive-3d-map-experiences-photorealistic-3d-tiles)

  "Gaming companies can use 3D Tiles to develop a real world model for branded and themed AR experiences. Or they could iterate on ideas for real-world AR experiences using tools like the Geospatial Creator. Powered by ARCore and Google Maps Platform and integrated into Unity and Adobe Aero Geospatial Pre-release, Geospatial Creator lets you load Photorealistic 3D Tiles in the location of your choice to help anchor AR objects to the real-world."

- [Create world-scale augmented reality experiences in minutes with Google’s Geospatial Creator](https://developers.googleblog.com/2023/05/create-world-scale-augmented-reality-experiences-in-minutes-with-google-geospatial-creator.html)

 Geospatial Creator, a tool that helps anyone easily visualize, design, and publish world-anchored immersive content in minutes straight from platforms you already know and love — Unity or Adobe Aero.



### Summary

[Read the docs? We prefer to chat with them (Ep. 568)](https://stackoverflow.blog/2023/05/09/read-the-docs-we-prefer-to-chat-with-them-ep-568/?utm_source=iterable&utm_medium=email&utm_campaign=the-overflow-newsletter)


All of that will combine to bring the [Semantic Web](https://en.wikipedia.org/wiki/Semantic_Web#:~:text=The%20Semantic%20Web%2C%20sometimes%20known,make%20Internet%20data%20machine%2Dreadable.) to a reality, which will in turn accerlerate AI evolution.

[Amazon Omics](
https://www.genomeweb.com/informatics/amazon-omics-beefs-managed-services-pre-built-workflows-gpu-support?utm_source=Sailthru&utm_medium=email&utm_campaign=GWDN%20Wed%20PM%202023-05-17&utm_term=GW%20Daily%20News%20Bulletin#.ZGU83HbMIQ8)
The set of workflows, collectively called Ready2Run, includes pipelines from commercial partners such as Element Biosciences, Nvidia Parabricks, Sentieon, and Google-affiliated DeepMind (specifically, the AlphaFold protein prediction software), as well as open-source applications including the Genome Analysis Toolkit (GATK), ESMFold, and NF-core. The offering also includes pipelines for single-cell RNA sequencing.

Another part of the new Amazon Omics capabilities is the integration of AWS sequence stores with Amazon EventBridge, cloud-based software that lets users move workflow events, such as the creation of new sequences, between AWS services and third-party applications. "You could get a new sequence that you store and then you want to do secondary analysis on it, [so] you can chain all those together based on an event that's emitted from the sequence store," Syed explained.

Amazon Omics also integrates with Amazon SageMaker, a machine learning service platform.

Originally, Amazon Omics customers could only bring their own "private" workflows written in Nextflow and Workflow Description Language (WDL). Based on their feedback, some of these were incorporated into Ready2Run, Syed said.

[Amazon Omics Debuts With Lofty Expectations in Crowded Marketplace](https://www.genomeweb.com/business-news/amazon-omics-debuts-lofty-expectations-crowded-marketplace?utm_source=TrendMD&utm_medium=TrendMD&utm_campaign=0&trendmd-shared=0#.Y44xj4fMI-U)

[Amazon Web Services Aims to Remove Computational 'Heavy Lifting' for Genomics Customers](https://www.genomeweb.com/informatics/amazon-web-services-aims-remove-computational-heavy-lifting-genomics-customers?utm_source=TrendMD&utm_medium=TrendMD&utm_campaign=0&trendmd-shared=0#.YpXoxJNBy3I)

[Agilent to Integrate Genomenon Search Engine, Accelerate Workflows With Nvidia](https://www.genomeweb.com/business-news/agilent-integrate-genomenon-search-engine-accelerate-workflows-nvidia?utm_source=TrendMD&utm_medium=TrendMD&utm_campaign=0&trendmd-shared=0#.Yp-GcqjMJPY)

[Gencove, Element Biosciences Partner to Offer Low-Pass Whole-Genome Sequencing, Analysis](https://www.genomeweb.com/sequencing/gencove-element-biosciences-partner-offer-low-pass-whole-genome-sequencing-analysis?utm_source=TrendMD&utm_medium=TrendMD&utm_campaign=0&trendmd-shared=0#.ZDp1oJllB-E)

[Gencove, Element Biosystems Partner to Offer Low-Pass Whole-Genome Sequencing, Analysis](https://www.genomeweb.com/sequencing/gencove-element-biosystems-partner-offer-low-pass-whole-genome-sequencing-analysis?utm_source=TrendMD&utm_medium=TrendMD&utm_campaign=0&trendmd-shared=0)

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

## Upskilling IT Report 2023 (DevOps Institute)

- IT Organizations are Struggling to Find and Retain Skilled Individuals
and Individuals don’t Have Time for Upskilling Themselves

- [German IT Growth](https://www.ifo.de/en/publications/2023/journal-complete-issue/ifo-konjunkturperspektiven-022023)

## Chapter 1: Process, Framework, Skills

### Top Process Frameworks/Skill Gaps

Ordered by Importance. 
1. DevOps  48/24  (DevSecOps??)
2. Agile* 41/37 !
13. SRE 38/25
6. Value Stream Management (VSM) 36/28 !!
4. Design Thinking/Systems Thinking 31/24
10. Lean 30/10
3. ITIL 30/18
7. Agile at Scale 29/22
DataOps 29/26 !!!
TOGAF?? 28/12
12. Chaos Engineering 27/11
5. Holacracy/Sociocracy 27/16
ModelOps ?? 27/17
11. IT4IT 26/13
9. Products(Platform Engineering) vs Projects
14. Customer Reliability Engineering

Today’s technology trends such as cloud, AI, virtual agents, RPA, and low-code/no-code will be different
tomorrow. Existing technology ecosystems will need to be updated to reduce technical debt, and skills
around hyper scalers, container infrastructure, and Kubernetes orchestration will be essential. The
technical skills required for a given job continue to grow year after year

### Platform Engineering

“Platform engineering is the discipline of designing and building toolchains and workflows that enable self-service capabilitites for software engineering organizations in the cloud-native era. Platform engineers provide an integrated product most often referred to as an “Internal Developer Platform” covering the operational necessities of the entire lifecycle of an application. 
There are 2 key qualities every platform engineer needs to be successful: a product mindset and great communication skills. You have to understand that developers are your customers, the users of the product you ship (the platform) and listen to their needs. You have to be a great communicator, both to ensure developer adoption and get executive buy-in for C-level support.

You also should understand cloud-native technologies like Kubernetes and Terraform or CI/CD workflows, but ultimately, communication and treating your platform as a product are what will set you apart from the rest.”

### SRE

SREs create a bridge between development and IT operations by applying a software engineering mindset to the broad aspects of infrastructure and systems administration domain. It is the third highest priority must-have skill.

### Design Thinking

and/or systems thinking are applied to solve a problem. This topic ranks high in both
priority and gaps. The concept of design thinking is based on a non-linear, iterative process that teams use to understand users, challenge assumptions, redefine problems and create innovative solutions that can be prototyped and tested.

### DataOpos

is the third most critical skills gap today. While DevOps and DevSecOps enable teams to
continuously integrate and deploy applications, these innovations have not been matched by efforts to
create value from the growing volume, variety, and velocity of big data. Unfortunately, organizations have
struggled to operationalize big data in the same way that DevOps has improved code deployment.

### ModelOps

helps to support your organization`s Artificial Intelligence (AI) journey. AI is one of the top musthave technology skills and organizations are applying AI within IT and across the business. A related practice
is that of ModelOps. It enables data scientists and IT professionals to collaborate and communicate effectively while automating machine learning and AI models. We expect this area to grow both in priority and in the size of existing skill gaps.

### Value Stream Management (VSM)

gets your teams obsessed with the value they add. Another challenge to overcome is the skills gap seen in VSM, which is the sixth largest gap on average. DevOps principles create higher-performing organizations, but understanding what is improving requires thinking and working as value streams, which means getting teams obsessed with the value their work creates for the customer and being able to measure how their experiments are accelerating that flow to be realized in the hands of the customer.

## Chapter 2: Technical Skills

Must-have skills vs Skill Gaps

Container Orhcestration 54/26 !!
Sec and Cybersec (IAM...) 50/12
Cloud Compute Platform 48/33 !
Modern Architecture 47/22
App Tech 43/25 !!!
DBs 42/21
UI/Web/Middle Tier Services 41/9
OSs 40/8
Programming Language Polyglot 40/21
Mobile 39/9
AI and ML 39/14
UX Design 39/11
Storage 38/12
Specific Frameworks 36/23
SocioTechnical Systems Engineering 35/6
Legacy Non-cloud 34/14
VR/AR 33/8
Mainframe 33/12

## Ch 3: Automation Skills

## Ch 4: Human Skills

## Ch 5: Leadership Skills

## Ch 6: Conclusions

To 10 Job Titles Hired or Recruited
- DevOps Engineer 29%
- Software Engineer 26%
- Automation Architect 22%
- Design Thinking 22%
- Value Stream Mgt Lead 21%
- Infrastructure Eng 21%
- Data Scientist 20%
- Product Mgr or Product Owner 20%
- Full Stack Eng 19%
- Sys Admin 18%

![tech skills 2023](./skill.png)





