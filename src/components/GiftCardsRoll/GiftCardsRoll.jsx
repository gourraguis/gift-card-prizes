import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "gatsby"

const GiftCardsRoll = ({ data: { allMarkdownRemark: { edges: posts } } }) => (
  <div className="columns is-multiline">
    {posts &&
      posts.map(({ node: { id, fields: { slug, title }, frontmatter: { templateKey, image } } }) => (
        <div className="column is-narrow" key={id}>
          <Link to={slug}>
            <figure className="image gift-card">
              <img
                src={image.childImageSharp ? image.childImageSharp.fluid.src : image}
                alt={title}
              />
            </figure>
          </Link>
        </div>
      ))
    }
  </div>
)

GiftCardsRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
}

export default GiftCardsRoll

