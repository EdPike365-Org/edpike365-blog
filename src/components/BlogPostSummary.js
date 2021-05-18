import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"

const SummaryContainer = styled.div`
  padding: 10px;
  margin: 0.5rem;
  background-color: var(--color-background-paper);
  border-radius: var(--shape-border-radius);
  border: var(--shape-border);
  box-shadow: var(--shape-box-shadow);
  color: var(--color-text-primary);
`

// & is a placeholder for the generated class name
const Header = styled.h3`
    margin-top: 0px;
    margin-bottom: 0px;

  & > a:link {
    text-decoration: none;
  }

  & > a:hover {
    background-color: var(--palette-action-hover);
  }
`
const BlogPostDescription = styled.div`

`

const BlogPostSummary = ({ post }) => {
  const slug = post.fields.slug
  const title = post.frontmatter.title || post.fields.slug
  const postDate = post.frontmatter.date
  const description = post.frontmatter.description || post.excerpt

  // article: https://medium.com/reactbrasil/using-structured-data-to-improve-your-seo-score-688875adfd7b

  return (
    <article
      className="post-list-item"
      itemScope
      itemType="http://schema.org/Article"
    >
      <SummaryContainer>
        <Header>
            <Link to={slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
        </Header>
        <span className="overline">{postDate}</span>
        <BlogPostDescription>
          <span className="body1"
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
