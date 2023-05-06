---
title: "About Site"
date: "2021-12-27T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - edpike365
  - customizations
---

<!-- excerpt-end -->

### Site Evolution

I wanted to learn about SPA Frameworks (React/Vue/Angular), JAM Stack, GraphQL, CSS in JS, responsive mobile-first design, and NPM publishing. Previous to this, I'd done traditional multipage apps using jQuery and AJAX. The apps were mostly part of a corporate intranet and mostly used on prem and via a desktop browser, so it was a good solution and worked in a pinch on a mobile browser.

I wrote EdPike365.com in [Gatsby](https://www.gatsbyjs.com/) because it checked all the boxes.

The first time I used a fairly elaborate "starter", with [Contentful Headless CMS](https://www.contentful.com/headless-cms/) integration, but realized that I needed a green field if I wanted to learn more deeply; so I started over with the bare minimum [starter blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog).

### Why Gatsby, Not NextJS?

I was interested in search engine rankings (SEO) so I knew I wanted server side rendering (SSR). At the time, Gatsby was a better offer than NextJS.

Since then, NextJS and Gatsby have evolved convergently. NextJS is said to favor programmers like me vs Gatsby, which favors refugees from WordPress. I'm looking for a project to do in NextJS.

#### Gatsby Plugins

Gatsby aims to capture customers who want a step up from WordPress. That demographic is heavy on design skills and lite on programming. They want to just install plugins, not write code. So the plugin infrastructure needs to be large and simple to use. That makes coding plugins all the more difficult and forces a lot of learning.

I wrote 2 plugins: [gatsby-head-style-boss](https://www.gatsbyjs.com/plugins/gatsby-head-style-boss/) and [gatsby-source-build-date](https://www.gatsbyjs.com/plugins/gatsby-source-build-date/). They are NPM modules but they are also Gatsby plugins. They are meant to integrate tightly with Gatsby's server-to-client architecture and extend builds via lifecycle hooks. All content must first be ingested through GraphQL. Learning this all, plus JSX, CSS in JS, at once was tough.

### Modern CSS

Until EdPike365.com, I'd always written CSS in the traditional way to build desktop first sites. I used tables to do layout and divs and spans to format content (static and dynamic). The nav elements (header, navbar, footer) were injected at request time using Java Server Pages (JSPs).

For this site, I chose the [Emotion](https://emotion.sh/docs/introduction) plugin for CSS in JS. I used mobile first design and Emotion linting encourages you to put in usability (A11y) code for site readers, etc.

I got to know [Josh Comeau's](https://www.joshwcomeau.com/) work to handle modern layout and to add some animation (navbar SVG logo on mouseover, entire logo on size transition).

### What about non SSR Frameworks?

I played with [Create React App](https://create-react-app.dev/) and I'll use it for something that requires lively data interaction but not SEO. I might to EdPike365.com's admin interface in it. 

Vue has much smaller market share and not different enough from React from my perspective. AngularJS was much disparaged so I'm skipping that. Angular 2+ was new enough and had small enough share that I put off learning about it. Svelte was essentially in beta back then.

Svelte is extremely interesting to me and Angular 16 has great buzz and native TS support. I will build simple CRUD apps in them as time allows.

### Changes in Journal Form

I am documenting my work and what I learned in my [Site Customization Journal](/edpike365-customizations/).
