import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

// TODO: implemnt Seo.propTypes

// TODO: implement open graph protocol TODO implement https://ogp.me/
/* og image should be 1,200 x 630 px
   twitter size min 120 x 120, 
  recommended 600 x 600 (also pinterest), max 1,200 x 1,200 
  (also facebook and instagram)
*/
/*
import defaultOpenGraphImage from "/src/images/profile-pic.png"

Seo.defaultProps = {
  lang: `en`,
  meta: [],
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
}
*/

// Naming Seo to cmply with PascalCase rule
export const Seo = ({ title, description, pathname, children }) => {

  //get default values from the metadata hook
  const { title: defaultTitle, description: defaultDescription, image, siteUrl, social } = useSiteMetadata()
  const twitterUsername = social?.twitter || ``

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <link rel="icon" href="/favicon.svg" />
      {children}
    </>
  )
}