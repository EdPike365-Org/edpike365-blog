---
title: "Site Customizations Journal"
date: "2021-08-23T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - Gatsby
  - Starter
  - Customization
  - Journal
---

- [EdPike365 Jira](https://edpike365.atlassian.net/jira/software/projects/ECDT/boards/1) if you want "view" access, let me know, and I'll upgrade to a plan that lets me do that.
- Source
  - [EdPike365.com (GitHub)](https://github.com/EdPike365/edpike365-blog) This site.
  - [Gatsby Head Style Boss](https://www.npmjs.com/package/gatsby-head-style-boss) NPM module.
  - [Gatsby Source Build Date](https://www.npmjs.com/package/gatsby-source-build-date) NPM module.
  - [Gatsby Dev Container (Docker Hub)](https://hub.docker.com/r/edpike365/gatsbyjs-devcontainer) VSCode Devcontainer for Gatsby.

I made mostly intranet and extranet web apps for most of my career. When I decided to create this _public facing_ portfolio and blog site, I did some research to see what was near future best practice.

I used [Gatsby](https://www.gatsbyjs.com/) after doing some research in late 2020. I valued SSG most because of the fast load time and Gatsby leads in this. I almost chose [Next.js](https://nextjs.org/), but at the time it did not have a [responsive image object](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) and its SSG was weaker than Gatsby's. Within a couple of months of starting EdPike365, Next.js caught up.

After Vercel, the maker of Next.js, hired [Svelte's](https://svelte.dev/) creator, [Rich Harris](https://vercel.com/blog/vercel-welcomes-rich-harris-creator-of-svelte), I wish that I'd chosen Next.js. I'm very interested in Svelte but have not had time to play with it.

[edpike365.com](http://edpike365.com) started with Kyle Mathews' simple [Gatsby Starter Blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog).

## Customizations in Reverse Order

### - VSCode Devcontainer For Gatsby

- I tried upgrading from Gatsby V3 to V4. Everything blew up and my local dev env was tainted. I decided it was time for a devcontainer but found very few references and only one that sorta worked. Gatsby is SSG, so a devcontainer is a little more complicated than say, a React site. None had an image on Docker Hub to speed up download, so I added that. I forked the one that sorta worked and enhanced it.

### - MD Blog Publishing Workflow

- I wrote code to make "gatsby build" not build blog entries that are not in the published mode. "gatsby develop" will build _all_ posts so I can see what they'll look like once they are published.
- I documented how I built it in my blog entry: [Gatsby Page Queries](/gatsby-page-queries/).
- I wrote my own "next/last" blog post footer code to learn how exactly the existing one worked. Gatsby gives you so many "magic" plugins to choose from, but my main goal for this edpike365.com is learning, not speed of development.

### - Created Gatsby Plugin for "Site Last Built Date"

- I wrote a Gatsby plugin, [Gatsby Source Build Date](https://www.npmjs.com/package/gatsby-source-build-date), to add a build date to the bottom of the home page. An existing popular plugin relied on yet another NPM module and I'm not a fan of that. I forked it and replaced it with Node's newer, built in, calendar API. It supports full i18n of language and date formats, including Korean, etc. I also wanted more practice publishing NPM packages.

### - Created Gatsby Plugin for Managing Dark Mode, etc

- I work with a giant old code bases whose multiple CSS files could not be edited but I could add additional ones to supercede them. None of the existing Gatsby plugins did that, they all assume green field projects.
- I chose to write a Gatsby plugin (NPM module), so I could learn a lot. Its documented here [Gatsby Head Style Boss](https://www.npmjs.com/package/gatsby-head-style-boss). See it in action [on my site](/settings/).
- I learned many things:
  - using an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), which executes before page render, to prevent an initial flash when the user loads the site.
  - minifying CSS with postcss and cssnano, and to minify the IIFE with Terser 5. All those libraries are mandatory ASYNC and I spent some time learning that there really was not a top level `await` (though one is finally coming to JS!).
  - you can't pass async functions to the `gatsby-ssr` api, but you **can** pass them with the `gatsby-node` api.
  - you can't access the Gatsby's Graph db during `gatsby-ssr`
  - I learned about embedding media queries, and other odd attributes, like custom `data-xyz` attributes, in css LINK and STYLE header components.
  - I could not assume that people using my plugin would have Emotion, so I had to learn another way to do styling that kept the code clean. I learned about [React CSS modules](https://www.gatsbyjs.com/docs/how-to/styling/css-modules/). Trippy.
  - how to style and use SVG icons.
  - customizing Gatsby's [default html.js](https://www.gatsbyjs.com/docs/custom-html/) with the SSR API
  - React stuff: global context providers, select controls, hooks

### - Mobile First, Responsive UI

- I had only developed internal corporate websites for years. They were only ever meant to be used on desktops and did not use media queries and I really wanted to learn those.
- I used Chrome tools emulators to design it to work **by default** with the narrowest old smart phone ( w < 320px ). I modify multiple things (fonts, icons, menus) as the width increases. Check it out by playing with the width. Transitioning to a wide mode, my logo will animate to the left.
- I wrote, then removed, a fixed sticky footer, because in a mobile environment, it uses too much real estate.
- I want my web site to look like a mobile app. I like [vice.com's responsive website](https://vice.com).

### - Implemented Emotion CSS in JS

- Looked through the many CSS in JS options and chose [Emotion](https://emotion.sh/docs/introduction)
- Learning to customize styling with Emotion in things like Gatsby's **Image** React Component was challenging.

### - Other CSS Customizations

- Wrote a custom collapsable widget for my left navbar.
- Tried to implement [A11Y](https://www.a11yproject.com/) (Accesibility) standards.
- Implemented responsive CSS Grid and Flexbox for master site layout.
- I added custom scroll bars using only CSS. Its an immature standard and took some time, but I like them a lot (see the ones in my "Tron" dark mode).
- I implemented [CSS variables](https://www.joshwcomeau.com/css/css-variables-for-react-devs/) to support dynamic themeing.
- I roughly immitated Google's [Materialize](https://material.io/design/material-theming/implementing-your-theme.html) variable naming convention and [color contrast](https://material.io/develop/web/theming/color) usability standards.
- I used the [Typography](https://medium.com/swlh/everything-you-need-to-know-about-designing-for-web-typography-69cec6ca8230) font size progression algorith.
- TODO: Add a footer that is attached to the bottom of all content, but not sticky.
- TODO: I'm still getting duplicate scroll bar issues with _some_ MD blog entries. My hunch is its Graphviz (flow diagrams) or KaTex (math notation) content, which they both have exclusively in common. (my [STEM MD](/gatsby-remark-stem/) and [Gatsby Remark Test](/gatsby-remark-test/) blog entries).

### - CSS Animation, Transitions and Transforms

- Colors transition gently when changing styles to prevent eye strain, especially helpful when changing from dark to light mode.
- Mouse over my icon to see it spin indefinitely using CSS animations.
- Resize my home page and see the logo us spinning animation to move from center to left justification.
- TODO: add mouseover icon glow
- TODO: left nav bar slide out animation

### - Gatsby Critique

- Mostly good. Friendly team.
- Can't access Gatsby V3 GraphQL or cache api from SSR. They need to make lofting resources from the node phase to the SSR phase easier.
- Can't access FS (file system) in SSR without ugly warnings.
- Convoluted WebPack config (necessary evil but could be made more modular, at least better documented how to customize it using the provided hooks)
- Gatsby V3 documentation build flow diagrams uses GraphViz and does not render.

### - Strategic TODOs

I'm transitioning these to [Jira](https://edpike365.atlassian.net/jira/software/projects/ECDT/boards/1).

- Anchor URLs do not work unless from same MD page they are on. (Reach Router)
- Using an anchor crushes the top nav grid div and you can't scroll back up to very top, only to top of content grid div, without reloading the page. (Reach Router)
- Add a short-form "Journal Notes" style blog using Contentful headless CMS
- Convert blog to MDX
- Blog/Journal Categories tags for filters. Tag managment interface.
- Blog comments, threaded, probably [Disqus](https://disqus.com/)
- Newsletter signup (Netlify form)
- College Search Form that hits my serverless AWS Lambda API (python) and uses Google map API.
- A CRUDS form set, probably for a little "groups" app, hitting a graph DB.
- Protected area with federated auth (Okta or Auth0)
- Demo sub sites using combos of (Svelte, Angular 2) and (SvelteKit, NextJS, Hugo)
- TypeScript and automated testing.
