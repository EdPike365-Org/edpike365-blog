---
title: "Devops Tech"
date: "2021-08-23T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - DevOps
---

![DevOps Cycle](devops.jpg)

##### Just Thinkin About DevOps Stuff

<!-- excerpt-end -->

> In this time, the most precious substance in the universe is the spice Melange. ... The spice is vital to space travel. The Spacing Guild and its navigators, who the spice has mutated over 4000 years, use the orange spice gas, which gives them the ability to fold space.

**DevOps is THE SPICE of Successful Companies**

DevOps enables high speed evolution.

DevOps eliminates wasted resources.

**"Software is Eating the World"**, **"Everything Is Code"**, therefore DevOps is key to all success.

We can consider anybody doing anything with code as _software development_:

- SysOps adding infrastructure
- SRE adding chaos testing
- Data Science creating reports
- Machine Learning developing an expert agent service
- Mechanical engineering adding IOT code to a product
- Industrial Engineers adding robots to the factory floor, or programming them
- IT onboarding (or offboarding) an employee, or consultant

## Table of Contents

```toc
exclude: "Just thinkin about devops stuff", "table of contents"
to-heading: 5
```

## The DevOps Cycle

### Design/Plan

- Planning docs should be in version control

#### TDD (Test Driven Design)

[TDD](https://en.wikipedia.org/wiki/Test-driven_development) is key to AI Assisted/No Code future. Took me a bit to come around, but GitHub Copilot AI was the last straw because it will clearly someday be able to write code to pass your tests, so ultimately, software development will consist of designing tests using some sort of language. I think TDD will be as big a see change as DevOps (which already added emphasis to TDD). Programmers might also be involved in writing [DDD](https://en.wikipedia.org/wiki/Domain-driven_design) libraries to support TDD to make it easier to do. All of that will combine to bring the [Semantic Web](https://en.wikipedia.org/wiki/Semantic_Web#:~:text=The%20Semantic%20Web%2C%20sometimes%20known,make%20Internet%20data%20machine%2Dreadable.) to a reality, which will in turn accerlerate AI evolution.

- Design docs need to clearly define exactly what success looks like in the form of tests and expected results. Written by product managers.
- Future: TDD docs will be designed with GUI. Output will be implementation and language neutral.
- Eventually, changing these docs will automatically kick off the entire dev lifecycle. AI will handle implementation. Outside of defining tests (and UI templates), the entire process will be automated. AI will even make recommendations for changes and you might only need to tweak and approve the recommended changes.

#### Architecture Diagrams

[Diagraming Tools For Cloud Infrastructure (redhat)](https://www.redhat.com/architect/diagramming-tools-cloud-infrastructure)

- FigJam (Figma)
- Mermaid
- Lucidchart

#### UI Design Tools

- [Lucid Chart](https://www.lucidchart.com/pages/)
- [Figma](https://www.figma.com/)
- [Adobe XD](https://www.adobe.com/products/xd.html)
- [Storybook](https://storybook.js.org/)

#### Manage Tasks, Issues

- [Jira](https://www.atlassian.com/software/jira/agile)
- [Asana](https://asana.com/)
- [Azure Boards](https://azure.microsoft.com/en-us/services/devops/boards/) Part of Azure DevOps Server (was MS TFS).
- [Trello](https://trello.com/en-US) Kanban, bought by Atlassian (Jira).
- [GitHub Issues](https://github.com/features/issues)
- [UrbanCode Velocity](https://www.urbancode.com/product/urbancode-velocity/)
- [Confluence](https://www.atlassian.com/software/confluence)

#### Version Control

##### Source Code, Designs and Docs

- [Git](https://git-scm.com/)
  - [GitHub](https://github.com/) Owned by Microsoft.
  - [GitLab](https://about.gitlab.com/)
  - [AWS CodeCommit](https://aws.amazon.com/codecommit/)
  - [Azure Repos](https://azure.microsoft.com/en-us/services/devops/repos/)
- Workflows For Devs
  - Branching Strategies
    - [Trunk Based](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development). Good for microservices, small teams, closed source.
    - [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) Good for monoliths, open soure, security centric.
- Workflows for Ops
  - [GitOps](https://www.redhat.com/en/topics/devops/what-is-gitops)

##### Artifacts

- [Github Package Registry (GPR)](https://github.com/features/packages)
  - NPM, Maven Java. Container Registry moved to GHCR (below)
- [Artifactory](https://jfrog.com/artifactory/): JFrog. Universal Artifact Mgt.
- [UrbanCode Release](https://www.urbancode.com/product/release/)
- [Azure Artifacts](https://azure.microsoft.com/en-us/services/devops/artifacts/)
- [Nexus](https://www.sonatype.com/?hsLang=en-us): Sonatype. Repository. Containers.
- Language Specific Artifacts
  - [NPM Packages](https://www.npmjs.com/package/package-list): only for node packages
  - [PYPI (Python Package Index)](https://pypi.org/)
  - [Maven Repo](https://mvnrepository.com/) Java. Gradle uses Maven repos. Defaults to [Maven Central](https://repo.maven.apache.org/maven2/). Google also has a [Maven Repo](https://maven.google.com/web/index.html).
  - [GoLang](https://pkg.go.dev/)
- Images/Containers
  - [Docker Hub](https://hub.docker.com/): limited to docker images
  - [GitHub Container Registry (Docker and OCI)](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) ghcr.io
  - [JFrog Container Registry](https://jfrog.com/container-registry/) docker, OCI
  - [Helm Registries](https://helm.sh/docs/topics/registries/): Roll your own Docker or OCI.

#### Code Editors

- Everything should be code.
- If an app offers a console, try not to use it.
- If a solution looks good but it does not offer an SDK, or at least a REST API, skip it.
- VSCode is my default because it was conceptually built from the ground up to run in a web browser. They made a desktop version while they worked out the pure web kinks.
- I'm trying to learn VIM because its available on all Linux distros (to my knowledge).

### Build, CI/CD

- [Hamcrest](http://hamcrest.org/): Matchers that can be combined to create flexible expressions of intent. Was just Java, now available for most languages.

- JS WebApps:

  - Build
    - [WebPack](https://webpack.js.org/)
    - [Parcel](https://parceljs.org/) Also supports Webassembly
    - [Snowpack](https://www.snowpack.dev/): trying to replace WebPack and Parcel. O(1) build times.
    - [Rollup.js](https://rollupjs.org/guide/en/)
    - [esbuild](https://esbuild.github.io/) The new hotness. Written in GoLang.
    - [Packem](https://packem.github.io/) Written in Rust.
    - [Babel](https://babeljs.io/): ES transpiler
  - Unit Testing
    - [Jest](https://jestjs.io/)
    - [Mocha.js](https://mochajs.org/): Test framework/suite. Modular.
    - [Chai](https://www.chaijs.com/): TDD and BDD assertion framework. Mocah pluginable.
    - [Sinon.js](https://sinonjs.org/): stub, spy, mock. Standalone or plugin.
    - [Jasmine](https://jasmine.github.io/) No external dependencies!
  - Security
    - [AuditJS](https://www.npmjs.com/package/auditjs)
    - [Sonatype Nexus IQ Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=SonatypeCommunity.vscode-iq-plugin)

- Python
  - Uses setup.py file (setup script).
  - [PyBuilder](https://pybuilder.io/)
  - Security
    - [ossaudit](https://github.com/illikainen/ossaudit/#readme)
    - [Jake](https://github.com/sonatype-nexus-community/jake/#readme) BOM
- GoLang: builtin. [Lean Go with Tests](https://quii.gitbook.io/learn-go-with-tests/)
  - Security
    - [Nancy](https://github.com/sonatype-nexus-community/nancy/#readme): Dependency vulnerabilities
- Java:

  - Build
    - [Apache Maven](https://maven.apache.org/)
    - [Gradle](https://gradle.org/)
  - Test
    - [JUnit](https://junit.org/junit5/)
    - [Mockito](https://site.mockito.org/)
    - [TestNG](https://en.wikipedia.org/wiki/TestNG)
    - Cucumber
  - Quality
    - [JaCoCo](https://www.jacoco.org/jacoco/): IDE and Jenkins plugin versions available. Emma replacement.
    - [JTest](https://www.parasoft.com/products/parasoft-jtest/)

- WebApp Run Time Testing: language neutral

  - [Selenium](https://www.selenium.dev/): many language options
  - [Puppeteer](https://github.com/puppeteer/puppeteer): (not Puppet)
  - [LogRocket](https://logrocket.com/): Web client js logging and usage analytics.
  - Load Testing
    - [LightHouse](https://developers.google.com/web/tools/lighthouse/) Build time score generation with Lighthouse CLI for Node. Consider as "code quality" tool.
    - [Apache JMeter](https://jmeter.apache.org/)
    - [Gatling](https://gatling.io/)
    - [The Grinder](http://grinder.sourceforge.net/)
  - Accessibility
    - [LightHouse](https://developers.google.com/web/tools/lighthouse/) Build time score generation with Lighthouse CLI for Node. Consider as "code quality" tool.

### CI/CD

- CI Build Tools: Leverages local build scripting and runtime testing tools, adds integration, optional deployment and delivery

  - [Jenkins](https://www.jenkins.io/)
  - [GitHub Actions](https://github.com/features/actions)
  - UrbanCode
    - [UrbanCode Build](https://www.urbancode.com/product/build/)
    - [UrbanCode Deploy](https://www.urbancode.com/product/deploy/)
  - [CloudBees (CodeShip)](https://cloudbees.com)
  - [TeamCity: JetBrains](https://www.jetbrains.com/teamcity/)
  - [Travis CI](https://www.travis-ci.com/)
  - [Circle CI](https://circleci.com/)
  - [AWS CodePipeline](https://aws.amazon.com/codepipeline/)
    - [AWS CodeBuild](https://aws.amazon.com/codebuild/)
    - [AWS CodeDeploy](https://aws.amazon.com/codedeploy/)
  - [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/#overview)
    - [Azure Test Plans](https://azure.microsoft.com/en-us/services/devops/test-plans/)
    - [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/)
  - Security Scan
    - [OWASP (Open Web App Security Project)](https://owasp.org/)
    - [Probely Security Scanner](https://probely.com/)
    - [Sonatype Integrations](https://ossindex.sonatype.org/integrations)

### Operations

- SysOps practices and tooling overlap with DevOps.
- For more details, see my [SysOps](/edpike365-sysops) and/or [Containers](/edpike365-containers) pages.

### Monitor

- Remote monitoring should include anonymous monitoring agents in webapps.

#### Continuous Feedback

Tickets feed back into [Plan](#plan)

- Tickets
  - [zendesk](https://www.zendesk.com/)
  - [servicenow](https://www.servicenow.com/)
