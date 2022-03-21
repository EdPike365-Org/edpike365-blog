import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"

// Note: this defaults to 280px wide.
const SummaryContainer = styled.div`
  padding: 0.5rem;
  margin: 0.25rem;

  border-radius: var(--shape-border-radius);
  border: var(--shape-border);
  box-shadow: var(--shape-box-shadow);

  color: var(--color-text-secondary);
  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  @media only screen and (min-width: 320px) {
    padding: 1rem;
    margin: 0.5rem;
  }
`

// & is a placeholder for the generated class name
const Header = styled.h3`
  margin-top: 0px;
  margin-bottom: 0px;
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  & > a:link {
    text-decoration: none;
  }

  & > a:hover {
    background-color: var(--palette-action-hover);
  }
`
const BlogPostDescription = styled.div``

const BlogPostSummary = ({ post }) => {
  const slug = "/blog" + post.fields.slug
  const title = post.frontmatter.title || post.fields.slug
  const postDate = post.frontmatter.date
  const description = post.frontmatter.description || post.excerpt

  // article: https://medium.com/reactbrasil/using-structured-data-to-improve-your-seo-score-688875adfd7b
  /* renaming LINK to LinK with PascalCase to avoid lint warning :-( */
  /* this uses the props to className overrided functionality of Emotion */
  const LinK = styled(props => <Link {...props} />)`
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
    :hover {
      color: var(--color-text-primary);
    }
  `

  return (
    <article
      className="post-list-item"
      itemScope
      itemType="http://schema.org/Article"
    >
      <SummaryContainer>
        <Header>
          <LinK to={slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </LinK>
        </Header>
        <span className="overline">{postDate}</span>
        <BlogPostDescription>
          <span
            className="body1"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            itemProp="description"
          />
        </BlogPostDescription>
      </SummaryContainer>
    </article>
  )
}

export default BlogPostSummary
