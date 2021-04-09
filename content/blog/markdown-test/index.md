---
title: MarkDown It Test In Gatsby
status: archived
date: "2015-05-06T23:46:37.121Z"
---

---
We are working to make the ultimate Developer friendly Mark Down Renderer in Gatsby.
We will do a series of test versus 

## Test 1: MarkDown It
First we'll test code from https://markdown-it.github.io/

First Pass Problems and Solutions
Go to that page to see what this should look like. 
- Headers: The h1 Heading Smiley Icon did not load.
- Typographic replacements: Nothing worked except "Smartypaints quotes". Added the "oldschool" arg to the config for smartypants and the en-dash and em-dash started working.
- Blockquotes: verticle bars did not space the same. When shrinking the width they suddenly behave correctly, so its some sort of CSS problem.
- Lists: 3rd level nesting did not work. Something to do with "::marker", probably CSS. [Markdown guide]() recomends just using the same - character. I tried that but it still did not work. CSS?
- Tables: The spacing between columns was too small. Rows were not alternated bg color. Both are likely CSS problems.
- Links: link text underlined. CSS.
- Images: Cat and Stormtrooper are full width, not on same row. Ninja cat is full width. But my site is not responsive yet. CSS.
- Emojies dont work. I instaled gatsby-remark-emoji (note lack of s at end). It advertises support for Slack emojis. The emoji short codes began to work. It was then that I noticed that neither the demo site nor my site rendered :crush: and :tear:; turns out they do not exist according to the emoji cheat sheet. I replaced them with kissing_closed_eyes and sob. I had to add some custom config to get ASCII, like :-) to work. Unicode is not tested. Unlike the reference site, the emojis were slanted because they were in a block quote and therefore italicized. I think that is appropriate so I'm not going to try to fix it. Contrary to the plugin's docs, it supports more than the [JS functions](https://demos.joypixels.com/latest/index.html#js), I tried "shortnameToImage", and it worked but they were not scaled correctly so I switched back.
- Subscript / Superscript don't work. There was a sub and super gatsby plugin but it used `<sub>` and `<super>` instead of ^ and ~.
- Inserted text and Marked text do not work
- Footnotes, Definition lists, Abreviations
- Automated footnotes do not show all the references to them.

```
 {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
```

##Test begins below here:

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
   * Ac tristique libero volutpat at
   + Facilisis in pretium nisl aliquet
   - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar


## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of `markdown-it` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

Classic markup: :wink: :kissing_closed_eyes: :cry: :sob: :laughing: :yum:

Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::

---
## Using HTML to get Definition List
This idea came from [a post](https://gist.github.com/brandonkal/81aef71276a54536951c0f205797999c) about testing Gatsby vs the Markdown Cheatsheet
---
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>