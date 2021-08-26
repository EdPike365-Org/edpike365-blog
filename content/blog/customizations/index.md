---
title: "Site Customizations Journal"
date: "2021-08-23:12:03.284Z"
status: published
author: EdPike365
tags:
  - Gatsby
  - Starter
  - Customization
  - Journal
---

edpike365.com started with [Gatsby Starter Blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog). I used Gatsby after doing some research in late 2020.

Here are my customizations and plugin installations, in rough order.

## - Strategic TODOs

- Short form "Journal" with Contentful
- Convert blog to MDX
- Blog/Journal Categories
- Blog comments, threaded
- Newsletter signup (Netlify form)
- College Search Form that hits a SQL db with REST and GraphQL
- A CRUDS form set, probably for "groups", hitting a graph DB.
- Protected area with OAuth 2 (Octa or Auth0)
- Implement Google Site Analytics (I need to go deeper with SEO)
- Google Maps demo
- CRUDS to NoSQL demo
- Demo sub sites using combos of (Svelte, Angular 2) and (SvelteKit, NextJS, Hugo)
- TS and automated testing

## - MD Blog Publising Workflow

- Documented in my blog entry: [Gatsby Page Queries](/gatsby-page-queries/).

## - Site Build Date

- I wrote a Gatsby plugin [Gatsby Source Build Date](https://www.npmjs.com/package/gatsby-source-build-date)

## - Mobile First UI

- I had only developed internal corporate websites for years. They were only ever meant to be used on desktops and did not use media queries.
- I used Chrome tools emulators to design it to work with the narrowest old smart phone (320px) and then modify multiple things (fonts, icons, menus) as width increases.
- I ditched a fixed footer and use a hamburger nav for most of my nav, even in desktop mode.
- I like [vice.com's responsive website](vice.com).
- TODO: floating fixed hambuger icon in lower left corner for mobile sizes.
- TODO: left and right "thumb first" usability in mobile sizes

## - CSS Customizations Overview

- Emotion CSS in JS
- Dark Mode with inital load flash prevention
- Multiple Style Selection
- CSS Grid
- Animations/transforms
- Custom Components on blog core
- TODO Sub sites will demo Materialize and Bootstrap.

## - Emotion CSS in JS

- Learning to customize styling in things like Gatsby's image tag was challenging. TODO: gotcha details.

## - Dark Mode and Multiple Style Selection

I have not published my blog post about this yet but should have one up by end of Aug 2021. In the meantime: quick notes.

- TLDR: I chose to write a Gatsby plugin, [Gatsby Head Style Boss](https://www.npmjs.com/package/gatsby-head-style-boss), so I could learn a lot. See it in action [here](https://www.edpike365.com/settings/).
- I started off just wanting Dark Mode. I wanted to use 3 traditional style sheets.
  1. reset style sheet
  2. default "core" style sheet, mostly with root --css: variables, similar to materialize's approach.
  3. a dark mode style sheet that just overrides the color variables in the core sheet.
- I wanted to enable and disable the dark mode sheet
- I tried using Emotions global theming, but WebPack combined all the style sheet "classes" into common.css, which prevented that approach.
- There were no plugins that did what I wanted. I thought it would be a great project to create a plugin that had what I wanted: [Gatsby Head Style Boss](https://www.npmjs.com/package/gatsby-head-style-boss). This was my first node package.
- Since I was going to write a package, I decided to add a secondary capabilities:
  - multiple style options
  - remote or local styles
  - optional minification
- I learned many things:
  - using an IIFE in the head to prevent an initial flash when the user loads the site.
  - minifying CSS with postcss and cssnano, and to minify the IIFE with Terser 5. All are mandatory ASYNC.
  - you can't pass async functions to the `gatsby-ssr` api, but you **can** with the `gatsby-node` api.
  - media queries, other odd attributes, and custom `data-xyz` attributes for LINK and STYLE components.
  - how to use React CSS modules (for the custom component library)
  - how to style and use SVG icons.
  - customizing gatsby's [default html.js](https://www.gatsbyjs.com/docs/custom-html/) with the SSR api
  - React stuff: global providers, select controls, hooks

## - CSS Grid

- It evolved over iterations from a traditional desktop first layout with media queries for mobile to being mobile first (width = 320) with media queries for multiple larger formats.
- TODO: I'm still getting some scroll bar issues with some pages.

## - CSS Animation, Transitions and Transforms

- Colors transition gently when changing styles
- Mouse over my icon to see it spin indefinitely.
- Resize my home page and see the logo animate from center to left justification. This was very hard. TODO details.
- TODO: mouseover icons, nav bar slide out

## Gatsby Critique

- Mostly good. Friendly team.
- Can't access Gatsby GraphQL or cache api from SSR. They need to make lofting resources from the node phase to the SSR phase easier.
- Can't access FS in SSR without ugly warnings.
- Convoluted WebPack config (necessary evil but could be made more modular, at least better documented how to customize it using the provided hooks)
- Site docs diagrams use GraphViz and it is broken, does not render
