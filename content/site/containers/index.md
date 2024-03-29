---
title: "Containers and K8s"
date: "2022-08-23T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - Containers
  - OCI
  - Docker
  - Kubernetes
---

[OCI/Docker](#oci-docker) | [Kubernetes Orchestration](#kubernetes-container-orchestration) | [Hosting](#hosting-providers)

> Servers should be cattle, not pets. But it's OK to miss "the servers of Middle Earth".

## VM Hypervisors

- VMWare
- KVM
- Hyper-V

## Container History

Containers appeared after invention of cgroups and namespaces. [LXC](https://linuxcontainers.org/lxc/introduction/) was an early try.

[LXC](https://linuxcontainers.org/lxc/introduction/) Linux Containers

- Between OCI and fullblown VM
- Docker was originally built on top of LXC.
- LXD: extension of LXC

> "LXD is designed for hosting virtual environments that “will typically be long running and based on a clean distribution image,” whereas “Docker focuses on ephemeral, stateless, minimal containers that won’t typically get upgraded or re-configured but instead just be replaced entirely.”

### CRI, OCI

- [CRI](https://kubernetes.io/docs/concepts/architecture/cri/) (Container Runtime Interface) Compliant Runtimes
  - Kubernetes API that allows you to use different container runtimes (like containerd and CRI-O).
  - Defines [gRPC](https://grpc.io/) protocol for communicating between cluster components.

- OCI ([Open Container Initiative](https://opencontainers.org/)) Specs for building images and running containers.
  Has 3 parts:
  - Runtime Spec
  - Image Spec
  - Distribution Spec

- Runtime Specs
  - High Level runtimes
    - [containerD](https://containerd.io/): daemon that interfaces between container engine and container runtimes.
      - CRI compliant through cri plugin (this still true?)
      - Originally from Docker
    - Docker
    - [CRI-O](https://cri-o.io/)
      - Red Hat/IBM
    - podman
  - Low Level
    - runc: OCI universal OS container runtime.
      - by Docker, now part of CNCF
      - Docker and Containerd run on it
    - gvisor
    - kata

### Docker

- Docker CLI
- Docker Desktop: Docker needs Linux, so MacOS (Unix, not Linux), needs a VM, just like Windows (except WSL2).
- DinD
- Docker Hub
- VSCode DevContainers

### Podman

No daemon, each container is self-sufficient. So no SPOF (single point of failure). NOT root by default. More secure than Docker.

- Podman CLI (vs Docker CLI)
- [Switching from Docker to Podman (devcontainer)](https://www.troykershaw.com/vscode-dev-containers-podman/)
- [VSCode Remote Container Support](https://y0n1.medium.com/using-podman-with-the-docker-extension-for-visual-studio-code-a828be26d285)

### Others

- LXC: Canonical, pre Docker. No daemon.
- rkt: formerly CoreOS Rocket. Can run Docker. No daemon. RedHat.

## Container Image Repos

- Docker Hub
- GitHub Containers
- Artifactory Docker Reg: Local repo option.
- AWS Container Registry

## Kubernetes Container Orchestration

- Docker Compose: smaller apps
- K8s (Kubernetes) for the big kahunas

  - Cluster Architecture

    - 1 Control Plane (see components below)
    - n Namespaces (default, plus additionals)
      - n Nodes: 1 physical or virtual host: 1 kubelet, 1 k-proxy, 1 container runtime
        - n Pods per node
          - n Containers per pod
        - services
        - deployments

  - Control Plane Components

    - [kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/)
      - HA Control Components. Options:
        1. Stacked control plane nodes
        1. External etcd cluster
      - Maps to a container runtime
        - Docker: default if it is installed
        - containerd: (docker installs containerd as well, so version conflict)
        - CRI-O
    - [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/)
    - [etcd](https://kubernetes.io/docs/concepts/overview/components/#etcd) (backing store) key-value store
    - [kube-scheduler](https://kubernetes.io/docs/concepts/overview/components/#kube-scheduler): watches for new pods with no assigned nodes
    - [kube-controller-manager](https://kubernetes.io/docs/concepts/overview/components/#kube-controller-manager)
      - Node controller
      - Job controller
      - Endpoints
      - Service Account and Token
    - [cloud-controller-manager](https://kubernetes.io/docs/concepts/overview/components/#cloud-controller-manager): link cluster to cloud provider's API

  - Node Components: run on every node

    - kubelet: manages containers on this pod via PodSpec
    - kube-proxy: network proxy.
    - container runtime: Options implementing Kubernetes CRI (container runtime interface)
      1. Docker Engine
      1. containerd
      1. CRI-O
    - [crictl](https://kubernetes.io/docs/reference/tools/map-crictl-dockercli/)

  - [Addons](https://kubernetes.io/docs/concepts/cluster-administration/addons/)

  - DNS: [Cluster DNS](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) server. Auto added to containers started by Kube.

    - Namespaces of Services
    - DNS Records
      - Services
        - A/AAAA records for normal services.
        - SRV records for headless.
      - Pods
        - A/AAAA
        - hostname and subdomain
        - setHostnameAsFQDN(boolean): fully qualified domain name -> hostname.
        - DNS Policy
        - DNS Config

  - Web UI ([Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/))

  - [Container Resource Monitoring](https://kubernetes.io/docs/tasks/debug-application-cluster/resource-usage-monitoring/)

  - [Cluster-level Logging](https://kubernetes.io/docs/concepts/cluster-administration/logging/)

    - Logging agent
      - sidecar container

- Other

  - [Loft](loft.sh) Multi-tenancy, self service.
  - [KubeCtl](https://kubernetes.io/docs/reference/kubectl/overview/) CLI commands to talk to clusters
  - Local Kubernetes Dev

    - [kind (K8s-in-Docker)](https://kind.sigs.k8s.io/docs/) Local kubernetes.
    - [minikube](https://github.com/kubernetes/minikube): Local K8s. SINGLE NODE CLUSTER. Auto installs podman (check version)
      - LoadBalancer
      - Multi-cluster
      - NodePorts
      - Persistent Volumes
      - Ingress
      - Dashboard
      - Container runtime
      - API Server
      - [Addons](https://minikube.sigs.k8s.io/docs/handbook/deploying/#addons)
      - NVIDIA GPU support
      - Filesystem mounts

  - [Istio Service Mesh](https://istio.io/): Extends K8s

    - traffic mgt: inter service routing, failure recovery, load balancing
    - telemetry
    - security: encryption, role-based access and auth

  - [Argo](https://argoproj.github.io/)

    - Argo Workflows: k8s native workflow engine. Supports DAG, step-based.
    - Argo CD: Cont. delivery, UI.
    - Argo Rollouts: k8s deployment strategies. Canary, Blue-Green.
    - Argo Events: event based dependency mgt.

  - [Rancher (Enterprise K8s mgt)](https://rancher.com/)
  - Helm
  - Tekton
  - Konfigure?
  - Open Telemetry

- [K3s (Lightweight Kubernetes)](https://k3s.io/) IOT, Edge, ARM, RaspPi. <50MB>

- Local (For Devs)
  - Docker Desktop [Components](https://www.docker.com/blog/docker-unikernels-open-source/#:~:text=HyperKit%20is%20based%20around%20a,or%20complex%20management%20tool%20stacks.)
    - [Hyperkit (OSX)](https://github.com/moby/hyperkit) OSX is actually Unix, not Linux, so needs a Hypervisor to run a Linux VM.
    - [WSL 2 (Windows)]
    - [Datakit](https://github.com/moby/datakit)
    - [VPNkit](https://github.com/moby/vpnkit)
    - Docker CE (Container Engine), CLI
    - Kubernetes: ? version
  - [Minikube] Drop in [replacement for Docker Desktop](<(https://matt-rickard.com/docker-desktop-alternatives/#:~:text=Let's%20start%20with%20minikube.,in%20replacement%20for%20Docker%20Desktop.)>). Runs Docker inside K8s.
    - Single node cluster
    - Docker CE, CLI (they are open source)
    - [Install in WSL 2](https://itspyworld.blogspot.com/2021/11/install-minikube-in-wsl-2-with-kubectl.html)

### Hosting Providers

- Cloud
  - AWS
  - GCP
  - Azure
  - Linode
  - Digital Ocean
  - Heroku
- On Prem
  - VMSphere
  - [AWS Outposts](https://aws.amazon.com/outposts/) Hybrid
  - [Azure HCI (hyperconverged infrastructure)](https://azure.microsoft.com/en-us/products/azure-stack/hci/)
- Local (For Devs):
  - Cloud Vendor Integrations: local simulation or remote integration with test envs
    - [LocalStack](https://localstack.cloud/): AWS dev offline.
    - [Serverless](https://www.serverless.com/)
    - [AWS Amplify](https://aws.amazon.com/amplify/)
    - [AWS SAM](https://aws.amazon.com/serverless/sam/)
    - [AWS Chalice](https://github.com/aws/chalice)
    - [Firebase (Google)](https://firebase.google.com/)
  - Desktop Containers
    - Docker Desktop [Components](https://www.docker.com/blog/docker-unikernels-open-source/#:~:text=HyperKit%20is%20based%20around%20a,or%20complex%20management%20tool%20stacks.) DEPRECATED
      - [Hyperkit (OSX)](https://github.com/moby/hyperkit) OSX is actually Unix, not Linux, so needs a Hypervisor to run a Linux VM.
      - [WSL 2 (Windows)]
      - [Datakit](https://github.com/moby/datakit)
      - [VPNkit](https://github.com/moby/vpnkit)
      - Docker CE (Container Engine), CLI
      - Kubernetes: ? version
    - [Minikube] Drop in [replacement for Docker Desktop](<(https://matt-rickard.com/docker-desktop-alternatives/#:~:text=Let's%20start%20with%20minikube.,in%20replacement%20for%20Docker%20Desktop.)>). Runs Docker inside K8s.
      - Single node cluster
      - Docker CE, CLI (they are open source)
      - [Install in WSL 2](https://itspyworld.blogspot.com/2021/11/install-minikube-in-wsl-2-with-kubectl.html)
    - [Rancher Desktop](https://rancherdesktop.io/)

Storage:
- Longhorn (Rancher Labs)