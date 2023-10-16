import React from "react"
import { css } from "@emotion/react"
import { useStaticQuery, graphql } from "gatsby"

const BuildInfo = () => {

    const data = useStaticQuery(
        graphql`
          query BuildInfoBioQuery {
            currentBuildDate {
              currentDate
            }
          }
        `
    )

    return (
        <div css={buildInfoDivCSS}>
            <div>
                Built with <a href="https://www.gatsbyjs.com">Gatsby v5</a> in{" "}
                {`${process.env.NODE_ENV}`} mode.<br />
                Last Built: {data.currentBuildDate.currentDate}
            </div>
            <div>
                Date formatting provided by my custom NPM package <a href="https://www.npmjs.com/package/gatsby-source-build-date">gatsby-source-build-date</a>
            </div>
        </div>
    )
}

const buildInfoDivCSS = css`
    padding: 0.5rem;
`

export default BuildInfo