import React from "react"
import { Link } from "gatsby"
import * as styles from "./BlogPostSummary.module.css"

const BlogPostSummary = ({ post }) => {
  const slug = "/blog" + post.fields.slug
  const title = post.frontmatter.title || post.fields.slug
  const postDate = post.frontmatter.date
  const description = post.frontmatter.description || post.excerpt

  // article: https://medium.com/reactbrasil/using-structured-data-to-improve-your-seo-score-688875adfd7b
  /* renaming LINK to LinK with PascalCase to avoid lint warning :-( */
  /* this uses the "props to className" overrided functionality of Emotion */
  //const LinK = styled(props => <Link {...props} />)`

  return (
    <article
      className="post-list-item"
      itemScope
      itemType="http://schema.org/Article"
    >
      <Link to={slug} itemProp="url" className={styles.linkStyle} >
      <div className={styles.SummaryContainerDiv} >
        <h3 className={styles.styledH3} >
            <span itemProp="headline">{title}</span>
        </h3>
        <span className="overline">{postDate}</span>
        <div>
          <span
            className="body1"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            itemProp="description"
          />
        </div>
       </div>
       </Link>
    </article>
  )
}

export default BlogPostSummary
