export function extractPosts(data) {
  return data.allMarkdownRemark.edges.map(({ node: { fields: { slug, title }, frontmatter: { image } } }) => ({
    title,
    slug,
    image
  }))
}
