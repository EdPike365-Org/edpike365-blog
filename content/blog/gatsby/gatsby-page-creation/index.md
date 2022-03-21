---
title: "Gatsby Page Creation For Busy People"
date: "2021-04-11T22:12:03.284Z"
status: draft
author: EdPike365
tags:
  - Gatsby
  - createPage
  - graphQL
  - GatsbyJS
---

#### The Executive Summary of how Gatsby V3 Creates Pages

### How Gatsby V3 Makes React Pages (not checked for V4 yet)

Each React "page" in Gatsby has 2 parts:

- a "component--src-pages-pagename-js-id.js" file
- a "page-data.json" file that holds the data that the page will show.

In the web browser, at _run time_, page-data is injected into the component to create a page. If a page contains links to other pages on your site, mousing over them causes the browser to request their page-data.json file. The goal is to make them load quicker _if_ you click on them later. This is a flavor of the "lazy loading" pattern.

### How Gatsby Creates the page-data.json Files

The page-data.json files contain pre fetched data to speed up page load times. Gatsby builds the `page-data.json` file for each page during build (whether `gatsby build` or `gatsby develop`).
Its a tricky practice that is only decently documented for the common "happy path". Here is my understanding of what happens.

Gatsby build/develop:

- looks at every file that you created, looking for graphQL queries.
- strips the queries out of your pages and components and stores them in a lookup table.
- consolidates any duplicate queries and query fragments and runs the queries.
- [builds](https://relay.dev/) a large data graph (or [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)) that removes as many query redundancies as it can.
- walks the AST of graphQL queries and executes them. The results are stored in a Redux store that is only available during build, so you can't use normal Redux debugging. If you want to dig in the code, here it is [on github](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby/src/schema).
- runs the JSX code of every page and component **on the server** to see what data it _would_ load on first load.
- stores that data in a `page-data.json` file stored somewhere in the `public` folder. The file contains the data needed for first load in the web browser. The server side build time Redux store is destroyed.
- remodels your page or component code:
  - if you refer to any env vars starting with `GATSBY_`, they are **inlined** into your JSX code.
  - your page has a pointer to its json data file. The content is accessible in your JSX code `data` object, in JSON format.
    - If you built your page manually using the `create-page action`, and you passed name value pairs in via the `context` argument, that data will be available as props in your JSX code and will appear in `page-data.json` in `results>pageContext:{}`
    - If the page or component contains _static_ content in static components, like a page header or footer, that is stored as a _pointer_ to that component. That component, in turn, will have it's own `page-data.json`. That means that Gatsby only needs to load the `page-data.json` files for your header and footer across the network **one time**, for the entire site. See the `staticQueryHashes` at the bottom of the `page-data.json` file picture below. Note that they correspond to two json files with the hashes as their name.
