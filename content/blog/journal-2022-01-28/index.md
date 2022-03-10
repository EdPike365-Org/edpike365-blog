---
title: "Journal: Template 2022-02-13"
date: "2022-02-13T22:12:03.284Z"
status: draft
author: EdPike365
tags:
  - edpike365
  - GraalVM
  - DevOps
  - SynBio
  - STEM
  - BioDevOps
---

[Log](#log) | [Articles](#articles) | [Books](#books), [Events](#events), [Companies/Orgs](#orgs), [People](#people), [Training/Classes](#training), [Definitions](#definitions), [Future Research](#future)

---

#### Summary

Sharpening the saw. Clarifying strategic and near term goals. Migrating Gatsby from 3 to 4. Migrating projects from Windows to WSL2 Linux and devcontainers. Looking for Docker Desktop replacement that works with devcontainers. Rounding up old rogue side projects and triaging, delete, public or private repos.

#### Log <a name="log"></a> (LIFO)

- 2022-02-12: Narrowing down my next steps

  - I'm super excited by, in rough order:
    - GoLang serverless microservices (via containers), also for Kubernetes
    - Python
    - Kubernetes and SysOps/SRE, IaC, EaC, DevSecOps
    - ML, MLOps, Data Engineering
    - BioDevOps, BioCloudLab IOT
  - HOWEVER, I've got to get a remote job soon and my best chance of doing that is via leveraging my past experience with:
    - Java Web Apps:
      - 1 demo JSP (independent, non MVC, Spring with embedded Tomcat)
      - Vanilla HTML pages with CRUDS with JQuery (2?), hitting a Java Rest API
        - Mocha/Chai Tests
      - Spring Boot REST API, GraalVM
      - PostGres using SQL
      - Selinium
    - GatsbyJS
      - 2 NodeJS Gatsby plugins (contain server and client side code)
    - Basic DevOps
      - Jenkins
      - Maven, Gradle
      - Auto testing:
        - JUnit, Mockito
    - Docker, and Docker Compose (though its a deprecated tech for me)
  - And demoing things I have not used in production:
    - GraphQL API: aggregate 2 DBs.
      - MongoDB
      - Redis?
    - React App hosted on S3
      - SPA, Responsive Mobile First
      - CRUDS forms
      - TS
      - Jest
      - Selinium (or Puppeteer) (I'm guessing React selectors will be much harder)
    - Okta SSO
  - AWS Demo
    - CloudFormation or Terraform to deploy my demos to the web

- 2022-02-06 Reflections on Tech News
  - Google really improved their password manager with Android/Chrome integration, so I finished migrating away from my previous password manager. Google already notified me that a major financial firm that I use leaked my password!
  - VSCode released more improvements for, among other things: remote dev, remote containers, browser and PWA based dev and Python plugin.

### Articles <a name="articles"></a>

- [Could Rust be the Future of JavaScript Infrastructure?](https://thenewstack.io/the-case-for-rust-as-the-future-of-javascript-infrastructure)
- [Kong Cast: Simplifying Authentication for Microservices Security | Jeff Taylor | Okta](https://www.youtube.com/watch?v=2qpRJxvuAVY&t=916s): TLDR API gateway instead of authing each microservice. Kong Connect.
- [StatsD: What Is It and How To Monitor It](https://www.metricfire.com/blog/statsd-what-is-it-and-how-to-monitor-it/)
- [Htmx: HTML Approach to Interactivity in a JavaScript World](https://thenewstack.io/htmx-html-approach-to-interactivity-in-a-javascript-world/)
  - This classic MPA vs SPA video came up: [Have Single-Page Apps Ruined the Web? | Transitional Apps with Rich Harris, NYTimes](https://www.youtube.com/watch?v=860d8usGC0o&t=3s)
  - [HUDs and GUIs website](https://www.hudsandguis.com/)
- [Provably Space-Efficient Parallel Functional Programming](https://blog.sigplan.org/2022/01/13/provably-space-efficient-parallel-functional-programming/) Pre assigning heap chunks to threads to circumvent limited mememory manager capacity, which is a big problem with functional software (lots of objects, lots of creating new ones because you dont modify existing ones (you create a new copy))
- [What is Graph Intelligence? How and why the best companies are adopting Graph Visual Analytics, Graph AI, and Graph Neural Networks](https://www.graphistry.com/blog/what-is-graph-intelligence-how-and-why-the-best-companies-are-adopting-graph-visual-analytics-graph-ai-and-graph-neural-networks)
- [Cloud-Native Apps With Open Application Model (OAM) And KubeVela](https://www.youtube.com/watch?v=2CBu6sOTtwk)
- [Amazon Lambda Containers - How to Package AWS Functions as Container Images](https://www.youtube.com/watch?v=DsQbBVr-GwU) Includes a GitPod demo. Uses AWS ECR for Lambda:GoLang image. Dec 2020. They are heavier than a zip, but have potential for CI/CD pipeline.
- [How To Create Virtual Kubernetes Clusters With vcluster by Loft](https://www.youtube.com/watch?v=JqBjpvp268Y). See Also: Capsule.
- [Obfuscation Revealed: Leveraging Electromagnetic Signals for Obfuscated Malware Classification](https://dl.acm.org/doi/10.1145/3485832.3485894)
- [Why you shouldn’t use hexagonal architecture with Go](https://robertoplazaromero.medium.com/why-you-shouldnt-use-hexagonal-architecture-with-go-a58bc9fcd2a3)
- [GopherCon 2018: Kat Zien - How Do You Structure Your Go Apps](https://www.youtube.com/watch?v=oL6JBUk6tj0): Answer: DDD? no, add Hexagonal.
- [Devops Software Quality](https://www.it-cisq.org/use-cases/devops-code-quality.htm)
- [Use Python and R in your Java aaps with GraalVM](https://blogs.oracle.com/javamagazine/post/java-graalvm-polyglot-python-r?source=:em:nw:mt::::RC_WWMK200429P00043C0051:NSL400215299&elq_mid=214121&sh=22230426092311181622312817350212&cmid=WWMK200429P00043C0051)
- [Architecting Applications for Kubernetes](https://www.digitalocean.com/community/tutorials/architecting-applications-for-kubernetes?utm_medium=email&utm_source=IaaN&utm_campaign=01272022&mkt_tok=MTEzLURUTi0yNjYAAAGCO37-oxEAuqONrlvMehAvm3XR2eZ0r08ZXmerNgHtfM8JTI6N-VLjyULUdPEQSO8lT5Zl1NhuDdzecae_FnPx72xR47mj9QOYbUDsafL2kw)
- [Design patterns for container-based distributed systems](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/45406.pdf)
- [Five-Drug Cocktail and Wearable Bioreactor Enable Regrowth of Amputated Adult Frog Leg](https://www.genengnews.com/topics/translational-medicine/regenerative-medicine-tissue-engineering/five-drug-cocktail-and-wearable-bioreactor-enable-regrowth-of-amputated-adult-frog-leg/?MailingID=%DEPLOYMENTID%&utm_medium=newsletter&utm_source=GEN+Daily+News+Highlights&utm_content=01&utm_campaign=GEN+Daily+News+Highlights_20220127&oly_enc_id=8775B4188445A5C)
- [Symbiotic Microbes in Hibernating Squirrels Inform Space Travel](https://www.genengnews.com/topics/omics/symbiotic-microbes-in-hibernating-squirrels-inform-space-travel/?MailingID=%DEPLOYMENTID%&utm_medium=newsletter&utm_source=GEN+Daily+News+Highlights&utm_content=01&utm_campaign=GEN+Daily+News+Highlights_20220128&oly_enc_id=8775B4188445A5C)
- [Git FlashCards, Noice](https://gitfichas.com/en?mem=link&mkt_tok=NzEyLVZYVy0xNTgAAAGCebkjDKgA346QA0PcsHsettX4HaS1k_uXYi1pI3TCvST42qfpD2LmRGtEsNky2fyio0TwgHxqJndQlauzpsPZr_hhWDC-aW6kM8v4jL9jkRSXeg)
- [Pluralsight 2022 Forecast](https://www.pluralsight.com/blueprint/2022-forecast?exp=3)
- [VS Code Day 2021 Keynote with Erich Gamma: "10 yr Overnight Success"](https://www.youtube.com/watch?v=hilznKQij7A&list=PLj6YeMhvp2S6uB23beQaffszlavLq3lNq): Useful to know VSCode remote arch. for DevOps engineers.
  - Startup. Originally called Monaco.
  - Started in 2013, to run in browser, but then they pivoted to Electron, so they are just now reaching the original goal. Was always "Web First", so they always thought about weight.
    - Latest focus on Testing WIP UI, better line highlighting.
    - Jupyter Notebook Server integration.
    - Codespaces (github.dev, how vscode.dev diff?)
  - Keep your code "fit" so you can pivot to take advantage of opportunities.
- [Remote Development with VS Code](https://www.youtube.com/watch?v=sakjpegUQsk&list=PLj6YeMhvp2S6uB23beQaffszlavLq3lNq&index=2)
  - Huge Mono repos (too big to fit on one machine)
  - ML, data science (GPU Heavy)
  - WSL 2 got better
  - Keep env setup remote, no duplicating on your own machine
  - 4 Remote Dev Extensions
    - "Remote" WSL: e.g. install Python in Ubuntu, not windows. VSCode installed in windows.
    - Remote Containers (includes using .devcontainer in local dev)
    - Remote SSH: you can run htop
    - GitHub Codespaces
- [Cont. Delivery Foundation: Keynote Session: Developer Experience & Productivity: Level up Your Engineering Effectiveness](https://www.youtube.com/watch?v=FgkhYhRopfs)
- [Google AlphaCode vs GitHub CoPilot](https://medium.com/@Sabrina-Carpenter/google-in-god-mode-want-to-put-programmers-out-of-work-dd488e6ebca)
- [Medieval City Map Generator](https://watabou.github.io/city-generator/?size=15&seed=930879764&greens=0&farms=1&citadel=1&urban_castle=0&plaza=1&temple=1&walls=1&shantytown=0&coast=1&river=0&gates=-1&sea=0)

### Books <a name="books"></a>

- To Read: Get Your Hands Dirty on Clean Architecture: A Hands-on Guide to Creating Clean Web Applications with Code Examples in Java

### Events <a name="events"></a>

- [SKILup Day: Site Reliability Engineering](https://www.skilupdays.io/Sre-22?login=ML) DevOps Institute. Viktor Farcic, Developer Advocate, Upbound, is gonna be there.
- [Contiuous Delivery Foundation: 2021 Annual Report](https://cd.foundation/annual-report-2021/?utm_campaign=CDF%20Email%20Blasts&utm_medium=email&_hsmi=202934582&_hsenc=p2ANqtz-_jQJiw7rxTNvoW-cANK5gtlV0UzWfOEukmJ9mvRAoe5iPehcIfT6mTbNYjpCG9ajCoMEZIBOY6TnUSyXKjzLO8i9lWZw&utm_content=202934582&utm_source=hs_email)
  - Raw Events Table > ETL > 3 sub types
    - Changes
    - Deployments
    - Incidents
  - 4 KEY METRICS: Best Metrics derived from these 3 event types
    - Deployment frequency: % days that had any deployment that was successful
      - Volume is no good (Deploys/time period). Freq is more important.
    - Lead Time to Change: the MEDIAN amount of time it takes a commit to get to into production
      - (Deployments plus Changes)/time
    - Change Fail Rate: The percentage of deployments causing a failure in prod.
      - Deployments/Incidents
    - Time to Restore: How long it takes an org to recover from a failure in prod
  - 2 Antipatterns
    - Team vs Team:
      - apples to organges
      - not fair. mitigating circumstances: tech debt, constraints
    - Taylorism: When measurement becomes the goal
      - Invites gaming
      - Soaks up energy

### Companies/Orgs <a name="orgs"></a>

- Cloud Bees
- [Continuous Delivery Foundation](https://cd.foundation/): Created by Linux Foundation in 2019. Home for Jenkins, Jenkins X, Spinnaker, Tekton. Linux Foundatio is also the parent of CNCF.

### People <a name="people"></a>

### Training <a name="training"></a>

- Cloud Bees Jenkins Cert

### Definitions/Acronyms <a name="definitions"></a>

- [Open Application Model (OAM)](https://oam.dev/) "Focused on application rather than container or orchestrator, brings modular, extensible, and portable design for modeling application deployment with higher level yet consistent API."
- gRED: Genentech Research and Early Dev
- DevSci: translational science org
- FAIR: Findable, Accessible, Interoperable and Reusable
- High-dimensional data
  - Single-Cell Sequencing: TCR-Seq, CITE-Seq
  - Spatial Transcriptomics
  - bulk RNA-Seq
  - Whole Exome Seq
  - Whole Metagenomics/microbiome
  - Digital Pathalogy
  - Complex Flow Cytometry

### Future Research <a name="future"></a>

Things I ran across and thought "Oh yeah, I need to look into that sometime, but not now."

- [Apache Solr (vs Elasticsearch) 2022](https://sematext.com/blog/solr-vs-elasticsearch-differences/#:~:text=Solr%20has%20more%20advantages%20when,like%20log%20analysis%20use%20cases.) Looks like Solr is aging out, but still needed. Both are changing to offer what the other has. Both based on Lucene NRT (near realtime search). Solr is truly open source.
- [Gartner Magic Quadrant for Insight Engines](https://www.coveo.com/en/resources/reports/gartner-magic-quadrant-for-insight-engines?utm_source=google&utm_medium=cpc&utm_channel=paid-search&utm_campaign=competitor&utm_adgroup=competitor-elasticsearch&utm_term=elasticsearch%20vs&utm_content=gartner-mq-2021&gclid=Cj0KCQiA0p2QBhDvARIsAACSOOP92r9LyPop8_cAv3FS52R7nAZuycYU_Fg-O3ebbZDuzfk3V3vnPyAaAmfsEALw_wcB)
- [Eclipse Theia Cloud and Desktop IDE Platform](https://theia-ide.org/) Platform to develop IDE's. Uses LSP (Language Server Protocol, same as VSCode, so can host VS Code extensions, full terminal access). Uses DAP (?), for what? Inspired by VSCode, but wanted true Open Source.
