---
title: "Jenkins in Docker for Local CI/CD"
date: "2023-05-21T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - jenkins
  - docker
  - pipeline
  - JCasC
  - automation
---

## Build a local devops stack running Jenkins in Docker

> Garaunteed to work in Windows WSL2 and probably in Linux and MacOS.

This is part 1 of a series "CI/CD With Jenkins":

- Part 1: Jenkins In Docker for Local CI/CD
- Part 2: Jenkins Docker Agents with DindD Cloud
- Part 3: Jenkins with SonarQube Docker Agent

The stack we build in the series can be used as the base stack for Mannings Live Project: [CI/CD Pipeline for a Web Application Using Jenkins](https://www.manning.com/liveprojectseries/ci-cd-pipeline-ser)

We start by creating a custom Jenkins docker container and run it in Docker. Then we add credentials to talk to GitHub, and then test the certificate with a simple pipeline to GitHub.

### Why Jenkins in Docker?

I try to keep my dev stack off of Windows. I only use Windows for gaming so I don't want the dev resources loading unless I need them. WSL works great for that. I also have Ubuntu desktop via dual boot, but it keeps failing for various reasons (NVIDIA drivers key among the reasons).

Putting Jenkins in Docker also avoids getting tangled up in Java VM hell on your dev machine. If you install Jenkins from the ground up, you also have to install Java. Jenkins Images already have the correct version of Java installed for the Jenkins version in the image.

> We are doing this step-by-step to increase learning. If this were for efficiency, we'd use some IaC tools like Ansible.

## Install Git

I installed git on Ubuntu in WSL2, but it might work passed through from Windows.

## Install Docker

- Ideally do not install Docker Desktop because it is helpful to do everything via Docker CLI to increase your DevOps skills.
- I installed Docker Demon directly on Ubuntu in WSL.
- I think I used this blog to install Docker on WSL2 [Install Docker on WSL Without Docker Desktop](https://dev.to/bowmanjd/install-docker-on-windows-wsl-without-docker-desktop-34m9) (it was a while ago) when I set up Docker for use with VSCode devcontainers and it is available for this project with no additional work.

## Create a bridge network and Mapped Drives

This is so all of our containers can talk to each other easily. This will become useful in Part 2.

`docker network create jenkins`

## Add Custom Jenkins Docker Image

These instructions are built on top of some shoulders:

- [How to Run Jenkins on Docker](https://www.youtube.com/watch?v=QNZNfvrFBMo), by CloudBeesTV.

We are going to set up our stack with `--restart=no` so that the stack is only loaded when I `docker start` it.

You will be creating a Dockerfile and some other files, so I recommend you create a dir. Mine is `~/dev/jenkins-docker`

Create your custom Jenkins Dockerfile in `~/dev/jenkins-docker`.

There are 2 custom image options (read below).

Both customizations will add:

- keyring info to let Jenkins talk to the Docker image archive
- docker-ce-cli: docker container engine CLI
- blueocean and docker-workflow Jenkins plugins

### Option 1: Customize Jenkins Docker Image, Partial Automation

This is the version you'll find in the Jenkins docs.

```Dockerfile
# Dockerfile
FROM jenkins/jenkins:2.387.3
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"
```

#### Build Option 1 Image

Build it from  `~/dev/jenkins-docker`:
`docker build -t jenkins-blueocean-option1 .`

#### Run the Option 1 custom Jenkins container

```bash
docker run --name jenkins-blueocean \
  --detach --rm --restart=no \
  --network jenkins \
  --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client \
  --env DOCKER_TLS_VERIFY=1 \
  --publish 8080:8080 \
  --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  myjenkins-blueocean:2.387.3-1
```

- We set some args because we are experimetnting:
  - --rm to remove the container after it is stopped
  - --restart=no
- This created 2 docker volumes to hold Jenkins config data between container sessions. We'll use the jenkins-docker-certs in Part 2: Jenkins Docker Agents with DindD Cloud.
  If you dont want to keep the configurations after you are done experimenting, stop the container (which will auto remove itself).
  
  To safely remove the volumes we created here, run `docker volume ls` then `docker volume rm < volume name>`.
  
  To quickly and unsafely remove the volumes instead, run `docker volume rm $(docker volume ls -qf dangling=true)`. This works because the Jenkins Docker volumes are now orphaned. DONT DO THIS IF YOU HAVE SOME OTHER CONTAINER EXPERIMENTS IN PLAY.

> Don't forget that you can access Jenkins via `docker exec -it jenkins-blueocean bash`

Log in to Jenkins at [http://localhost:8080](http://localhost:8080).

- Login is user=admin, pwd=admin
- When prompted: Install Default Plugins

### Option 2: Further Automate Jenkins using Configuration As Code

We are going to make our custom Jenkins container even better than Option 1 by using the JCasC plugin.

These articles were helpful:

- [The JCasC (Jenkins Configuration As Code) Plugin](https://plugins.jenkins.io/configuration-as-code/)
- [Automating Jenkins Setup using Docker and Jenkins Configuration as Code](https://abrahamntd.medium.com/automating-jenkins-setup-using-docker-and-jenkins-configuration-as-code-897e6640af9d)
- [How To Automate Jenkins Setup with Docker and Jenkins Configuration as Code](https://www.digitalocean.com/community/tutorials/how-to-automate-jenkins-setup-with-docker-and-jenkins-configuration-as-code)

Later, we'll create an IaC script to do all this and Jenkins will be ready to use with far less time up front or user error.

#### Jenkins Config for Option 2

- Create `jenkins-configuration.yaml` in `~/dev/jenkins-docker`.

```yaml
jenkins:
  systemMessage: "Automating Jenkins Setup using Docker and Jenkins Configuration as Code\n\n"
  remotingSecurity:
   enabled: true
  securityRealm:
    local:
      allowsSignup: false
      users:
       - id: ${JENKINS_ADMIN_ID}
         password: ${JENKINS_ADMIN_PASSWORD}
  authorizationStrategy:
    globalMatrix:
      permissions:
        - "Overall/Administer:admin"
        - "Overall/Read:authenticated"
unclassified:
  location:
    url: http://127.0.0.1:8080/jenkins/

```

> After Jenkins is up and running, see what properties are available, navigate to server_ip:8080/configuration-as-code/reference, and you’ll find a page of documentation that is customized to your particular Jenkins installation.

#### Plugin List File for Option 2

We were already using the included java app `jenkins-plugin-cli` to add blueocean and docker-workflow plugins in Option 1. Now we are going to add all the plugins using the same java app:

> See Addendum 1: "How To Output A List of your Installed Jenkins Plugins" below to learn how to get a list of installed plugins in an existing Jenkins server. Its how I generated the plugins list below.

- Create `plugins.txt` in `~/dev/jenkins-docker`.
- This list below will add all default plugins, plus a few extra ones we need, by copying and pasting the text below into the file. Later in the series we will be creating a Docker "cloud" using DinD, and integrating a SonarQube server docker container.
- The format is "shortname:version". If no version is specified, it will pull the latest version.

```Text
ant
antisamy-markup-formatter
apache-httpcomponents-client-4-api
authentication-tokens
blueocean
blueocean-bitbucket-pipeline
blueocean-commons
blueocean-config
blueocean-core-js
blueocean-dashboard
blueocean-display-url
blueocean-events
blueocean-git-pipeline
blueocean-github-pipeline
blueocean-i18n
blueocean-jwt
blueocean-personalization
blueocean-pipeline-api-impl
blueocean-pipeline-editor
blueocean-pipeline-scm-api
blueocean-rest
blueocean-rest-impl
blueocean-web
bootstrap5-api
bouncycastle-api
branch-api
build-timeout
caffeine-api
checks-api
cloudbees-bitbucket-branch-source
cloudbees-folder
command-launcher
commons-lang3-api
commons-text-api
credentials
credentials-binding
display-url-api
docker-commons
docker-workflow
durable-task
echarts-api
email-ext
favorite
font-awesome-api
git
git-client
github
github-api
github-branch-source
gradle
handy-uri-templates-2-api
htmlpublisher
instance-identity
ionicons-api
jackson2-api
jakarta-activation-api
jakarta-mail-api
javax-activation-api
javax-mail-api
jaxb
jdk-tool
jenkins-design-language
jjwt-api
jquery3-api
junit
ldap
mailer
matrix-auth
matrix-project
mina-sshd-api-common
mina-sshd-api-core
okhttp-api
pam-auth
pipeline-build-step
pipeline-github-lib
pipeline-graph-analysis
pipeline-groovy-lib
pipeline-input-step
pipeline-milestone-step
pipeline-model-api
pipeline-model-definition
pipeline-model-extensions
pipeline-rest-api
pipeline-stage-step
pipeline-stage-tags-metadata
pipeline-stage-view
plain-credentials
plugin-util-api
pubsub-light
quality-gates
resource-disposer
scm-api
script-security
snakeyaml-api
sonar
sonar-quality-gates
sse-gateway
ssh-credentials
ssh-slaves
sshd
structs
timestamper
token-macro
trilead-api
variant
workflow-aggregator
workflow-api
workflow-basic-steps
workflow-cps
workflow-durable-task-step
workflow-job
workflow-multibranch
workflow-scm-step
workflow-step-api
workflow-support
ws-cleanup
```

#### Custom Option 2 Dockerfile

The file below has the setupWizard disabled.

```Dockerfile
# Dockerfile
FROM jenkins/jenkins:2.387.3
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false
COPY jenkins-configuration.yaml /var/jenkins_home/jenkins-configuration.yaml
ENV CASC_JENKINS_CONFIG /var/jenkins_home/jenkins-configuration.yaml
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt
```

#### Build The Option 2 Custom Image

Build the image from within  `~/dev/jenkins-docker`. We add "my" to the front to clearly mark it as a custom image:
`docker build -t myjenkins-blueocean-option2 .`

#### Run the Option 2 custom Jenkins container

- Option 2 requires that we pass in the ADMIN_ID and ADMIN_PASSWORD
- Create a file names `docker_run.sh` and paste the below code into it.

```bash
docker run --name jenkins-blueocean-option2 \
  --detach --rm --restart=no \
  --network jenkins \
  --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client \
  --env DOCKER_TLS_VERIFY=1 \
  --publish 8080:8080 \
  --publish 50000:50000 \
  --env JENKINS_ADMIN_ID=admin --env JENKINS_ADMIN_PASSWORD=admin \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  myjenkins-blueocean-option2
```

Type `bash ./docker_run.sh`

Log in to Jenkins at [http://127.0.0.1:8080](http://127.0.0.1:8080). It should be ready to go!

#### Caveats

The warnings that are present on the home page are the same as those you would get if you set Jenkins up the manual way. One warning will be that the URL is empty, but thats because we used on `localhost` or `127.0.0.1` instead of a proper host name.

#### If Jenkins Works

Now that we've got it working, we will now make our custom Jenkins container persistant over restarts:

- Get the container id with `docker ps`
- Stop the container with `docker stop <container id>`
- Remove the --rm from the `docker_run.sh` and the sh script again.

### Restarts

In the default instructions, the Jenkins container will be set to autorun on start. I explicitly set mine to manual start `--restart=no` (which is the default but we are being explicit).

I have to start it every Jenkins session:

` docker start jenkins-blueocean-option2 `

If you want it to start everytime you reboot, change the code in `docker_run.sh` to `--restart=unless-stopped`, then follow the same instructions as for chaning `--rm`. See [Start containers automatically](https://docs.docker.com/config/containers/start-containers-automatically/).

We'll create a master `start.sh` script later to launch the additional default/core docker containers (DinD and SonarQube).
  
## Integrate Jenkins With SCM

### Add Credentials for Jenkins-to-GitHub

You only need to do this for a private repo. We're going to use a "personal access token" because password auth was removed in 2021.

Use [this video from CloudBeesTV](https://www.youtube.com/watch?v=HSA_mZoADSw) but add the credential through the "Manage Jenkins" interface, not via the Pipeline interface (because its cleaner and we have not set up our pipeline yet anyway).



### Create a Test Pipeline

```Bash

git remote add <name> <url>
git ls-remote <name>

```

Lets test that we can talk to our GitHub account. (generated with ChatGPT)

```Groovy

pipeline {
    agent any
    
    stages {

        stage('Checkout') {
            steps {
                // Checkout the repository using Git
                git 'https://github.com/edpike365/bmi-calculator.git'
            }
        }
        
        stage('List Repositories') {
            steps {
                script {
                    // Fetch the list of repositories
                    def repositories = sh(script: 'git ls-remote --get-url', returnStdout: true).trim().split('\n')
                    
                    // Print the list of repositories
                    echo "List of repositories:"
                    repositories.each { repository ->
                        echo repository
                        
                        // Fetch the branches for each repository
                        def branches = sh(script: "git ls-remote --heads ${repository} | awk '{print \$2}' | sed 's/refs\\/heads\\///'", returnStdout: true).trim().split('\n')
                        
                        // Print the branches for the repository
                        echo "Branches:"
                        branches.each { branch ->
                            echo "  - ${branch}"
                        }
                    }
                }
            }
        }
    }
}

```

From Google GenAI:

```Groovy

pipeline {
  agent any
  stages {
    stage ('List Repos') {
      steps {
        sh 'git ls-remote'
      }
    }
  }
}

```

## Addendums

### Addendum 1: How To Output A List of your Installed Jenkins Plugins

`install-plugins.sh` was removed and replaced with [Plugin Installation Manager Tool for Jenkins](https://github.com/jenkinsci/plugin-installation-manager-tool/#readme)

We can specify a --plugin-file /path/to/file and also --plugins "space delimited list of plugins"

The expected format for plugins in the .txt file or entered through the --plugins CLI option is artifact ID:version or artifact ID:url or artifact:version:url
Script to display list of current plugins in jenkins/script interface
def pluginList = new ArrayList(Jenkins.instance.pluginManager.plugins)

To run the script go to http://127.0.0.1:8080/script

Run this code. The second version gets it in the format that we need for `plugins.txt`.

```groovy
pluginList.sort { it.getShortName() }.each{
  plugin -> 
    // println ("${plugin.getDisplayName()} (${plugin.getShortName()}): ${plugin.getVersion()}")
    println ("${plugin.getShortName()}:${plugin.getVersion()}")
}
```

The last line will be a comma delimited list of the plugins, repeated for some reason. I ignore that line when copying and pasting.

### ADDENDUM 2: Script to Create Credentials

THIS IS A WORK IN PROGRESS

I'll be adding a way to programmatically generate a GitHub user token and use it to create a GitHub credential for Jenkins. It will be part of the overall "Local DevOps Stack" build script.

- [How to manage Credentials via the REST API](https://docs.cloudbees.com/docs/cloudbees-ci-kb/latest/client-and-managed-masters/how-to-manage-credentials-via-the-rest-api) Is this a plugin and is it free? Its part of CloudBees CI apparently and it cost a fair bit, no free tier.

#### Get GitHub Token

#### Use It to Create Jenkins Credential

Generated with ChatGPT

```Python
import requests
import json

jenkins_url = 'http://your-jenkins-server-url'
username = 'your-username'
api_token = 'your-api-token'

# Authenticate with Jenkins
auth = (username, api_token)

# Define the credential data
credential_data = {
    "": "0",
    "credentials": {
        "scope": "GLOBAL",
        "id": "my-credential-id",
        "username": "my-username",
        "password": "my-password",
        "description": "My Credential Description",
        "$class": "com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl"
    }
}

# Convert credential data to JSON
credential_json = json.dumps(credential_data)

# Create the credential
create_credential_url = f"{jenkins_url}/credentials/store/system/domain/_/createCredentials"
response = requests.post(create_credential_url, data=credential_json, auth=auth, headers={'Content-Type': 'application/json'})

if response.status_code == 200:
    print("Credential created successfully.")
else:
    print(f"Failed to create credential. Status code: {response.status_code}, Error: {response.text}")
```


## OLD VERSION

Useful for Manning projects.
4 Projects:

1. Static Code Analysis

   - [Integrating Sonarqube With Jenkins](https://liveproject.manning.com/module/900_2_1/static-code-analysis/1--integrating-sonarqube-with-jenkins/1-1-workflow%3a-integrating-sonarqube-with-jenkins?)

   - [Static Code Analysis](https://liveproject.manning.com/module/900_3_1/static-code-analysis/2--static-code-analysis-in-pipeline-for-reactjs-application/2-1-workflow%3a-static-code-analysis-in-pipeline-for-reactjs-application?)

1. Continuous Integration

   - [Configure unit tests and code coverage with Quality Gate](https://liveproject.manning.com/module/901_2_1/continuous-integration/1--configure-unit-tests-and-code-coverage-with-quality-gate/1-1-workflow%3a-configure-unit-tests-and-code-coverage-with-quality-gate?)

   - [Build And Archive Artifact](https://liveproject.manning.com/module/901_3_1/continuous-integration/2--build-and-archive-the-artifact/2-1-workflow%3a-build-and-archive-the-artifact?comment=540613&groupId=2070)

1. Build and Scan Docker Image

   - [Build Docker Image](https://liveproject.manning.com/module/902_2_1/build-and-scan-docker-image/1--building-docker-images/1-1-workflow%3a-building-docker-images?)

   - [Scanning Docker Images for Vulnerabilities](https://liveproject.manning.com/module/902_3_1/build-and-scan-docker-image/2--scanning-docker-images-for-vulnerabilities/2-1-workflow%3a-scanning-docker-images-for-vulnerabilities?)

1. Continuous Deployment

   - [Deploy In Kubernetes Cluster](https://liveproject.manning.com/module/903_2_1/continuous-deployment/1--deploy-reactjs-application-in-kubernetes-cluster/1-1-workflow%3a-deploy-reactjs-application-in-kubernetes-cluster?)

   - [Load Testing With Apache JMeter](https://liveproject.manning.com/module/903_3_1/continuous-deployment/2--load-testing-with-apache-jmeter/2-1-workflow%3a-load-testing-with-apache-jmeter?)

### Useful Links

- [Using Docker With Pipeline](https://www.jenkins.io/doc/book/pipeline/docker/)
- [Docker Containers As Build Slaves](https://devopscube.com/docker-containers-as-build-slaves-jenkins/)
- [Docker build/push with declarative pipeline in Jenkins](https://faun.pub/docker-build-push-with-declarative-pipeline-in-jenkins-2f12c2e43807)

## Get a Docker Hosting env

- assuming Windows 10/11, WSL2, Docker Desktop

## Prep docker host

`docker volume create jenkins-data`

`docker volume create jenkins-docker-certs`

`docker network ls`

Create a network for jenkins and jenkins-docker-proxy containers to communicate. Creates a network with the default DRIVER type of "bridge" and local scope.
`docker network create jenkins`

Note that user defined networks allow connection via container name, not just IP address via `automatic service discovery`. It uses the DNS service embedded in the docker host.

Refs:

- [Jenkins Book: Using Docker](https://www.jenkins.io/doc/book/installing/docker/)

- [Run Jenkins in a Docker container — part 1 — Docker-in-Docker](https://davelms.medium.com/run-jenkins-in-a-docker-container-part-1-docker-in-docker-7ca75262619d)

- [Run Jenkins in a Docker container — part 2 — socat](https://davelms.medium.com/run-jenkins-in-a-docker-container-part-2-socat-d5f18820fe1d)

- [Run Jenkins in a Docker container — part 3 — run as root user](https://davelms.medium.com/run-jenkins-in-a-docker-container-part-3-run-as-root-user-12b9624a340b)

- [Docker – Using Docker containers for your Jenkins build nodes](https://devopspoints.com/docker-using-docker-containers-for-your-jenkins-build-nodes.html)

- [Connecting to Docker Daemon from jenkins running inside a docker container](https://stackoverflow.com/questions/66492160/connecting-to-docker-daemon-from-jenkins-running-inside-a-docker-container)

- Useful Commands

  `docker container inspect CONTAINER`

## Launch Docker Proxy Container

```bash
#!/bin/bash
docker container run --name jenkins-docker \
 --detach --restart unless-stopped \
 --privileged \
 --network jenkins --network-alias docker \
--env DOCKER_TLS_CERTDIR="/certs" \
 --volume jenkins-docker-certs:/certs/client \
 --volume jenkins-data:/var/jenkins_home \
 docker:dind
```

`--network-alias docker` adds an extra "conatiner name" that can be used on the `jenkins` user defined network. YOU ARE NOT ALIASING THE ACTUAL NETWORK.

After running this command, a Docker-in-Docker container will be listening on port 2376 and since we gave it the network alias of `docker` then we will be able to reach it from Jenkins on tcp://docker:2376.

`docker network inspect jenkins`

Consider adding -dit vs --detach. -dit means "detached interactive terminal". Then you should be able to use `docker attach alpine`. Alpine default terminal is "ash", not "bash".

`docker attach jenkins-docker`

`# ip addr show`

`# ping -c 2 google.com`

`CTRL + p then q`

> **_Notes:_**
>
> - on initial start-up, Docker will create client and server certificates under `/certs`
>   you will need these later when configuring the docker cloud.
>
> - variation. to skip TLS and use port 2375, set DOCKER_TLS_CERTDIR=""
>   <br/><br/>

## Launch Jenkins Container

```bash
#!/bin/bash
docker container run --name jenkins-blueocean \
  --detach --restart unless-stopped \
  --network jenkins \
  --env DOCKER_HOST="tcp://docker:2376" \
  --env DOCKER_CERT_PATH=/certs/client \
  --env DOCKER_TLS_VERIFY=1 \
  --volume jenkins-docker-certs:/certs/client:ro \
  --volume jenkins-data:/var/jenkins_home \
  --publish 9999:8080 --publish 50000:50000 \
  jenkinsci/blueocean
```

If you chose to skip TLS and are using port 2375, use these environment variables:

```text
  --env DOCKER_HOST="tcp://docker:2375"
  --env DOCKER_CERT_PATH=""
  --env DOCKER_TLS_VERIFY=""
```

Now that Jenkins is started, head over to http://localhost:9999 to go through the initial set up wizard.

Next:

- Jenkins docker plugin
- New cloud, specify `tcp://docker:2376`
- “X.509 Client Certificate”
- Docker Agent Template: `jenkins/agent:latest-jdk11`
- name: jenkins-agent-jdk11
- label: "docker-dind jenkins-agent-jdk11"

[Further directions](https://davelms.medium.com/run-jenkins-in-a-docker-container-part-1-docker-in-docker-7ca75262619d)

NOTE: Name the docker Cloud that points at your dind server "docker-dind". The only change seems to be that the console output for a build will say "Running on jenkins-agent-jdk11-0000am08jei12 on docker-dind". Later, we will add another docker Cloud that uses the sock method and call it "docker-sock".

Docker Plugin works with jenkins even if you have no cloud configured. It just needs to be able to use the docker host that the jenkins controller container is running on. HOWEVER, we are going to try to get docker-dind to handle docker agent request.

## Launch SonarQube Container

## Test Networking

Test that everything can talk to each other over the `jenkins` network.

`docker attach jenkins-docker`

`# ping -c 2 {jenkins-ip}`

`CTRL + p then q`

`docker attach jenkins`

`# ping -c 2 {jenkins-docker-ip}`

## Test Using FreeStyle

NOTE: Freestyle jobs can be run when the master node is marked temporarily offline.

## Test Using Pipeline

NOTE 1: Pipeline jobs will NOT initiate when the master node is marked temporarily offline. If you click the "build now" button, nothing will happen. If you want to force use of a docker cloud, you need to configure the master (aka built-in Node) and set number of executors to 0.

NOTE 2: Freestyle docker cloud jobs clean up their agent immediately IF THE BUILT-IN NODE HAS EXECUTORS (even when the build was definitely done on a cloud agent). If Built-in Node executors are set to 0, Freestyle job cloud agents linger just like Pipeline jobs do. Pipeline jobs ALWAYS leave the agent around for about 2 minutes, first marked ? then additonally marked ?. TODO figure out why Executors call immediate cloud agent cleanup while Pipeline jobs linger.

## Test Using Multi

### Addendum 3: Physical Requirements

In case you have performance problems, I developed this project on Ubuntu 22 on WSL2 on Windows 11 Pro (i9-9900KF, 16 vCores, 64GB Ram). Unfortunately that would hide those problems on my end; so let me know if its slow on your machine.
