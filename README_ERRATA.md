# Errata

A scratch sheet.

        icons: [
          {
            src: `/favicon.svg`,
            sizes: `196x196`,
            type: `image/png`,
            purpose: `maskable`,
          },
        ],

## Mermaid

A little Mermaid example. Flowcharts and other diagrams in MD.

```mermaid
  graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
```

## Note on Webpack Experimental

At some point Gatsby 5 started using a webpack experimental settings which cause an error message like below:

```text
npm WARN While resolving: react-server-dom-webpack@0.0.0-experimental-c8b778b7f-20220825
npm WARN Found: react@18.2.0
npm WARN node_modules/react
npm WARN   peer react@"18.x" from @gatsbyjs/reach-router@2.0.1
npm WARN   node_modules/@gatsbyjs/reach-router
npm WARN     @gatsbyjs/reach-router@"^2.0.1" from gatsby@5.12.4
npm WARN     node_modules/gatsby
npm WARN     3 more (gatsby-link, gatsby-react-router-scroll, gatsby-script)
npm WARN   9 more (@react-icons/all-files, gatsby, gatsby-link, ...)
```

To get rid of it you can override it?

```JS
  "overrides": {
    "react-server-dom-webpack@0.0.0-experimental-c8b778b7f-20220825": {
      "react": "^18.2.0"
    }
  },
```
