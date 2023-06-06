---
title: "Jenkins Docker Cloud Agents with DinD"
date: "2023-05-22T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - jenkins
  - sonarqube
  - docker
---

Build a local devops stack using Jenkins, SonarQube, and Docker. Works on Windows WSL2.

I try to keep my dev stack off of Windows. I only use Windows for gaming so I don't want the dev resources loading unless I need them. WSL works great for that. I also have Ubuntu desktop via dual boot, but it keeps failing for various reasons (NVIDIA drivers key among the reasons).

> We are doing this step-by-step to increase learning. If this were for efficiency, we'd use some tools like Ansible and Docker Compose.

This can be used as the base stack for Mannings Live Project: [CI/CD Pipeline for a Web Application Using Jenkins](https://www.manning.com/liveprojectseries/ci-cd-pipeline-ser)

This entire project was done on Ubuntu 22 on WSL2 on Windows 11 Pro (i9-9900KF, 16 vCores, 64GB Ram).

## Install Git

I installed git on Ubuntu in WSL, but it might work passed through.

## Install Docker

- Ideally do not install Docker Desktop because it is helpful to do everything via Docker CLI to increase your DevOps skills.
- I installed Docker Demon directly on Ubuntu in WSL.
- I think I used this blog to install Docker on WSL2 [Install Docker on WSL Without Docker Desktop](https://dev.to/bowmanjd/install-docker-on-windows-wsl-without-docker-desktop-34m9) (it was a while ago) when I set up Docker for use with VSCode devcontainers and it is available for this project with no additional work.

## Add Docker-in-Docker Container

- The core Jenkins.io instructions are [here](https://www.jenkins.io/doc/book/installing/docker/).  I've tweaked them a little below to smooth the way.
- [Jenkins User Handbook](https://www.jenkins.io/doc/book/getting-started/)
- In the [instructions](https://www.jenkins.io/doc/book/installing/docker/), follow "On macOs and Linux".

- Useful blog about setting up Jenkins in Docker and how to use Docker agents [here](https://davelms.medium.com/run-jenkins-in-a-docker-container-part-1-docker-in-docker-7ca75262619d) to run jobs. Docker agents are not necessary for the Manning project.
- I used this blog post, plus Jenkins docs, to make these instructions
  - [Run Jenkins in a Docker container- part 1: Docker-in-Docker](https://davelms.medium.com/run-jenkins-in-a-docker-container-part-1-docker-in-docker-7ca75262619d)

### Create a bridge network

This is so all of our containers can talk to each other easily.

`docker network create jenkins`

### Create docker:dind (docker in docker) Container

Jenkins needs to spin up docker containers as agents. Jenkins will be running in a docker container so you need an additional special docker container running as a sister to Jenkins. It gives Jenkins access to the Docker daemon running on the host (in my case Ubuntu on WSL2).

```bash
#!/bin/bash
docker run --name jenkins-dind \
--detach --restart no \
--privileged \
--network jenkins --network-alias docker \
--env DOCKER_TLS_CERTDIR=/certs \
--volume jenkins-docker-certs:/certs/client \
--volume jenkins-data:/var/jenkins_home \
--publish 2376:2376 \
docker:dind --storage-driver overlay2
```

This created 2 volumes to persist data between restarts:

- `jenkins-docker-certs` For persisting and sharing certs so Jenkins can talk to DinD
- `jenkins-data`

Now DinD is listening on port 2376 and Jenkins can reach it on tcp://docker:2376.

## Add Custom Jenkins Docker Image

Putting Jenkins in Docker avoids getting tangled up in Java VM hell.

We are going to set up our stack with `--restart=no` so that the stack is only loaded when I `docker start` it.

You will be creating a Dockerfile and some other files, so I recommend you create a dir. Mine is `~/dev/jenkins-docker`

### Option 1: Customize Jenkins Docker Image

Create this Dockerfile in `~/dev/jenkins-docker`. We are adding:

- keyring info to let Jenkins talk to the Docker image archive
- docker-ce-cli
- blueocean an docker-workflow Jenkins plugins

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

#### Run the Option 1 custom Jenkins container

In the default instructions, Jenkins container will be set to autorun on start. I explicitly set mine to manual start `--restart=no` (no is the default).

I have to start it every Jenkins session:
  ` docker start jenkins-blueocean `

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

- This created 2 persistent volumes for you that point at the same host location as the ones used by DindD container.
- We'll create a script later to launch all the docker containers.

> Don't forget that you can access Jenkins via `docker exec -it jenkins-blueocean bash`

Log in to Jenkins at [http://localhost:8080](http://localhost:8080).

- Login is user=admin, pwd=admin
- When prompted: Install Default Plugins

### Option 2: Further Automate Jenkins using Configuration As Code

We are going to make our custom Jenkins container even better than Option 1 by using these articles:

- [Automating Jenkins Setup using Docker and Jenkins Configuration as Code](https://abrahamntd.medium.com/automating-jenkins-setup-using-docker-and-jenkins-configuration-as-code-897e6640af9d)
- [How To Automate Jenkins Setup with Docker and Jenkins Configuration as Code](https://www.digitalocean.com/community/tutorials/how-to-automate-jenkins-setup-with-docker-and-jenkins-configuration-as-code)

Later, we'll create a script to do all this and Jenkins will be ready to use with far less time up front or user error.

#### Jenkins Config: Security

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
    url: http://127.0.0.1:8080/

```

#### Plugin List

We were already using the included java app `jenkins-plugin-cli` to add blueocean and docker-workflow. Now we are going to add all the plugins using the same app:

- Create `plugins.txt` in `~/dev/jenkins-docker`.
- Add all default plugins plus a few extra ones we need by copying and pasting the text below into the file.
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

#### Custom Dockerfile

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

#### Build and Run The Custom Image

Build it from  `~/dev/jenkins-docker`:
`docker build -t jenkins-blueocean .`

#### Run the Option 2 custom Jenkins container

- Option 2 requires that we pass in the ADMIN_ID and ADMIN_PASSWORD
- In the default instructions, Jenkins container will be set to autorun on start.
  I explicitly set mine to manual start `--restart=no` (no is the default).
  I have to start it every Jenkins session:
  ` docker start jenkins-blueocean `

```bash
docker run --name jenkins-blueocean \
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
  myjenkins-blueocean:2.387.3-1
```

Log in to Jenkins at [http://localhost:8080](http://localhost:8080). It should be ready to go!

### Configure Docker Cloud Agents

TODO: use the Jenkins API to set Docker Cloud up during the Jenkins custom Docker image step above.






### Add Credentials for Jenkins-to-Git

You only need to do this for a private repo.
Use [this video from CloudBeesTV](https://www.youtube.com/watch?v=HSA_mZoADSw) but add the credential through the "Manage Jenkins" interface, not via the Pipeline interface (because its cleaner and we have not set up our pipeline yet anyway).
Don't forget to hit the "validate" button.

### Create a Test Pipeline

Lets test that we can talk to our GitHub account.

```Jenkinsfile
pipeline {
  // this is the master agent to run this pipeline
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  stages {
    stage('Test GitHub Access') {
      steps {
            withCredentials([usernamePassword(credentialsId: 'git-credential', passwordVariable: 'key', usernameVariable: 'gitUser')]) {    
                sh  """
                    git remote
                    """
            }
      }
      }
  }
}
```

## Install SonarQube as Docker Container

### Persistent install

- Do NOT follow the instructions on [Try Out SonarQube](https://docs.sonarqube.org/latest/try-out-sonarqube/). It will create a transient version and we need to persist access tokens, etc, across out DevOps sessions.
- To create a persitent install, we follow directions [here](https://docs.sonarqube.org/latest/setup-and-upgrade/install-the-server/#installing-sonarqube-from-the-docker-image). I've reproduced the steps below to be more succinct.

- Create volumes to prevent loss of info between sessions:

```bash
docker volume create --name sonarqube_data && \
docker volume create --name sonarqube_logs && \
docker volume create --name sonarqube_extensions
```

Assuming you use the default H2 DB, your first run is simply:

```bash
docker run --name sonarqube-server \
  -d --rm \
  --restart=no \
  -p 9000:9000 \
  -v sonarqube_extensions:/opt/sonarqube/extensions \
  sonarqube:9.9.1-community
```

Reminder: I explicitly set `--restart=no` so it doesn't use resources when I'm not doing Jenkins stuff.

I have to start it every session:

` docker start sonarqube-server `

First Login: user = admin, pwd = admin

> The default embedded H2 database should be used for evaluation purposes only.
> The embedded database will not scale, it will not support upgrading to newer versions of SonarQube, and there is no support for migrating your data out of it into a different database engine.
> Setting up a production grade DB for SonarQube is beyond the scope of this tutorial.

## Link Jenkins to your SonarQube

This video was helpful: [CloudBees How to Integrate SonarQube With Jenkins](https://www.youtube.com/watch?v=KsTMy0920go). It uses a Java project to test it so I stopped there. We are going to use a Node web app project.

### Add Plugins To Jenkins

- Go to Manage Jenkins > Manage Plugins > Available
- Type "sonar" in the search field.
- Install Additonal Plugins:
  - Docker
  - Docker Pipeline
  - SonarQube Scanner
  - Sonar Quality Gates
- Click restart (or not, I have not tested doing this without restart)
- Verify plugins are in the "installed" list.

### Add Credentials for Jenkins-to-SonarQube Communication

We need to add credentials to Jenkins so it can communicate with SonarQube.

#### Get A Token From SonarQube

- Go to SonarQube > Administration Menu > Security > Users
- Add token to the default "admin" user (for testing only, in prod we'd create a new app user)
  - In the "Tokens" column, click "Update Tokens" icon
  - Generate Tokens > "jenkins"
  - Expires in: 1 year (or leave it default 30 days)
  - Click Generate
  - Copy it and protect your clipboard contents until next step

#### Add SonarQube Token to Jenkins Credentials

- In Jenkins, navigate to Dashboard > Manage Jenkins > Credentials > System > Global credentials (unrestricted)
- Click "add credential"
  - Kind: "secret text"
  - Secret: Paste in the secret from SonarQube
  - ID: jenkins-sonar
  - Description: jenkins-sonar

#### Configure A SonarQube Server

- Go to Manage Jenkins > Configure System
- Scroll down to SonarQube section.
- Check Env Var Enable Injection of "SonarQube servers" config...
- Add a server.
  - Name: sonarqube-1
  - Server URL: http://localhost:9000 or http://192.168.0.1:9000 (or whatever you installed it to be)
  - Server auth token: select the token name "jenkins-sonar" that you created in Jenkins earlier

## Test with a Simple Pipeline

!FIX REDO get rid of java, use

Paste this code in the General > Pipeline > Definition Script Box:

```Jenkinsfile
pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  stages {
    stage('Scan') {
      steps {
        withSonarQubeEnv(installationName: 'sonarqube-1') { 
          sh './mvnw clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.9.0.2155:sonar'
        }
      }
    }
  }
```

## Fork The Course Repo

You do NOT have to download the repo. Jenkins will pull it down.

## Option 1: Create Blue Ocean Pipeline for your Fork

If you are in the Manning course, take advantage of the built in link to Chapter 2, section 2.1.1 of the book "Pipeline as Code"

- Go to localhost:8080/blue to get the modern Blue Ocean interface.
- Click create new pipeline
- Follow the wizard
- Click on the link to generate a token on GitHub (you wont need to do this if you created a global github credentials earlier)
  - Come back and paste it in.
- Choose bmi-calculator
- It will scan the repo looking for an existing Jenkinsfile
  - Jenkins won't find one, so then click the "create pipeline" button that appears
- ...
- Add a Stage, name it "Hello World Stage"
- Add a step or type "Print Message" and print "Hello World"
- Save and Run, it will ask you which branch, choose Master (which should be the only one)
- It will run for a while. I have 1Gb ethernet, and it took roughly 5 minutes. It is cloning the repo and parsing it.
- It adds the new Jenkinsfile and commits it (IF it has credentials set up, which it won't)
- Still in the Blue Ocean interface
  - Click on the job to watch the pipeline logs
  - After its run, you can click on the job and click on the Artifacts (upper right corner) > pipeline.log
- Edit the Jenkinsfile to change the message from "hello world" to something else. This should trigger another build.

Option 2: Create Job From Old Jenkins









OLD VERSION
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


###

Put this in a anotehr MD file:
`install-plugins.sh` was removed and replaced with [Plugin Installation Manager Tool for Jenkins](https://github.com/jenkinsci/plugin-installation-manager-tool/#readme)

We can specify a --plugin-file /path/to/file and also --plugins "space delimited list of plugins"

The expected format for plugins in the .txt file or entered through the --plugins CLI option is artifact ID:version or artifact ID:url or artifact:version:url
Script to display list of current plugins in jenkins/script interface
def pluginList = new ArrayList(Jenkins.instance.pluginManager.plugins)

```groovy
pluginList.sort { it.getShortName() }.each{
  plugin -> 
    // println ("${plugin.getDisplayName()} (${plugin.getShortName()}): ${plugin.getVersion()}")
    println ("${plugin.getShortName()}:${plugin.getVersion()}")
}
```

Or download it using `curl https://raw.githubusercontent.com/jenkinsci/jenkins/master/core/src/main/resources/jenkins/install/platform-plugins.json | jq -r -c '.[].plugins[] | select(.suggested==true) | .name' | sort`


### Script to Create Credentials

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

Refs:

- [Run Jenkins in a Docker container — part 1 — Docker-in-Docker](https://davelms.medium.com/run-jenkins-in-a-docker-container-part-1-docker-in-docker-7ca75262619d)

- [Run Jenkins in a Docker container — part 2 — socat](https://davelms.medium.com/run-jenkins-in-a-docker-container-part-2-socat-d5f18820fe1d)

- [Run Jenkins in a Docker container — part 3 — run as root user](https://davelms.medium.com/run-jenkins-in-a-docker-container-part-3-run-as-root-user-12b9624a340b)

- [Docker – Using Docker containers for your Jenkins build nodes](https://devopspoints.com/docker-using-docker-containers-for-your-jenkins-build-nodes.html)

- [Connecting to Docker Daemon from jenkins running inside a docker container](https://stackoverflow.com/questions/66492160/connecting-to-docker-daemon-from-jenkins-running-inside-a-docker-container)




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
