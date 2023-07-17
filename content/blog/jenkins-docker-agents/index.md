---
title: "Jenkins Docker Cloud Agents with DinD"
date: "2023-05-22T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - jenkins
  - DinD
  - sonarqube
  - docker
---

Build a local devops stack using a Jenkins container running in Docker and using a DinD (Docker in Docker) container to launch other containers. Containers!

![SonarQube](./sonar.png)

This is part 2 of a series "Local CI/CD With Jenkins in Docker":

- Part 1: [Local CI/CD with Jenkins, Docker, and JCasC](/blog/jenkins-in-docker)
- Part 3: [Jenkins with SonarQube Docker Agent]

Jenkins needs to spin up docker containers as agents. However, Jenkins is running in a docker container. Linux users and groups are isolated within the container for security purposes.

There are various solutions and none of them are great. The one recommended by Jenkins is using a sidecar DinD container. It acts as a broker to give Jenkins access to the "parent" Docker daemon on the host.

## Before Beginning

You need the following assets and you will have them if you completed [Part 1](/blog/jenkins-in-docker) of the series:

- Git CLI
- Docker Daemon
- A Docker network called `jenkins` (confirm with `docker network ls`)
- A `jenkins` container that is ready to use DinD
  - Configured with JCasC and Plugin Manager
  - Supporting files in `~/dev/docker-cicd/jenkins/`
  - GitHub credentials
  - An admin user: myadmin/myadmin
- Ideally, all in a git repo called `docker-cicd`

## Add the DinD (Docker-in-Docker) Container

- The Jenkins.io instructions for installing Jenkins in Docker are [here](https://www.jenkins.io/doc/book/installing/docker/).  I've tweaked them a little below to smooth the way. The biggest difference is that we set Jenkins up first, and now are doing DinD container second, versus the other way around.

- A useful blog to set up Jenkins in Docker, with a DinD cloud agent source, is [here](https://davelms.medium.com/run-jenkins-in-a-docker-container-part-1-docker-in-docker-7ca75262619d). The author gives two other aproaches and, essentially, lays out why you might as well use DinD (and its also what Jenkins docs have you set up).

### Create DinD Container

From Part 1, you should have a project directory in your WSL2 Linux system with a name like `~/dev/docker-cicd/jenkins/`. We could add our DinD container in a multicontainer Dockerfile, etc. I think its better for DinD to have its own directory. This has the  benefit that if we ever need to add a custom Dockerfile, or some automation files, etc, we have a place for them.

- Create a sister subdirectory `~/dev/docker-cicd/dind/`.
- Create a file `docker-run-dind.sh`
- Copy this code to it:

```bash
#!/bin/bash
docker run --name jenkins-dind \
--detach \
--restart no \
--privileged \
--network jenkins \
--network-alias docker \
--env DOCKER_TLS_CERTDIR="" \
--volume jenkins-docker-certs:/certs/client \
--volume jenkins-data:/var/jenkins_home \
--publish 2375:2375 \
docker:dind \
--storage-driver overlay2
```

Arguments explained:

- --name: I named it jenkins-dind because it exists in the Jenkins network, for the use of Jenkins.
- --network-alias: It is pretending to be a docker service, so it has a network-alias of docker.
- This stack is meant to run on your local machine. So we are simplifying our setup by not using TLS.
  - --env DOCKER_TLS_CERTDIR="", instead of "/certs"
  - --publish is 2375:2375, instead of 2376
- This created 2 volumes to persist data between restarts:
  - `jenkins-docker-certs` For persisting and sharing certs so Jenkins can talk to DinD (not used in our setup)
  - `jenkins-data` TODO: find out why DinD needs this 😊. I would think Docker cloud agents think they are node agents and therefore communicate with the controller with SSH or jnlp. I'm guessing this is a "backdoor" because the controller is in fact the actual agent.
- --storage-driver [overlay2](https://docs.docker.com/storage/storagedriver/overlayfs-driver/#:~:text=The%20overlay2%20driver%20natively%20supports,inodes%20on%20the%20backing%20filesystem.)

Run it with: `bash docker-run-dind.sh`

Now DinD is listening on port 2375 and Jenkins can reach it on `tcp://docker:2375`. You can access the container with `docker exec -it jenkins-dind bash`.

### Configure Docker Cloud

- The Docker plugin should already be installed during [Part 1](/blog/jenkins-in-docker).
  - If not, install the Docker plugin `docker-plugin`
  - The Docker plugin also installs the `docker-java-api`
- Go to Dashboard > Manage Jenkins > Manage Nodes and Clouds > Configure Clouds (in upper left corner)
- In "Add a new cloud" dropdown choose Docker.
- Name: docker
- Docker Cloud Details
  - Docker Host URI: tcp://docker:2375
  - Server Credentials: -none-
  - Click "Test Connection"
  - Check "Enabled"
- Docker Agent templates
  - Labels: jenkins-agent
  - Check "Enabled"
  - Name: jenkins-agent
  - Docker Image: `jenkins/agent:latest-jdk11`
  - Remote File System Root: `/home/jenkins/agent`

> We are configuring "cloud agents" the old fashion way. This is not the same as creating docker containers on the fly in a pipeline. We'll cover that later.

We use the generic `jenkins-agent` image for now. Add other agent images as you need them.

### Test Docker Cloud

Test your docker cloud by running a simple Freestyle Job.

- Dashboard > New Item
  - Item Name: docker cloud test
  - Freestyle project
  - Click "OK"
- Configure
  - "Restrict where this project can be run": jenkins-agent
  - "Build Steps" > Execute shell:
    - echo "Hello World!"
  - Save
- Project Page
  - Build Now (it will have to pull the jenkins-agent image down first time, be patient)
  - Click on the build record "#1" in the lower left corner
  - Click "Console Output"

> The DinD container has its own Docker daemon, the images and containers are running in it. If you want to see whats going on, you'll have to do something like `docker exec -it jenkins-dind docker image ls`. In this case you see the downloaded `jenkins-agent` image. Next time it will run quickly.

### Test DinD Container Image Persistance

- `docker stop jenkins-dind`
- `docker start jenkins-dind`
- Wait for it to boot, maybe a minute
- `docker exec -it jenkins-dind docker image ls`
- `jenkins-agent` should still be there.

## SonarQube

To use SonarQube with Jenkins, there are 3 components:

- SonarQube Server:
  - can be anywhere on the internet
  - holds quality gate configuration
  - ours is running locally in Docker
- Jenkins SonarQube Plugin:
  - stores connection configurations to one or more SonarQube servers, including credentials
  - exposes a webhook endpoint that lets SonarQube send asynch information back to Jenkins
- SonarQube Scanner Plugin: scans pipeline target code locally on a Jenkins agent. Sends summary info to the designated SonarQube server, where it is analyzed and persisted.

### SonarQube Server in Docker

Create a sister subdirectory: `~/dev/docker-cicd/sonarqube/`

- Do ***NOT*** follow the instructions on [Try Out SonarQube](https://docs.sonarqube.org/latest/try-out-sonarqube/). It will create a transient version and we need to persist access tokens, etc, across out DevOps sessions.
- To create a persitent install, we make modified directions from [here](https://docs.sonarqube.org/latest/setup-and-upgrade/install-the-server/#installing-sonarqube-from-the-docker-image).

Sonarqubes default instructions assume you want to set up Oracle DB. In this tutorial, we are only ever going to use the default H2 DB.

> The default embedded H2 database should be used for evaluation purposes only.
> The embedded database will not scale, it will not support upgrading to newer versions of SonarQube, and there is no support for migrating your data out of it into a different database engine.
> However, setting up a production grade DB for SonarQube is beyond the scope of this tutorial.

Create a file `~/dev/docker-cicd/sonarqube/docker-run-sonarqube.sh` and paste the below into it.

```bash
docker run -d --name sonarqube \
  --restart unless-stopped \
  --network jenkins \
  -p 9000:9000 \
  -v sonarqube_data:/opt/sonarqube/data \
  -v sonarqube_logs:/opt/sonarqube/logs \
  -v sonarqube_extensions:/opt/sonarqube/extensions \
  sonarqube:9.9.1-community
```

Arguments Explained:

- I set `--restart=unless-stopped`. This is like "always", but if I `docker stop` it or it crashes, it won't restart on Docker daemon reboot, computer restart.
- Create volumes to prevent loss of info between sessions:

> I could have added `-env SONAR_FORCEAUTHENTICATION=false` to disable SonarQube auth so Jenkins would not need credentials but I think its valuable to learn it so I left it as the default value: `true`.

#### First Run

We use this first run to set up our project and get credentials to access it remotely from Jenkins.
The settings are persisted in the Docker volumes created above.

- Run SonarQube with `bash docker-run-sonarqube.sh`
- Access it at [localhost:9000](http://localhost:9000). First login is: user = admin, pwd = admin. It forces you to change. I changed mine to admin/myadmin

#### Create Webhook

In SonarQube:

- Navigate to Home > Administration > Configuration dropdown > Webhooks
- Click "Create" and configure the popup:
  - Name: jenkins-localhost
  - URL: http://jenkins:8080/sonarqube-webhook/
  - Click "Create"

#### Create Quality Gate

SonarQube comes with a default quality gate, called "Sonar way", that is used to grade code unless a specific one is specified.
Lets create another one!

In SonarQube:

- Navigate to Home > Quality Gates  
- Click "Create"
  - Name "wu way" (it is created with default "Clean as You Code" conditions)
- Edit Condition Setting
  - Scroll down and click "Unlock Editing" (an "Add Condition" button appears above the Conditions list)
  - Click "Add Condition"
- "Add Condition" Popup
  - Check "On Overall Code"
  - Quality Gate fails when (dropdown): Maintability Rating
  - Operator: is worse than A
  - Click "Add Condition"
- Edit Condition Setting
  - We could make this the default gate by clicking "Set as Default" (upper right corner). However, we will not so we can learn how to specify one in our pipeline.

Once it works, add SonarQube server container to our stack: `~/dev/local-cicd/start-stack.sh`

### Jenkins SonarQube Plugin

- The SonarQube plugin lets Jenkins store SonarQube server locations and connection credentials.

- It also creates a webhook endpoint that lets SonarQube server send back the analysis summary and a Quality Gate pass/fail signal for your pipeline.


#### Step 1: Get a SonarQube Token

When we add the SonarQube server to Jenkins (Step 3), we'll need a SonarQube token. The "Add" button in Jenkins wizards does not work dependably for me, so I get it ahead of time and set it up so that it appears in the Jenkins SonarQube plugin config wizard.

In a SonarQube browser tab, Log into SonarQube

- User (upper right corner) > My Account (near upper right corner)> Security
- In the Tokens panel > Generate Tokens, fill in the form
  - Name: Local Jenkins Token
  - Type: user
  - Expires: 1 year
  - Click "Generate"
  - Copy the token, you won't see it again

#### Step 2: Add a Secret Text credential to Jenkins

In a Jenkins tab, logged in as an admin:

- Dashboard > Manage Jenkins > Credentials > System > Global > New Credential
  - Kind: Secret text
  - Scope: Global
  - Secret: paste the SonarQube token here
  - ID: sonarqube-localhost
  - Click "Create"

```yaml
credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              scope: GLOBAL
              password: ${SONARQUBE_TOKEN}
              id: "sonarqube"
              description: "SonarQube token"
```

#### Step 3: Create Jenkins SonarQube Config

- Dashboard > Manage Jenkins > Configure System
  - scroll down to the `SonarQube servers` configuration section
  - Check "Environment variables"
  - click `Add SonarQube`, and add the values you're prompted for.
    - Name: sonarqube-localhost
    - Server URL: http://sonarqube-server:9000
    - Server authentication token dropdown:
      - Choose "sonarqube-localhost"
    - Click "Save"

### Using SonarQube Scanner Extension

There are 4 different SonarScanner Jenkins plugins:

- [SonarScanner (Generic)](https://docs.sonarqube.org/9.8/analyzing-source-code/scanners/sonarscanner/) Image: sonarsource/sonar-scanner-cli
- [SonarScanner for Maven](https://docs.sonarqube.org/9.8/analyzing-source-code/scanners/sonarscanner-for-maven/)
- [SonarScanner for Gradle](https://docs.sonarqube.org/9.8/analyzing-source-code/scanners/sonarscanner-for-gradle/)
- [SonarScanner for .NET](https://docs.sonarqube.org/9.8/analyzing-source-code/scanners/sonarscanner-for-dotnet/)

???
We use the "generic" SonarScanner plugin because it can be run within a docker container and there are run as non-root options.

### SonarQube Scan Pipeline

This uses the SonarScanner CLI docker image. It normally requires some env vars to set Sonar Server connection information. We use the Jenkins Sonar Plugin (above), which lets us inject that info using `withSonarQubeEnv`.

```groovy
pipeline {

  //can we do agent none?
  agent any
  
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }

  stages {
    
    //Static Code Analysis
    stage("SCA") {
      
      agent {
        docker {
          image 'sonarsource/sonar-scanner-cli:latest'
        }
      }
      
      // NO echos allowed outside steps
      steps {
        
        echo "!!! Step 1: SonarQube scan "
        
        // withSonarQubeEnv() does not have a credentials arg because we set that up in the plugin
        withSonarQubeEnv(installationName: "sonarqube-localhost") { 
          
          sh "sonar-scanner -Dsonar.projectVersion=1.0 -Dsonar.projectKey=react-bmi-app -Dsonar.sources=src" 
          
          // if we used one of the other 3 SonarQube scanners, config would look like this
          // sh './mvnw clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.9.0.2155:sonar'
        }

        // TODO: Step 2: Quality Gate
        
      }
    }
  
  }
}
```

Explanation:

- `sh "sonar-scanner -Dsonar.projectVersion=1.0 -Dsonar.projectKey=react-bmi-app -Dsonar.sources=src"`
  We pass in the SonarQube project configs here. We could instead have a `sonar-project.properties` file in the target repo that has similar args. This line would then be `sh 'sonar-scanner'`
  - `-Dsonar.projectKey=react-bmi-app` designates which "project" to store the analysis results in on SonarQube server. Does the project have to be defined on SonarQube or is it auto created if it does not exist???

### Add SonarQube QualityGate

#### Configure the QualityGate
 
 to SonarQube

#### Add Jenkins WebHook on SonarQube Server

SonarQube calls back to Jenkins when it is done analyzing the code. It uses a webhook to do so and we have to set that up.

The Jenkins SonarQube plugin automatically exposes a webhook address at 

In SonarQube:
-

Add this as a second step in the Jenksfile from above;

```groovy
        echo "!!! Step 2: Wait Quality Gate"
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
```

From [SonarQube Scanner for Jenkins](https://www.jenkins.io/doc/pipeline/steps/sonar/)

```groovy

 pipeline {
        agent none
        stages {
          stage("build & SonarQube analysis") {
            agent any
            steps {
              withSonarQubeEnv('My SonarQube Server') {
                sh 'mvn clean package sonar:sonar'
              }
            }
          }
          stage("Quality Gate") {
            steps {
              timeout(time: 1, unit: 'HOURS') {
                waitForQualityGate abortPipeline: true
              }
            }
          }
        }
      }

```











## Link Jenkins to your SonarQube

This video was helpful: [CloudBees How to Integrate SonarQube With Jenkins](https://www.youtube.com/watch?v=KsTMy0920go). It uses a Java project to test it so I stopped there. We are going to use a Node web app project.

### Confirm/Add Plugins To Jenkins

- Go to Manage Jenkins > Manage Plugins > Installed
- Verify plugins are in the "installed" list.
  - Docker
  - Docker Pipeline
  - SonarQube Scanner
  - Sonar Quality Gates

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
