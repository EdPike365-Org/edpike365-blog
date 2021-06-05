# Style Head Games (SHG)
- Offer multiple theme options, not just dark mode.
- Each style is in its own CSS file.
- Each CSS file is injected into its own seperate style element ***on the server***.
- Styles cascade as expected.
- Eliminate screen flash on load. 
- Contains optional React components: 
  - Dark Mode Toggle
  - Themes Selector
  - Theming State Display

## How?
- Edit the StyleHeadGames.json configuration file:
  - Styles are injected in the order listed.
  - Configuration options become style element attributes.
  - Each CSS file is configured to designate:
    - "always" enabled styles
    - Optional Styles
      - "default" styles
      - "dark" styles 
      - "default dark" styles
- Copy and paste the optional React components. (Gatsby Plugin is on my TODO list).
- Import the mandatory onPreRenderHTML function into gatsby-ssr.js to inject the CSS
- Get the required javascript function on Gatsby's html.js template.
  - Option 1: Import the onPreBody function to gatsby-ssr.js which injects the code.
  - Option 2: copy the html.js page to your local project and paste the code in.

> TLDR; Typical minimal setup: You have a legacy/core CSS file that always needs to be enabled. You have a *modifying* CSS file for dark mode. In the config file, list the core file first, configure it with use="default always". List the "dark" file second, configure it with use="dark". When dark mode is activated, the dark css cascades over the core. The JS code on the html page handles everything. You can optionally add the ToggleDarkMode React component.

## Notes For Hackers
- You can manually add all, or some additional, style elements to the head. They just need to follow the element attribute patterns.
- If you add styles to the head programmatically after SSR, they will *not be seen* by the HSGModel until you call populateSHGModel().

## General Default Rules:
- All styles appear on the page in the order that they are listed in the config.
- All styles marked "always" will be enabled at all times.
- Non "always" styles are called options. Only one option can be enabled at time.
- JS Functions are available to let you get around the default behavior.

### On Initial Page Load:
- Javascript file on page runs before first render. It is blocking.
- Read the page for specially id'd style elements and enter them into SHGModel object.
- Set style enabled based on "use" attribute:
  - "use" contains "always": Styles are enabled (always). Combining with other uses not advised. 
  - "use" contains "default": The *last* style marked default is enabled at load time. Previous "defaults" are ignored. If a style is not labeled "default", it is not enabled at initial load time (unless also has "always").  
  - "use" contains "dark": The *last* style marked "dark" will be enabled if user has OS or browser set to "prefers dark mode". In that case other, non "always", styles are disabled. Previous "dark" styles are ignored.
  - "use" contains "default dark": Last style marked both will be enabled for "default" OR "dark". In other words, the site will load in a dark mode no matter what the "prefers dark mode" settings are.
- Find any saved (local storage) style ID. If the style exists, enable it; disable other styles.
- If there is no stored style ID, or its style element cant be found, check for "prefers dark mode". If "dark" styles exist, enable the last one. Disable other styles.
- Nothing modifies any preferred style names stored in local storage.

### On "Prefers Dark Mode" Change Event:
- Can be triggered by the web browser settings changing.
- The last dark style is enabled, all other options will be turned off, except "always" themes.
- That style is stored to local storage.

### On Change From StyleSelector or DarkModeToggle Widgets:
- If the selected style exists, it is enabled. All other styles are disabled.
- The style is stored in local storage.

## Widgets:
- StyleSelector: All styles are listed unless they are *only* marked use = "always".
- DarkModeToggle: Will disable the last use = "dark" style.
 
> If you have a large core CSS file that you always want enabled, *and* you want simple StyleSelector options, create an empty CSS file with the desired name to proxy for the use = "always" core file.
 
## Titles and "Alternate" Style Sheets
There is an ancient tech called "Alternate Style Sheets". If you use the title field on more than 1 style, the browser will only enable the first one it finds. It will disable any named sheets or styles past past that one. Is a bit like radio buttons for styles. 
***The javascript code will be ignored by the browser (at least on Chrome).***
I'm leaving title implemented in case someone wants to get their freak on but I highly recommend that you don't use the *title* field in the config file.

## History
Written originally for Gatsby 3 to fix dynamic themeing issues. 
- If CSS files were loaded by a React component, Gatsby 3's Webpack configuration combined the contents of multiple CSS files into one common CSS file, in unpredicatable order, wrecking cascading behavior. The Webpack config was super complicated so I did not want to modify it.
- I attempted to add css configuration in the gatsby-config file and to leverage Gatsby's cool GraphQL. I had the file contents loaded into GraphQL as well. But in gatsby-ssr.js, you cannot get access to GraphQL, so I could not access the configuration or inject the styles into the head of the html.js template (using onPreRenderHTML()).
- I tried to use the "use dark mode" Gatsby plugin but it did not support multiple style sheets being enabled and disabled. It forces you to modify the "body" class. Too limited.
- Luckily, gatsby-ssr.js *does* allow access to the file system because it only runs on the server. StyleHeadGames takes advantage of this to turn my dreams into reality....

## Helpful Links
- https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app

- and he was referencing this live code from Overreacted.io: 
https://github.com/gaearon/overreacted.io/blob/master/src/html.js

- how to get rid of flash https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app

- how to minify and inline stylesheets https://stackoverflow.com/questions/50768575/is-it-possible-to-have-html-webpack-plugin-generate-style-elements-from-css

- this is a really good thread about inlining css in the header, trying to modify webpack
I think this is the default webpack minifier https://survivejs.com/webpack/styling/separating-css/

JS wrapped as IIFE to use private variables and functions