---
title: "Past Work"
date: "2021-12-27T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - edpike365
  - goals
---

## Past Work (2000 - 2020)

#### Full Stack Web Apps Developer

- Rich (3 Tier) Web Apps (mostly intranet, extranet)
- REST APIs using Java 8, Tomcat, Jersey
- Complex, multipage CRUD workflows
- Relational DBs
  - Oracle
  - MS SQL Server
  - MySQL
- Wrote and refactored SQL queries, reports
  - complex ERP schema integration (JDEdwards, Ellucian)
  - Oracle stored procedures
- Intranet SSO with MS Active Directory
- Refactoring complex legacy servlets and JSPs to be REST APIs and HTML (AJAX, JQuery)
- Google Maps API integration
- MS CRM server integration for extranet B2B
- Build tooling with Gradle or Maven
- Automatic testing:
  - server with JUnit
  - client with Selenium

#### DevOps

- Evangelist: introduced VCS (git), build tool, automatic testing, IAC concept
- Scoped, secured funding for, and implemented App Monitoring (AppDynamics)
- Managed all VMWare VMs for Tomcat web servers
- Migrated from HTTPD to NGINX load balancers, reverse proxying
- Wrote custom JGit tooling for legacy (IBM Cognos) report editing workflow
- Wrote ETL process for syncing between ERP systems (StarRez to Ellucian)
- TroubleShooting pinch hitter, systems level bug hunter
  - DNS MX records problems during parent corporate mail system integration
  - MS SQL server transient events, hidden triggers, stored procedures, etc.
  - MS Exchange SSO problems (Wireshark), org structure irregularities
- Migrated orphaned GOlang AWS bill review process to Java (Cloudability (bought by DataDog))

#### Communication

- Mentored junior team members
- Tutorials and documentation for APIs (Java, Python)
- Documented DevOps processes
- Systems and Business analyst (situational)
  - from end user interview to working from wireframes
  - Refined legacy UI/UX based on user feedback, extreme forensics required
- MEd In Secondary Science and Engineering Education
  - HS General Engineering, Robotics and Sofware Eng Teacher
    - lessons, tutorials, lectures
    - classroom mgt
  - VEX Robotics team coach and sponsor
- Blogging ([Medium](https://edpike365.medium.com/), EdPike365.com)

## Summary in Prose

- Primary Skills:

  - Full Stack Web App Development

    I started out developing 3 tier apps, first with MS Active Server Pages (ASPs), then Java Server Pages (JSPs). I then moved to "fat client" multi page apps hitting REST services. I was still using JSPs for header, footer, and session mgt.

    I almost exclusively made extranet and intranet apps. The apps were nearly all orphaned "brown field" apps, so they required a lot of forensics and refactoring. I developed SSO code vis a vis MS Active Directory for intranet apps, and MS CRM for extranet access.

  - DevOps and Agile Evangelist and Tools Engineer

    Modifying orphaned legacy apps is difficult. I taught myself DevOps while researching best practices for refactoring. I inherited monoliths with no version control, no testing, no documentation. The code was litered with the former developers human usernames and passwords. Code was updated by copying individual class files over their predecessors. The end users turned over so much they did not know the history of how their apps were developed.

    The last developer job I'd had used SVN and rudimentary unit testing and I knew that the world had moved along since then. I loaded up on books and implemented Git, Gradle, JUnit, and Selenium. I drove adoption of AppDynamics monitoring. I creatdd AD service accounts and pulled all references to user credentials out of the massive code base. I laid out a plan to break apart the Java monolith into microservices.

    I took a contract to develop a CI/CD pipeline for BI report developers. The company was having problems with the reports quietly breaking and presenting erroneous data. Without version control and some sort of automated testing, they could not spot new breaks. I used JGit to create a workflow. I created an interface for the report developers to create JUnit like tests against known data with expected results.

- Secondary Skills

  Full stack web app development touches nearly all infrastructure in a company: DNS, Load Balancers, Networks, Identity, DBs, VMs, ERP apps, file systems, and Email Servers. When an app fails due to timeouts, the problem can be nearly anywhere in the system. I mostly worked in smaller companies, and needed to learn about all of those in the course of being productive.

  - SysOps: In the last job that required me to do Ops, I started learning about IaC (Infrastructure as Code) and helped the limited IT staff learn and begin adopting it. I pitched it as "sharpening the axe" versus "chopping harder".

  - DB Admin: I worked several years at a company that only had a part time, contractor DBA. He delegated a lot of his power to me. The web apps used legacy MS SQL server stored procedures that intermittentantly timed out and it was unclear what was causing it. The queries accessed JD Edwards ERP tables and stored procedures, so I needed to learn the JDE schema to figure out what could be causing it on their end. This recurred when JDE was upgraded.

  - Mentor: I documented and coached best practices for:

    - class, variable and function naming to support self documentation
    - "code smell" avoidance (too much code in one class, entanglement)
    - git workflows, at least daily merge
    - KIS: Keep it simple
    - DRY: Don't repeat yourself (within reason)
    - YAGNI: You aint gonna need it (prevent overengineering, be Agile)
    - SOLID:
      - Single Responsibility Principle: Each function should do only one thing. See also Cross-Cutting Concerns.
      - Open/Closed: Reduce need for code modification. Composition over Inheritance, See also Duck Typing, Code to interfaces.
      - Liskov Substitution Principle: they needed an L, but also basic inheritence. See also Duck Typing, Code to interfaces.
      - Interface Segregation Principle: See also Duck Typing, Code to interfaces.
      - Dependency Inversion Principle: See also Dependency Injection, Inversion of Control.
    - Functional Programming: make code easier to test and comprehend. My practical low key version is reduce the amount of change that your code makes to things outside its scope, ideally zero, but that is often unachievable. Generally pass in all dependencies that will be acted on. See also IoC.

  - Technical Educator

    After the .com crash, I took a detour from software development into
    secondary school science and technology education. I enjoy educating and
    mentoring, and it was a good schedule fit for raising five young school age children. I earned a Masters of Education in secondary education, primarily physics and general science. I ended up using my software experience to instead teach HS software engineering, robotics and CAD.
