---
title: "Front End Tech"
date: "2021-08-23T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - "front end"
---

<a name="core"></a>
[HTML, CSS, JS](#core) | [Design](#design) | [UI Frameworks](#uiframeworks) | [Auth](#auth) | [Build Tools](#build) | [Testing](#testing)

### HTML, CSS, JS

- K.I.S.: Keep It Simple. The best code is no code. The best libraries are no libraries. However, in the real world, espcecially in public facing web sites, we often need more.

- HTML and CSS Seperation of Concerns: I believe in the sepearation of concerns. I also realize that users turn off JS but designers still want to do some animations, etc, so CSS is growing more functional. I can also see that a user might not want superfulous animations and effects because they are trying to save their battery, so functional CSS is ignoring their wishes, and at scale, wasting energy and contributing to global warming. Ideally, _vanilla, static, CSS_ would be seperate from _CSS animations_. Browsers would let users cleanly enable/disable CSS animations. The browser could check the battery status and turn off animations when the battery was low.

  - [CSS Zen Garden](http://www.csszengarden.com/)

- Javascript: I remember when JS was only supposed to communicate with Java Applets and do form validation. I'm rooting for ECMAScript and Typescript, but the whole thing is a tottering mess and feels a lot like VBScript. If I had not worked with strongly typed languages like Java, I would not know what I was missing.

  - [Wasm](https://webassembly.org/): Web browsers need a strongly typed alternative to JS. Typescript is just a clever bridge but someday we'll complile strongly typed languages to JS/WASM and be done with it.

### Design <a name="design"></a>

- I have a minor in Architecture. I appreciate good design. However, the fundamental _physical_ reality is that web apps run over a network and usually operate on a mobile device.
  - [Ecological Design](https://torquemag.io/2019/09/eco-friendly-website-design/): Animation, even mouseovers, uses energy. Light color themes use more battery than dark mode themes. Designers must recognize this. It not only affects user engagement and retention, _at scale_ it is an ecological issue.
  - [Accessiblity (a11y)](https://a11ytoolbox.io/): This is a broad topic. Low hanging fruit: Use REM for font sizes. A lot of people can't read tiny fonts on their mobile devices, out in the sun.
  - Don't make scrolling alter the size of web elements, or play animation, instead of scrolling. I'm looking at you [Google Store](https://store.google.com/us/product/pixelbook_go?hl=en-US).
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/): Build a good LightHouse score into your CI/CD pipeline.

### UI Frameworks <a name="uiframeworks"></a>

- [React](https://reactjs.org/): I'm not a huge fan of JSX and shadow DOM. _BUT_ its the leading SPA tech by a long shot so I've learned it.

  - [GatsbyJS](https://www.gatsbyjs.com/) SSG, GraphQL, highly opinionated. I picked this for my site just before NextJS added SSG. The GraphQL data lake is cool but it is limitiing when you want to pull in data during certain build phases (V3).
  - [NextJS](https://nextjs.org/) SSR, and now SSG. I'm interested in trying this out to compare with Gatsby.
  - [React Native](https://reactnative.dev/) I watch this from afar. Reasons:
    1. I believe in PWAs (progressive web apps) vs native apps. React Native is a good transition, but it still is trying to run on local OS and strategically, I'm not interested.
    1. I heard too many horror stories about it not working, though I've heard it is better now.
    1. WASM is coming which will make PWAs dominant.
  - [Redux](https://redux.js.org/) State container. I like what it gives you (replayability), but I don't like the nomenclature (reducers?). They should use event bus nomenclature and it would be more clear. I will try [Redux Toolkit](https://redux-toolkit.js.org/) at some point in 2022.
  - [Reach Router](https://reach.tech/router/) Used by Gatsby.
  - [Vercel](https://vercel.com/) They own NextJS. They are competing with Netlify, GatsbyJS.
  - [Create React App](https://create-react-app.dev/)

- [Svelte](https://svelte.dev/): Compiles to vanilla JS during build. Reactive. I am VERY interested but have not built anything yet. Vercel hired its creator in late 2021, which makes me even more interested in NextJS.

  - [Svelte Kit](https://kit.svelte.dev/)

- [Angular 2+](https://angular.io/) I love that its Typescript from the ground up but unfortunately market share is low. Coming from JSP development, it has a lot to offer. Strong typing, event driven, dependency injection.

  - [AngularJS](https://angularjs.org/) is legacy and very different from Angular 2+.

- [Vue](https://vuejs.org/) I decided to ignore this one because I have to draw boundaries somewhere. Sounds like an improvement over React but Svelte is where I think things are heading.

  - [Nuxt.js](https://nuxtjs.org/) Next.js for Vue.

- [JQuery](https://jquery.com/): The old fat standby, but recently lighter (30kB) and more modular. Polyfill vanilla apps. Good for non-SPA intranet apps.

- Component Libraries

  - [Bootstrap](https://getbootstrap.com/): I like the large ecosystem. Very approachable. Heavy, sadly.
  - [Material-UI](https://mui.com/): less approachable but I appreciate its design philosphy. Also heavy.
  - [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) I'm watching this. Unfortunately, it uses a Shadow DOM.
  - [Figma](https://www.figma.com/) I've played with this but I have not used it in production.
  - [Adobe XD](https://www.adobe.com/products/xd.html) I think Figma is displacing this.

- CSS: I prefer using StyleSheets the way they were designed: with CSS variables at the top level, like Grandma taught me. I like using [Material Design](https://material.io/design) and [Typography](https://spectrum.adobe.com/page/typography/) to generate default values. Then, I use locally scoped CSS that refers to the top level style sheet classes and variables.
  - [CSS Modules](https://css-tricks.com/css-modules-part-1-need/) This is included in Gatsby, so I've used it when I'm writing Gatsby modules with widgets in them.
  - [Emotion](https://emotion.sh/docs/introduction): This is basically an extension of [Styled Components](https://styled-components.com/) I use it for safe component scoping.
  - [CSS Tricks](https://css-tricks.com/) Incredibly useful site.
  - [Josh Comeau](https://www.joshwcomeau.com/) A real CSS guru.

### Client Side Authentication/Authorization <a name="auth"></a>

- [Okta Sign-In Widget](https://developer.okta.com/code/javascript/okta_sign-in_widget/)
- [Auth0 Lock](https://auth0.com/docs/libraries/lock) Embedded in app, customizable.
- [Amplify (AWS) SSO](https://docs.amplify.aws/lib/auth/social/q/platform/js/)

### Build Tools <a name="build"></a>

- [WebPack](https://webpack.js.org/)
- [Parcel](https://parceljs.org/) Also supports Webassembly
- [Snowpack](https://www.snowpack.dev/): trying to replace WebPack and Parcel. O(1) build times.
- [Rollup.js](https://rollupjs.org/guide/en/)
- [esbuild](https://esbuild.github.io/) The new hotness. Written in GoLang.
- [Packem](https://packem.github.io/) Written in Rust.
- [Babel](https://babeljs.io/): ES transpiler

### Testing <a name="testing"></a>

- [Jest](https://jestjs.io/)
- [Mocha.js](https://mochajs.org/): Test framework/suite. Modular.
- [Chai](https://www.chaijs.com/): TDD and BDD assertion framework. Mocah pluginable.
- [Sinon.js](https://sinonjs.org/): stub, spy, mock. Standalone or plugin.
- [Jasmine](https://jasmine.github.io/) No external dependencies!

- Runtime Testing
  - [Selenium](https://www.selenium.dev/)
  - Test at build, CI
  - Testing live site remotely.
