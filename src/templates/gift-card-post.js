import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'


import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import GiftCardsCta from '../components/GiftCardsCta'
import GiftCardsRoll from '../components/GiftCardsRoll/GiftCardsRoll'

export const BlogPostTemplate = ({ content, contentComponent, title, service, helmet, images, relatedGiftCards }) => {
  const PostContent = contentComponent || Content
  //  todo: send service down to modalAnimation
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <GiftCardsCta images={images} service={service} title={title} />
        <p className='content has-text-primary is-small has-text-weight-semibold'>P.S: New cards are added to the database daily at midnight</p>
        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
          {title}
        </h1>
        <PostContent content={content} />
        <h2 className="title is-size-3">
          RELATED GIFT CARDS
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GiftCardsRoll posts={relatedGiftCards} />
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
  const relatedGiftCards = post.frontmatter.related.map(p => ({
    title: p.fields.title,
    slug: p.fields.slug,
    image: p.frontmatter.image
  }))
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        title={post.fields.title}
        service={post.frontmatter.title}
        description={post.frontmatter.description}
        images={[post.frontmatter.image1, post.frontmatter.image2, post.frontmatter.image3]}
        relatedGiftCards={relatedGiftCards}
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
        title
        description
        related {
          fields {
            title
            slug
          }
          frontmatter {
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
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
