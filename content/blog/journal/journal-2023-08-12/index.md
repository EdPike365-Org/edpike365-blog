---
title: 'Journal: Ending 2023-08-12'
date: '2023-08-12T22:12:03.284Z'
status: draft
author: EdPike365
tags:
  - edpike365
  - DevOps
  - 'Full Stack'
  - SRE
  - SynBio
---

[Log](#log-lifo) | [Articles](#articles) | [Books](#books) | [Events](#events) | [Companies/Orgs](#companies-orgs) | [People](#people) | [Training/Classes](#training) | [Definitions](#definitions-acronyms) | [Future Research](#future-research)

---

### Summary

Caught up with Medium feed summer vacation. You'll notice a lack of full stack web app stuff and a ton of devops stuff. I'll loop back around to the full stack stuff once I get my DevOps/SRE demo ready.

### Log

- [How enterprises are using open source LLMs: 16 examples](https://venturebeat.com/ai/how-enterprises-are-using-open-source-llms-16-examples/?utm_source=VentureBeat&utm_campaign=d5e91cc2f1-EMAIL_CAMPAIGN_2024_01_31_12_35&utm_medium=email&utm_term=0_-d5e91cc2f1-%5BLIST_EMAIL_ID%5D&mc_cid=d5e91cc2f1&mc_eid=f18606673c) Large (closed) public models by themselves have "little to no value" for enterprise.
- https://www.youtube.com/watch?v=Vw1r2uoU_Fc
- https://github.com/jcubic/jquery.terminal
- https://js.cytoscape.org/
- https://stackshare.io/posts/top-developer-tools-2023
- https://www.youtube.com/playlist?list=PLIivdWyY5sqKUJ2gF6fh-ur2ApYGgUmac
- [Ferret: Refer and Ground Anything Anywhere at Any Granularity](https://github.com/apple/ml-ferret?utm_source=substack&utm_medium=email)
- [New technique can accelerate language models by 300x](https://venturebeat.com/ai/new-technique-can-accelerate-language-models-by-300x/?utm_source=substack&utm_medium=email)
- [Introducing Stable LM 2 1.6B](https://stability.ai/news/introducing-stable-lm-2?utm_source=substack&utm_medium=email)
- [microsoft phi-2](https://huggingface.co/microsoft/phi-2?utm_source=substack&utm_medium=email) 2.7B, as good as < 13B other models.
- [The complete guide to LLM compression](https://bdtechtalks.com/2023/09/18/what-is-llm-compression/?utm_source=substack&utm_medium=email) SparseGPT one-shot pruning. LoRAPrune, combines low-rank adaptation (LoRA) with pruning to enhance the performance of LLMs on downstream tasks. LoRA is a parameter-efficient fine-tuning (PEFT). LLM-Pruner structured pruning. MiniLLM knowledge distilallation. Quantization: QAFT, QLoRA, PEQA, PTQ (post-training quantization)
- [The complete guide to LLM fine-tuning](https://bdtechtalks.com/2023/07/10/llm-fine-tuning/?utm_source=substack&utm_medium=email)
- [Gemini Embeddings Guide](https://ai.google.dev/docs/embeddings_guide?utm_source=email&utm_medium=newsletter&utm_campaign=tensorflow-jan24) converts text into numerical vectors
- [Advancements in machine learning for machine learning](https://blog.research.google/2023/12/advancements-in-machine-learning-for.html?utm_source=email&utm_medium=newsletter&utm_campaign=tensorflow-jan24)
- [Stack File](https://github.com/marketplace/stack-file) GitHub app that builds a stack file in your repo.
- [Going on the road with Vanlife, built around PC gaming and real-life exploration](https://blogs.windows.com/windowsexperience/2023/12/13/vanlife-pc-gaming-asus-rog/?ocid=mti_jan24_txt)
- [Cloud Cost Optimization Is Hard, Java Can Help](https://www.azul.com/blog/cloud-cost-optimization-is-hard/?utm_medium=email&utm_campaign=20240130-ES-January-Newsletter&utm_source=marketo&utm_content=&utm_term=&mkt_tok=MDU1LVdZVS0zMDgAAAGQ_2_M-8zQuQjl_mTbxqU8TLSaDCYOOg5CUGzWkbJgPAT1NkjRumIFPqdQIeUiRFVNTDWTdKPYQV3fhCOzFJThny7y-WqMLfXY-_WtJCi7) Azul Falcon JIT compiler
- [The New CSS Color Format You Didn't Know You Needed; OKLCH()](https://dev.to/greenteaisgreat/the-new-css-color-format-you-didnt-know-you-needed-oklch-10hf) lch vs hsl. lch() produces color that appears identical no matter what screen its on.
- [Defer and other reasons to try Angular again](https://www.learnwithjason.dev/defer-and-other-reasons-to-try-angular-again?ck_subscriber_id=1387554412&utm_source=convertkit&utm_medium=email&utm_campaign=The+funniest+4+Web+Devs+episode+yet%20-%2012946656)
- [Qwik + Astro perf on perf on perf](https://www.learnwithjason.dev/qwik-astro-perf-on-perf-on-perf?ck_subscriber_id=1387554412&utm_source=convertkit&utm_medium=email&utm_campaign=The+funniest+4+Web+Devs+episode+yet%20-%2012946656)

- Terraform is going essentially closed source and I'm learning about OpenTF, by the same folks who wrote Terragrunt, etc. Getting Java flashbacks. Was going to do a Pulumi dive anyway but moving that up. Was also planning closer look for Crossplane but that lives inside of Kubernetes and I need something outside _and_ vendor neutral.

- I think I'll implement this tutorial [Jenkins pipeline with Argo CD and Kubernetes](https://medium.com/@maheshbiradar8887/jenkins-pipeline-with-argo-cd-and-kubernetes-84e9f943cf13).

- Apparently immutable Linux distros is a growing thing, which makes sense from a security point of view but also from a debugging aspect. I'm thinking like Functional programming but for the OS level of your app stack.

- Need to find out more about [NixOS](https://nixos.org/). Why? See immutable Linux distros.

- Istio added an Ambient Mesh which gets rid of istio sidecars.

  - ztunnels handle secure overlay traffic, in simple terms, it’s Layer 3 and Layer 4 traffic.
  - Waypoint proxies bring in capabilities to the application layer (L7 processing).

- Argo Workflows 3.5 released.

- Need to ty [Podman](https://podman.io/) container engine by RedHat.

  - daemonless (uses fork-exec model, so its only a process, 1 per container?)
  - rootless (or rooted if you container needs it)
  - modular design allows Podman to use individual system components only when needed.
  - uses [Buildah](https://buildah.io/) to build images
  - no "swarm" support
  - podman-compose?

- Need to deep dive GitLab with focus on its claimed "DevSecOps" support.

- Need to compare Portainer with Podman, GitLab, etc.

- [Fireside Chat: Scott Johnston and Kelsey Hightower](https://www.youtube.com/watch?v=WUSpcgNWWqc) From Docker Inc. Thinking deeply about containers. Docker extensions. Docker Desktop for Linux exists.

- eBPF: [Kernel Recipes 2022 - The untold story of BPF](https://www.youtube.com/watch?v=DAvZH13725I)

- extended Berkely Packet Filter (eBPF): [Dynamically program the kernel for efficient networking, observability, tracing, and security](https://ebpf.io/). [What is eBPF?](https://ebpf.io/what-is-ebpf/). I learned about it while studying for my CKS test. Now its popping up all over (like Rust).

> By allowing to run sandboxed programs within the operating system, application developers can run eBPF programs to add additional capabilities to the operating system at runtime. The operating system then guarantees safety and execution efficiency as if natively compiled with the aid of a Just-In-Time (JIT) compiler and verification engine.
> The Just-in-Time (JIT) compilation step translates the generic bytecode of the program into the machine specific instruction set to optimize execution speed of the program. This makes eBPF programs run as efficiently as natively compiled kernel code or as code loaded as a kernel module.

- Linux commands hotlist:
  - cpu: cat /proc/version, /proc/cpuinfo, uptime
  - cron jobs
  - OS: cat /etc/lsb-release
  - swap: swapon -s, /proc/sys/vm/swappiness, sysctl vm.swappiness
  - systemd

### Articles

Most of the articles I read ad hoc are on Medium and I usually only add them to [my lists there](https://medium.com/@edpike365/lists), not here.

- [Micro Frontends](https://micro-frontends.org/)

- [TypeScript and React: Enforcing Props for Accessibility](https://dev.to/nickytonline/typescript-and-react-enforcing-props-for-accessibility-2h49)

- [VentureBeat: From Angies List ot Keychain CPG](https://venturebeat.com/data-infrastructure/former-angi-ceo-launches-new-startup-keychain-to-revolutionize-consumer-goods-manufacturing/?utm_source=VentureBeat&utm_campaign=199c86de69-EMAIL_CAMPAIGN_2023_11_15_12_45&utm_medium=email&utm_term=0_-199c86de69-%5BLIST_EMAIL_ID%5D&mc_cid=199c86de69&mc_eid=f18606673c)

- [Hashicorp Packer](https://medium.com/@seifeddinerajhi/packer-machine-image-as-code-for-immutable-infrastructure-68788600f97d) Host/cloud vendor agnostic, immutable infrastructure. Plays ell with Chef or Puppet.

  "Because Packer creates identical images for multiple platforms, you can run production in AWS, staging/QA in a private cloud like OpenStack, and development in desktop virtualization solutions such as VMware or VirtualBox. Each environment is running an identical machine image, giving ultimate portability."

- [DevOpsCon: The Busy Platform Engineers Guide to API Gateways](https://speakerdeck.com/danielbryantuk/devopscon-the-busy-platform-engineers-guide-to-api-gateways)

- [GitOpsCon, AppDeveloperCon, ArgoCon, BackstageCon](https://events.linuxfoundation.org/about/calendar/?_sft_lfevent-category=kubecon-cloudnativecon-cncf-events) Are things.

- [KubeVirt](https://kubevirt.io/) Building a virtualization API for Kubernetes. KubeVirt technology addresses the needs of development teams that have adopted or want to adopt Kubernetes but possess existing Virtual Machine-based workloads that cannot be easily containerized. More specifically, the technology provides a unified development platform where developers can build, modify, and deploy applications residing in both Application Containers as well as Virtual Machines in a common, shared environment.

- [Crossplane](https://www.crossplane.io/) The cloud native control plane framework

- [Matt Butcher, Fermyon and Justin Cormack, Docker | KubeCon CloudNativeCon EU 2023](https://www.youtube.com/watch?v=5D3V-m2IetY)

- [Prometheus: The Documentary](https://www.youtube.com/watch?v=rT4fJNbfe14) Same folks that did the K8s doc.

- [Amabassador Telepresence](https://www.getambassador.io/products/telepresence) Dev collaboration on remote K8s

- [Envoy Documentary](https://envoyprojectdocumentary.com/) Starting with Lyft in 2015

- [KubeCon EU 2023](https://kccnceu2023.sched.com/)

- [Dapr](https://dapr.io/) Cloud Native reverse proxy, service discovery, pub/sub, state mgt, workflows, secrets, config (like TF or Pulumi)

- [OpenAI DevDay, Opening Keynote](https://www.youtube.com/watch?v=U9mJuUkhUzk)

- [Sorry Cypress on Kubernetes](https://itnext.io/sorry-cypress-quick-start-349f283ca258) Like a Jenkins home page but just for Cypress projects?

- Not sure about SOPS vs other Secrets solutions. [The SOPS Way: The Only Way to Keep Your Secrets Safe in Git](https://medium.com/@seifeddinerajhi/the-sops-way-the-only-way-to-keep-your-secrets-safe-in-git-4a17e83ef6c6) Traditionally, secrets are stored in a separate, secure location, such as Hashicorp Vault, AWS Secrets Manager, GCP KMS, Azure Key Vault, and the well-known credential storages out there like 1Password. SOPS offers a simplified version of secret storage. With SOPS, the secret values are directly stored in the code, and they are encrypted using a key that is stored in a separate file.

- [Apache Druid: overview, running in Kubernetes and monitoring with Prometheus](https://itnext.io/apache-druid-overview-running-in-kubernetes-and-monitoring-with-prometheus-4c8d29f6c8b9): Apache Druid is a distributed, cloud native columnar database focused on working with large amounts of data, combining the features and benefits of Time-Series Database, Data Warehouse, and search engine. Useful for real-time ingestion, fast queries, and hight uptime. Common use cases: clickstream analytics, risk and fraud analysis, and server metrics storage.

- [An Intro to GitHub Actions + Terraform + AWS](https://medium.com/swlh/lets-do-devops-github-actions-terraform-aws-77ef6078e4f2). Secrets stored in GitHub Actions.

- [Terraform: planning a new project with Dev/Prod environments](https://itnext.io/terraform-planning-a-new-project-with-dev-prod-environments-2724ebd08ba9). [Terraform Best Practices](https://www.terraform-best-practices.com/).

- [Building a Multi-Region Kubernetes Worker Nodes Cluster with Tailscale VPN](https://faun.pub/building-a-multi-region-kubernetes-worker-nodes-cluster-with-tailscale-vpn-646f6767bda6). Spoiler: Tailscale is a VPN mesh built on WireGuard VPN protocol, encrypted. [Free tier](https://tailscale.com/pricing/) is 3 users and 100 devices. I'm really interest in multi region and hybrid on prem DNS routing and failover for intranet apps.

- [Tailscale for Secure Access to Kubernetes Applications without external Load Balancers](https://chimbu.medium.com/access-kubernetes-applications-securely-without-load-balancers-via-tailscale-792584d5a59c)
  Peer to peer, never hits central server. Install Tailscale app on each server or client (like your phone?). Useful for sharing experimental services with team. Free tier.

> Tailscale automatically assigns each machine on your network a unique 100.x.y.z IP address, so that you can establish stable connections between machines no matter where they are in the world, even when they switch networks, and even behind a firewall. You can view all the connected devices in the console.

- [DevOps in Argo Rollouts — Blue-green Deployment](https://blog.devgenius.io/devops-in-argo-rollouts-blue-green-deployment-f24084534213): Argo Rollouts automates the process of creating and managing blue-green replica sets and performing the cutover from the previous to the new version.

- [The common traits of successful MLOps](https://bdtechtalks.com/2022/12/12/successful-mlops/)

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

- [Networks can solve AI problems from robotics to self-driving cars](https://venturebeat.com/ai/how-mits-liquid-neural-networks-can-solve-ai-problems-from-robotics-to-self-driving-cars/) Research from [MIT CSAIL](https://www.csail.mit.edu/) (Computer Science and Artificial Intelligence Laboratory) Inspired by the research on biological neurons found in small organisms, such as the C. Elegans worm, which performs complicated tasks with no more than 302 neurons. The result of their work was [liquid neural networks (LNN)](https://www.science.org/doi/10.1126/scirobotics.adc8892). The key to LNNs’ efficiency lies in their use of dynamically adjustable differential equations, which allows them to adapt to new situations after training. This is a capability not found in typical neural networks. LNNs also use a wiring architecture that is different from traditional neural networks and allows for lateral and recurrent connections within the same layer.

> A classic deep neural network requires around 100,000 artificial neurons and half a million parameters to perform a task such as keeping a car in its lane. In contrast, Rus and her colleagues were able to train an LNN to accomplish the same task with just 19 neurons.

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
