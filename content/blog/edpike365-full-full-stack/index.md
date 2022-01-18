---
title: "The Full, Full Stack"
date: "2021-12-27T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - edpike365
  - "Full Stack"
  - DevOps
  - SysOps
---

### How I Grew From Full Stack Dev to DevSecOps

|                          The Books That Saved Me                          |
| :-----------------------------------------------------------------------: |
| ![Books I Bought And Read On My Own Time Just To Keep Up](/Mah_Books.jpg) |

This is the story of how I expanded from a Full Stack Developer and learned DevOps and SysOps. At first from necessity, later, because I loved it.

> "If you wish to make apple pie from scratch, you must first create the universe." Carl Sagan

I started my career as a 3 tier web applications developer. That was fine as long as I was dealing with green field projects, and in the early days, they always were. I controlled the DB schema, the SQL queries and all the ASP or JSP code. I could do my job and sleep at night because I never published anything without a ton of manual testing. If my sites went down, it was because the internet, or the physical server box in the closet, went down.

My apps were rock solid. I'm a fiendish tester: I test like its a game and I'm out to trick the app (especially if its my own code). Why? Fear of being shamed :-)

After the .com collapse, I got an MEd, primarily in secondary science education, but became a Technology teacher in the end. Total time for degree and teaching: 4 years.

Then my family dynamics meant that I needed to stay home with our five school age children while my wife worked. She finished grad school and took a 2 year National Health Service gig as a midwife and we ended up assigned to Lancaster, PA. My wife spent her time delivering Amish babies across the countryside while I lived in town as a homemaker.

We got back to Portland and I re-entered the private sector. I wanted to be near the science community and ended up on staff at nearby Reed College. I took the first job I could get there, which was as an Oracle Data Analyst. I was only allowed to use reporting tools. Reed had heavily customized their schema, so I learned complex SQL (versus what I'd written for web apps) and really pushed my SQL/PLSQL skills to the edge. However, I was not allowed to interact with the researchers in my job role and no jobs supporting them directly opened up. After two years, I grew frustrated and I also wanted to develop applications again, not just reports.

### Company A: Full Stack, DevOps, BI

I went to work at Company A, with a giant legacy code base and tremendous technical debt. The code and the infrastructure were a giant pile of spagheti sprinkled with snowflakes, served on a paper plate in an old hoarders house. Everything was in production and randomly on fire and nobody knew where the fires were without first finding then digging through logs.

I was hired for a 1 month emergency contract to fill the gap before the full-time hire showed up. All the intranet programmers and the DB admin had left without warning and refused to help the company, and therefore me, because there was a lot of bad blood. They would not even reveal where they had gone to work because our company president was harassing the other company's president for poaching the first person that left. It turned out, much later, that they had all followed him to the new company.

I was walking into a mine field filled with buried bodies: no documentation, no version control, horrible code with variable names like "s" and "num". Most JSP code was not in classes or functions but in 1,000's of lines of code with switches in between. Many JSP's were just old servlet code pasted into a JSP, so it contained escaped JS and HTML code. Some of that escaped JS code was responsible for generating and reading JS, SQL and HTML code passed **via query string**. DB passwords were embedded on every page, no connections were closed at end of scope. We were stuck with Java 1.4 even though the LTS was Java 7 and near EOL. Before I could upgrade, I had to dig out a Java 1.4 lib that was used _everywhere_ and would not work with 1.7.

### Code Inside Code, Nested In Code that was Stored in a DB

The SQL queries, embedded in the pages, returned data but also HTML, JS and **more** sql. Giant stored procedures had the same "design". The IDE and compiler were no help there. Things were breaking constantly when I arrived. Our new part time DB admin was just as blind. The DB tables and queries extended the ERP data schema, which had been customized, with no docs. The customizations had long ago prevented upgrade of the ERP packages, or support from the vendor. Attemps to apply patches to the ERP would break it, but also the website, with no error messages.

The understaffed IT/ops team spent most of its time taking care of onboarding, phones and PC support. They understandably refused to take on web server support, refused to learn Linux. The application servers, DNS and load balancers were considered explosive snow flakes and they refused to touch them.

### I Discovered That I Loved the Challenge

Long story short, I "had" to step into the entire stack. I air quoted "had" because, by the end, I actually enjoyed understanding the entire stack all the way down to VMSphere, server racks and data center fire suppresion system.

I walked in ready to refactor the JSPs and generall put out fires until the real hire arrived. To do that I first had to help the DB admin, the ERP admin, and take over ops where it related to any intranet apps (and some customer facing web stuff). That meant:

- learning SQLServer admin
- learning VMSphere admin
- learning HAProxy
- replacing Apache load balancers with NGINX

Among other things, I also learned about DevOps, REST APIs, which had become a thing while I was out of the industry. That meant:

- learning distributed logging and monitoring (I drove purchasing, and implemented, AppDynamics monitoring)
- learning the JDEdwards Schema and IBM Websphere, to help solve ERP problems. Though we had an admin, he was only an "operator".
- I decided that as time allowed, I'd migrate the JSP/Servlets to plain web pages and REST APIs.
- I found and implemented Git
- I found and implemented Gradle
- I found and implemented and automated testing tools (JUnit, Selenium)
- I evangelized and implemented Agile and DevOps culture
- I evangelized "infrastructure as code" in the IT dept (we shared a big office)
- I evangelized moving to AWS (SARBOX was forcing the company to put expensive fire control systems in the server room and server racks were already old and full)
- I explored using TDD, Spring and Hibernate (though we did not commit to it by the time I left)

### New Contract, Similar Problems

In the end, I was extended for over a year, then they lost funding for me. I then took a 6 month contract at, lets call it, Company B.

Company B was a very large and well funded company with 100's of devs, IT and a whole DB department. The DevOps pipeline product I developed for them worked against the test copy of the DB, but it would fail vs the production DB. The only variables in my code were on the command line at launch time: DB URL, username, password.

> Never, ever put logic in your code that knows anything about whether you are in dev, testing or prod! It is literally untestable.

The calls to the prod DB would time out, no errors returned. The DB admins, when they would deign meet with my team, swore it could not be them. My managers had a bad relationship with the DB admins and supected them, but they also could not view the DB server configs and did not have time to look through my code to prove that it was not me.

The project ended in stalemate and was put on pause. I got invited back to Company A. Now they had funding to hire me full time (even though it had cost them more when I was contractor) as the Senior Engineer.

A few months later Company A's DB team finally discovered that they had not set up the DB test properly and my app worked. I was invited back to continue the project, but I was off the market.

In my tiny, dysfunctional company department, I had the luxury of never being fully stopped at walls between departments. I could see that the curse had been a blessing in disguise. We were so understaffed that if, for example, I needed admin access to the DB, I got it.

Perhaps I'd have been able to find the problem with the Company B's DB if I had been given at least view access to the server config. I absolutely love solving problems and clearing roadblocks. But at typically staffed companies, the fulltime DB admins are gatekeepers and typically are punished harder for letting the wrong data out than for denying legitimate access to the data or configs (a horrible conundrum for them, and app developers).

### Lesson Learned

> "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb" A Famous 1964 Movie

I loved understanding how everything fit together.

Unfortunately, after that brief funding relief, Company A's parent company started cutting our budget again, despite critical problems. For example: we had a critical C&C machine that _had_ to be connected to a phsyical **Windows 98** machine in 2016 and we could not even get that machine replaced. The SARBOX audit labelled it a flaming menace. Meanwhile, the marketing dept down the hall got remodeled.

I lost hope for the future and moved on, but now I'm seeking a position that rewards understanding `The Full, Full Stack`.
