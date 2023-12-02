---
title: "Portfolio"
date: "2023-09-01T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - edpike365
  - portfolio
---

<!-- excerpt-end -->

[GitHub](https://github.com/EdPike365)

- [edpike365-blog](https://github.com/EdPike365/edpike365-blog)
- [GatsbyHeadStyleBoss](https://github.com/EdPike365/GatsbySourceBuildDate)
- [GatsbySourceBuildDate](https://github.com/EdPike365/GatsbyHeadStyleBoss)
- [gatsbyjs-devcontainer](https://github.com/EdPike365/gatsbyjs-devcontainer)

[DockerHub](https://hub.docker.com/u/edpike365)

- [gatsbyjs-devcontainer](https://hub.docker.com/r/edpike365/gatsbyjs-devcontainer)

[npmjs](https://www.npmjs.com/~edpike365)

- [gatsby-head-style-boss](https://www.npmjs.com/package/gatsby-head-style-boss)
- [gatsby-source-build-date](https://www.npmjs.com/package/gatsby-source-build-date)

[Medium](https://medium.com/@edpike365)

- [Gatsby + Contentful Rich Text: Migrate to gatsby-source-contentful v4+](https://edpike365.medium.com/gatsby-contentful-rich-text-migrate-to-gatsby-source-contentful-version-4-in-early-2021-321904587470)
  - This got used in a [YouTube video](https://www.youtube.com/watch?v=RnWmtpT6Ttg).
- [Custom Gatsby Blog Publishing Workflow](https://javascript.plainenglish.io/gatsby-page-queries-with-environment-variables-1eae8557ee01)

### This Blog

- Gatsby: Its built on many techs.
  - React
  - Node
  - MD (Mark Down)
  - GraphQL
  - SSG (Static Site Geneator)
  - DSG (Delayed Static Generation)
  - SSR (Server-Side Rendering)
  - Customizations:
    - Mobile First, Responsive CSS
    - CSS animations
    - Collapsing side nav
    - Bouncing return to top icon
  - Extensions/Plugins:
    - [gatsby-plugin-emotion](https://www.gatsbyjs.com/plugins/gatsby-plugin-emotion/) for emotion-js CSS.
    - gatsby-head-style-boss
    - gatsby-source-build-date

### Node Modules

#### gatsby-head-style-boss

I wrote [gatsby-head-style-boss plugin](https://www.gatsbyjs.com/plugins/gatsby-head-style-boss/) [node module](https://www.npmjs.com/package/gatsby-head-style-boss) to learn more about:

- Gatsby plugins, naming conventions
- Gatsby build hooks
- dark mode
- "no flash" dark mode switches
- it was [my first npm module](https://www.npmjs.com/package/gatsby-head-style-boss), so I learned about building and publishing those.

#### gatsby-source-build-date

- I wrote [gatsby-source-build-date plugin](https://www.gatsbyjs.com/plugins/gatsby-source-build-date/) [node module](https://www.npmjs.com/package/gatsby-source-build-date) for several reasons. 
- The only Gatsby plugin for build date used a dependant Date library that had been superceded in core node.
- I like to minimize 3rd party node dependencies
- I wanted to write a much simpler Gatsby plugin than gatsby-head-style-boss.
- I could have hard coded the international date functionality but I thought it would be useful for others to have a plugin and also wanted the npm, Gatsby, and React practice because this blog is the only place I use those things and they become rusty.
