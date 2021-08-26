---
title: "NPM Package Dev Workflow"
date: "2021-08-23:12:03.284Z"
status: published
author: EdPike365
tags:
  - Node
  - Package
  - NPM
  - npmjs.com
  - gatsby
  - plugins
---

## An Evolving Scratch Sheet For Me That Might Be Helpful For You

I'm newish to creating node packages. I dove into the deep end of the pool and here I note what I've learned. I am still close enough to what a scientist would call "naive" that I can hopefully relate things for other beginners while they are still fresh for me. Later, they will be so second nature to me that I will forget to document them for beginners.

## Editing/Forking Installed Packages

You may have installed someone else's package in a parent project. You looked at the code in `node_modules` and want to edit the code. You don't want to wait for the changes to get rolled into the parent project via PR's, so you create your own installable NPM package.

**Rough Order of Business:**
Details will be below

1. Cut and paste to a new project folder
1. Edit package.json
1. Git init and commit (or maybe just `npm init`)
1. Version
1. Publish

### Developing in Context of an external Project

This is an important variable. If your are developing packages that must exist within a parent project, e.g. a Gatsby plugin, you may be able to leverage `peer dependencies`.

**Linking Options:**

1. Specifically for Gatsby, develop your plugin within a [plugins folder](https://www.gatsbyjs.com/docs/loading-plugins-from-your-local-plugins-folder/) below your src folder. Then you will not have to deal with linking until you want to publish your package.

2. Have the package in a seperate project folder. Then:

- Use `npm link` to [create a symbolic link](https://docs.npmjs.com/cli/v6/commands/npm-link) between your package project folder and the project using the package.
- Or [create](https://docs.npmjs.com/cli/v7/commands/npm-pack) and [install](https://docs.npmjs.com/cli/v7/commands/npm-install) a package **tarball**. NOTE: When you are ready to install it directly from NPM, you must explicitly uninstall the tarball; `npm install xyz` will NOT do it automatically. TODO see whether or not the parent project package is auto updated if a new tar file is created or does it have to be installed again to update.

3. Keep editing the installed package in the parent's `node_modules` folder. Be careful not to run `install` in the parent project, or you will overwrite your work. Eventually, when you want to put it on [npmjs.com](https://www.npmjs.com/) you need to move it to its own project (option 2, above)

### Editing package.json

- If you copied the package from an installation, node will have added some attributes to package.json during install. These properties are prefixed with an underscore. Remove them from the package.json file before creating a new git repo or publishing the package.
- You may add optional attributes that are meanginless to NPM.
- You may not create fields with `_` prefixes. TODO make sure this is true
- NPM will reorder all the attributes alphabetically when you run `npm version`.

#### Useful Attributes To Add or Enhance

**Extra Author Info**

```js
  "author": {
    "name": "EdPike365",
    "email": "edpike365@gmail.com",
    "url": "https://edpike365.com"
  },
```

**Scripts**

- Have a quick look at how npm runs `preXYZ` and `postXYZ` [commands](https://docs.npmjs.com/cli/v7/using-npm/scripts).
- Note that I added a "versionsOptions" attribute below to remind myself of the full set of options. It is ignored by npm.

```js
  "scripts": {
    "postversion": "git push && git push --tags && npm publish --dry-run",
    "test": "echo \"Error: no test specified\" && exit 1",
    "versionOptions": "patch, minor, major, prepatch, preminor, premajor, prerelease, from-git"
  },
```

## Publishing

- 2 Factor Auth on NMPjs.com: I enabled it and use Google Authenticator. I dev on windows. If I use git bash for windows, it does not prompt me for the auth code. If I use powershell, it does prompt me. I typically do all this stuff in VSCode anyway now.

- I don't have `npm publish` on my `postversion`, only a dry-run version.

## TODO

- Have seperate `test` scripts for levels of testing.
- How to install and uninstall test dependencies (like Gatsby) during `npm test`.

## ETC

**Useful Articles**

- This is a great tutorial on NPM package dev. https://egghead.io/lessons/javascript-add-version-control-to-npm-packages-using-git-init

- For developing a local package that is a dependency of another local project, `use npm link` https://www.deadcoderising.com/how-to-smoothly-develop-node-modules-locally-using-npm-link/
