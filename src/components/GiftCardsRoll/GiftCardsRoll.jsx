import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "gatsby"

const GiftCardsRoll = ({ posts }) => (
  <div className="columns is-multiline">
    {posts &&
      posts.map(({ title, slug, image }) => (
        <div className="column is-narrow" key={slug}>
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

