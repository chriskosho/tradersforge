import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('https://gql.hashnode.com', {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HASHNODE_API_KEY}`,
  },
});

// Fetch all pages and posts slugs
export async function fetchAllSlugs() {
  const query = gql`
    query {
      user(username: "legendarydojo") {
        publication {
          posts(page: 0) {
            slug
          }
          pages {
            slug
          }
        }
      }
    }
  `;

  const data = await client.request(query);
  const postSlugs = data.user.publication.posts.map(post => post.slug);
  const pageSlugs = data.user.publication.pages.map(page => page.slug);

  return { postSlugs, pageSlugs };
}

// Fetch content for a given slug
export async function fetchContent(slug) {
  const query = gql`
    query GetContent($slug: String!) {
      user(username: "legendarydojo") {
        publication {
          post(slug: $slug) {
            title
            content
          }
          page(slug: $slug) {
            title
            content
          }
        }
      }
    }
  `;
  const variables = { slug };
  const data = await client.request(query, variables);

  // Return whichever exists: post or page
  return data.user.publication.post || data.user.publication.page;
}
