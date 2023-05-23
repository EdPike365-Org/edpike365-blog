---
title: "Front End Tech"
date: "2021-08-23T22:12:03.284Z"
status: published
author: EdPike365
tags:
  - "front end"
---

[HTML, CSS, JS](#html-css-js) | [Design](#design) | [UI Frameworks](#ui-frameworks) | [Auth](#client-side-authentication-authorization) | [Build Tools](#build-tools) | [Testing](#testing)

### HTML, CSS, JS

These are the core: Data, presentation, logic. Everything else is an elaboration.

- Problems with Javascript:

  - Javascript is loosely typed. Developing a complex app requires discipline or it is easy to end up with spaghetti code and horrific bugs. Typescript and [JSDoc](https://jsdoc.app/) are fine attempts to fix this, but they add a layer of complexity. In any case, automated testing of complex web apps is crucial because its too easy to introduce regression with loosely typed, or complexly typed, languages.

  - [Wasm](https://webassembly.org/): Web browsers need a strongly typed alternative to JS. Typescript is a clever bridge but someday we'll complile strongly typed languages to Wasm and be done with it. As per Google.io 2023, Wasm is also gaining speedy access to GPUs, through [WebGPU](https://developer.chrome.com/blog/webgpu-release/). In the age of AI, thats a big deal.

### Design

- I have a minor in Architecture. I appreciate good design. However, the fundamental _physical_ reality is that web apps run over a network and increasingly (usually?) operate on a mobile device. The devices can be very small and have various UI constraints. Therefore, design must place high weight on other factors.
  - Mobile First, responsive
  - [Ecological Design](https://torquemag.io/2019/09/eco-friendly-website-design/): Animations, even mouseovers, use energy. Light color themes use more battery than dark mode themes. It not only affects user engagement and retention, _at scale_ it is an ecological issue.
  - [Accessiblity (a11y)](https://a11ytoolbox.io/): This is a broad topic. Low hanging fruit: Use REM for font sizes. A lot of people can't read tiny fonts on their mobile devices, out in the sun. Screen readers are helpful for everyone but require extra work.
  - Simplicity: Don't make scrolling alter the size of web elements, or play animation, instead of scrolling. I'm looking at you [Google Store](https://store.google.com/us/product/pixelbook_go?hl=en-US).
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/): Build a good LightHouse score into your CI/CD pipeline.

### UI Frameworks

- [React](https://reactjs.org/): I'm not a huge fan of JSX or any framework that uses shadow DOMs. _BUT_ its the leading SPA tech by a long shot so I've learned it.

  - [GatsbyJS](https://www.gatsbyjs.com/) SSG, GraphQL, highly opinionated. I picked this for my site just before NextJS added SSG. If I had to do it again, I'd likely pick NextJS. The GraphQL data lake is cool but it is limitiing when you want to pull in data during certain build phases.
  - [NextJS](https://nextjs.org/) SSR, and now SSG. I'm interested in trying this out to compare with Gatsby.
  - [Redux](https://redux.js.org/) State container. I like what it gives you (replayability), but I don't like the nomenclature (reducers?). They should use event bus nomenclature and it would be more clear. I will try [Redux Toolkit](https://redux-toolkit.js.org/) at some point in 2022.
  - [Reach Router](https://reach.tech/router/) Used by Gatsby.
  - [Vercel](https://vercel.com/) They own NextJS. They are competing with Netlify, GatsbyJS.
  - [Create React App](https://create-react-app.dev/)

- [Svelte](https://svelte.dev/): Compiles to vanilla JS during build. Reactive, NO SHADOW DOM. I am VERY interested but have not built anything yet. Vercel hired its creator in late 2021. In 2023 they are transitioning away from TS.

  - [Svelte Kit](https://kit.svelte.dev/)

- [Angular 2+](https://angular.io/) I love that its Typescript from the ground up but unfortunately market share is low. Having TS at the core vs an addon means the value starts to balance out the added complexity. Coming from JSP development, it has a lot to offer. Strong typing, event driven, dependency injection.

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

### Client Side Authentication, Authorization

- [Okta Sign-In Widget](https://developer.okta.com/code/javascript/okta_sign-in_widget/)
- [Auth0 Lock](https://auth0.com/docs/libraries/lock) Embedded in app, customizable.
- [Amplify (AWS) SSO](https://docs.amplify.aws/lib/auth/social/q/platform/js/)
- [OpenID Connect (OIDC)](https://swagger.io/docs/specification/authentication/openid-connect-discovery/)
- [SAML](https://www.onelogin.com/learn/saml#:~:text=SAML%20is%20an%20acronym%20used,one%20set%20of%20login%20credentials.) for intranet

### Cloud SDKs

- [AWS Amplify](https://aws.amazon.com/amplify/)
- [GCP Firebase](https://firebase.google.com/)

### Build Tools

- [WebPack](https://webpack.js.org/)
- [Parcel](https://parceljs.org/) Also supports Webassembly
- [Snowpack](https://www.snowpack.dev/): trying to replace WebPack and Parcel. O(1) build times.
- [Rollup.js](https://rollupjs.org/guide/en/)
- [esbuild](https://esbuild.github.io/) The new hotness. Written in GoLang.
- [Packem](https://packem.github.io/) Written in Rust.
- [Babel](https://babeljs.io/): ES transpiler

### Testing

- [Jest](https://jestjs.io/)
- [Mocha.js](https://mochajs.org/): Test framework/suite. Modular.
- [Chai](https://www.chaijs.com/): TDD and BDD assertion framework. Mocah pluginable.
- [Sinon.js](https://sinonjs.org/): stub, spy, mock. Standalone or plugin.
- [Jasmine](https://jasmine.github.io/) No external dependencies!

- Runtime Testing
  - [Selenium](https://www.selenium.dev/)
  - Liveness pings

### Other

- [Flutter](https://flutter.dev/) BACK BURNER. Same code base can build mobile, web, desktop. Uses Dart. Rapidly approaching [compiling to Wasm](https://medium.com/flutter/racing-forward-at-i-o-2023-with-flutter-and-dart-df2a8fa841ab) for web apps.

- [React Native](https://reactnative.dev/) I watch this from afar. Reasons:
    1. I believe in PWAs (progressive web apps) vs native apps.
    1. I heard too many horror stories about it not working, though I've heard it is better now.
    1. Wasm is coming which I believe will make PWAs dominant over apps. Or conceptually they will finally merge.
