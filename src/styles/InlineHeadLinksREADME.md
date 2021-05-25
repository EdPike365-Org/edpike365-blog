 // Inlined css as *seperate* <style> tags in the head, via HeadInlinedStyleTags component
       //all css files will be loaded from graphql via "gatsby-source-filesystem", name="cssFiles"
      //only the files listed below will be inlined into head, the rest will be ignored
      //applied --in order-- shown, minified, <style id=filename(sans extension)>
        //"use": contains "always", always applied, NOT shown as option to user
        //"use": contains "default", applied by default, shows as user option
        //"use": contains "dark", will be chosen if user has OS prefers dark mode
        //"use": contains "default dark", will be chose for default AND dark
        //NOTE: this means filenames can't be named always, default or dark
        //if you have a large default with thin overlay options,
        // create an empty css file with desired name to proxy for the large default
        // !!!OMG: if you use the title field on more than 1 style, 
        // the browser will only load the first one it hits, it will disable any named sheets/styles past that one
        // I'm leaving title implemented in case someone wants to get their freak on