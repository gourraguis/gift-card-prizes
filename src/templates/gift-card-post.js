import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

const GiftCard = ({ image, title, disabled }) => (
  <div className="column is-narrow">
    <figure className={`image gift-card ${disabled ? 'gift-card-disabled' : ''}`}>
      <img
        src={image.childImageSharp ? image.childImageSharp.fluid.src : image}
        alt={title}
      />
    </figure>
  </div>
)

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  images
}) => {
  const PostContent = contentComponent || Content
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="columns">
              <GiftCard image={images[0]} title="dummy"/>
              <GiftCard image={images[1]} title="dummy"/>
              <GiftCard image={images[2]} title="dummy" disabled/>
            </div>
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        title={post.fields.title}
        description={post.frontmatter.description}
        images={[post.frontmatter.image1, post.frontmatter.image2, post.frontmatter.image3]}
        helmet={
          <Helmet>
            <title>{post.fields.title}</title>
            <meta
              name="description"
              content={post.frontmatter.description}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query GiftCardPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        title
      }
      frontmatter {
        description
        image1 {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image2 {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image3 {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
