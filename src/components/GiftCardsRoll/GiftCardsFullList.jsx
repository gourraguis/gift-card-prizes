import React from 'react'
import { graphql, StaticQuery } from "gatsby"

import GiftCardsRoll from './GiftCardsRoll'

const GiftCardsFullList = () => (
  <StaticQuery
    query={graphql`
      query GiftCardRollQuery {
        allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___seoValue, frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "gift-card-post"}}}) {
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
    render={(data, count) => <GiftCardsRoll data={data} count={count}/>}
  />
)

export default GiftCardsFullList
