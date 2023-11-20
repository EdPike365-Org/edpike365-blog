# CSP (Content Security Policy)

I was going to use gatsby-plugin-csp but it seemed a bit hacky and as per their own docs, not ideal (which is to use headers). They used a meta tag.

- [CSP website](https://content-security-policy.com/)
- [CSP Guide: What is a Nonce](https://content-security-policy.com/nonce/)
- [CSP Netlify Example Headers](https://content-security-policy.com/examples/netlify/)

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#directives

## example starter policies:

From [https://content-security-policy.com/](https://content-security-policy.com/)

```
default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self';base-uri 'self';form-action 'self'
```

From [a netlify post](https://answers.netlify.com/t/new-chrome-breaks-netlify-web-sites-deployed-with-an-active-csp-policy/16016/4)

```
Content-Security-Policy = "default-src 'self'; object-src 'none'; font-src 'self' https://fonts.gstatic.com/ data:; manifest-src 'self'; img-src 'self' 'unsafe-inline' https://ssl.gstatic.com/ https://www.google-analytics.com/ data:; script-src 'unsafe-eval' 'self' 'unsafe-inline'  https://identity.netlify.com/ https://tagmanager.google.com/ https://www.googletagmanager.com/ https://unpkg.com/ https://www.google-analytics.com/analytics.js; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/ https://tagmanager.google.com/; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; prefetch-src 'self'; require-trusted-types-for 'default'; worker-src 'self'; report-uri https://[your-domain].report-uri.com/r/d/csp/reportOnly;"
```

## Security Evaluators

- Lighthouse
- [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [Security Headers.com Report UI](https://securityheaders.com/?q=report-uri.com&followRedirects=on)
- [web page speed test](https://www.webpagetest.org/)

## Random Articles

- https://lcamtuf.blogspot.com/2011/08/subtle-deadly-problem-with-csp.html
- https://web.dev/articles/strict-csp
- https://developer.chrome.com/docs/lighthouse/best-practices/csp-xss/?utm_source=lighthouse&utm_medium=devtools

## Netlify

- https://www.npmjs.com/package/@netlify/plugin-csp-nonce
- https://github.com/netlify/integration-csp

- https://www.netlify.com/blog/general-availability-content-security-policy-csp-nonce-integration/#main

- https://www.netlify.com/blog/ship-it-securely-with-netlifys-enterprise-security-infrastructure/#main

- https://www.curiousm.com/blogs/content-security-in-netlify

- https://answers.netlify.com/t/automate-your-content-security-policy-csp-with-our-new-integration/100180

- https://www.netlify.com/blog/general-availability-content-security-policy-csp-nonce-integration/

- https://answers.netlify.com/t/new-chrome-breaks-netlify-web-sites-deployed-with-an-active-csp-policy/16016

- [Netlify Headers Mod in netlify.toml](https://docs.netlify.com/routing/headers/#syntax-for-the-headers-file)

- [Netlify nonce support](https://answers.netlify.com/t/csp-nonce-support/38101)

- https://dev.to/marcellothearcane/how-to-csp-your-netlify-projects-4ff1

- https://dev.to/mannuelf/content-security-policy-on-netlify-guide-4p0c

## In Gatsby

- https://github.com/gatsbyjs/gatsby/discussions/10890

- https://github.com/gatsbyjs/gatsby/discussions/10890#issuecomment-468982396

- https://bejamas.io/blog/content-security-policy-gatsby-websites/

- https://browniebroke.com/blog/setting-up-content-security-policy-gatsby/

- https://github.com/browniebroke/browniebroke.com/pull/210/commits/f27c05c84b0f4f2785aca0f2b8ef73efddb39a14

- Original "meta tag to netlify headers file" solution https://github.com/DeveloPassion/website/commit/c31120ccccefed43c266c8ef862ec696bd36c7a8

- https://github.com/gatsbyjs/gatsby/discussions/38528

- https://github.com/gatsbyjs/gatsby/issues/38542

## Action Plan

- install netlify csp plugin
- test in RO mode
- but it only sets nonces for scripts, not other stuff (?)
- implement headers in netlify.toml for everthying else. RO only
  - see if generates a \_\_headers file
- if that doesnt work for all warnings
  - add hashes with gatsby-plugin-csp, which uses meta tags
- if that doesnt work for all warnings
  - add gatsby-plugin-netlify
  - add custom build code to copy meta tag header shas to the \_\_headers file
  - if the headers file is not being generated correctly, figure out how to edit netlify.toml dynamically instead
- make it a plugin: gatsby-plugin-csp-headers-netlify

headers: [
{
source: `/*`,
headers: [
{
key: 'Content-Security-Policy-Report-Only',
value:
"default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' *.edpike365.com; img-src 'self'; font-src 'self' data:;",
},
],
},
],

command = "npm run build && echo running-context-dev && cp ./custom-headers/\_devHeaders ./public/\_headers"

Content-Security-Policy-Report-Only: default-src 'none'; script-src 'self'; connect-src 'self';
img-src 'self'; style-src 'self';
base-uri 'self'; form-action 'self';
font-src 'self' data:;

## Golden in dev

Content-Security-Policy-Report-Only: default-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com; script-src-elem 'self' https://www.google-analytics.com https://www.gstatic.com https://www.google.com/recaptcha/ 'unsafe-inline'; connect-src 'self' https://dev-vgwftkisnb3w0ky8.us.auth0.com/oauth/token; img-src 'self' _.googleusercontent.com https://avatars.githubusercontent.com; style-src 'self' 'unsafe-inline' _.edpike365.com; base-uri 'self'; form-action 'self'; font-src 'self' data:; manifest-src 'self'; frame-src https://www.google.com/ https://dev-vgwftkisnb3w0ky8.us.auth0.com/;
