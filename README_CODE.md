# Code Quality

https://blog.theodo.com/2019/08/empower-your-dev-environment-with-eslint-prettier-and-editorconfig-with-no-conflicts/

https://dev.to/npranto/how-i-setup-eslint-prettier-and-editorconfig-for-static-sites-33ep

https://leandroaps.medium.com/setting-up-eslint-prettier-and-husky-in-a-react-18-project-a-comprehensive-guide-the-update-40f4ff0b42ca

https://leandroaps.medium.com/setting-up-eslint-prettier-and-husky-in-a-react-18-project-a-comprehensive-guide-the-update-40f4ff0b42ca

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

```JS
  "overrides": {
    "react-server-dom-webpack@0.0.0-experimental-c8b778b7f-20220825": {
      "react": "^18.2.0"
    }
  },
```  
