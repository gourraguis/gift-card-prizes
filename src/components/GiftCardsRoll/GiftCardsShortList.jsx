import React from 'react'
import { graphql, StaticQuery } from "gatsby"

import GiftCardsRoll from './GiftCardsRoll'
import { extractPosts } from './utils'

const GiftCardsShortList = () => (
  <StaticQuery
    query={graphql`
      query GiftCardShortList {
        allMarkdownRemark(limit: 4, sort: {order: DESC, fields: [frontmatter___seoValue]}, filter: {frontmatter: {templateKey: {eq: "gift-card-post"}}}) {
          edges {
            node {
              id
              fields {
                slug
                title
              }
              frontmatter {
                templateKey
                image {
                  childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <GiftCardsRoll posts={extractPosts(data)} count={count}/>}
  />
)

export default GiftCardsShortList
