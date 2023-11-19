# CSP (Content Security Policy)

I was going to use gatsby-plugin-csp but it seemed a bit hacky and as per their own docs, not ideal (which is to use headers). They used a meta tag.

- [CSP website](https://content-security-policy.com/)
- [CSP Guide: What is a Nonce](https://content-security-policy.com/nonce/)
- [CSP Netlify Example Headers](https://content-security-policy.com/examples/netlify/)

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
- [Secruity Headers.com Report UI](https://securityheaders.com/?q=report-uri.com&followRedirects=on)
- [web page speed test](https://www.webpagetest.org/)

## Netlify

- https://answers.netlify.com/t/automate-your-content-security-policy-csp-with-our-new-integration/100180

- https://www.netlify.com/blog/general-availability-content-security-policy-csp-nonce-integration/

- https://answers.netlify.com/t/new-chrome-breaks-netlify-web-sites-deployed-with-an-active-csp-policy/16016

- [Netlify Headers Mod in netlify.toml](https://docs.netlify.com/routing/headers/#syntax-for-the-headers-file)

- [Netlify nonce support](https://answers.netlify.com/t/csp-nonce-support/38101)

- https://dev.to/marcellothearcane/how-to-csp-your-netlify-projects-4ff1

- https://dev.to/mannuelf/content-security-policy-on-netlify-guide-4p0c

## In Gatsby

- https://github.com/gatsbyjs/gatsby/discussions/10890#issuecomment-468982396

- https://browniebroke.com/blog/setting-up-content-security-policy-gatsby/

- https://github.com/browniebroke/browniebroke.com/pull/210/commits/f27c05c84b0f4f2785aca0f2b8ef73efddb39a14

- Original "meta tag to netlify headers file" solution https://github.com/DeveloPassion/website/commit/c31120ccccefed43c266c8ef862ec696bd36c7a8

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
