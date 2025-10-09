import { fetchAllSlugs, fetchContent } from '../../lib/hashnode';

export default function DynamicPage({ content }) {
  if (!content) return <p>Page not found</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}

// Generate paths for all posts and pages
export async function getStaticPaths() {
  const { postSlugs, pageSlugs } = await fetchAllSlugs();
  const allSlugs = [...postSlugs, ...pageSlugs];

  const paths = allSlugs.map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking', // handles new pages/posts automatically
  };
}

// Fetch content for each slug
export async function getStaticProps({ params }) {
  const content = await fetchContent(params.slug);

  if (!content) {
    return { notFound: true };
  }

  return {
    props: { content },
    revalidate: 60, // regenerate page every 60 seconds
  };
}


import { fetchAllSlugs, fetchContent } from '../lib/hashnode';

export default function DynamicPage({ content }) {
  if (!content) return <p>Page not found</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}

export async function getStaticPaths() {
  const { postSlugs, pageSlugs } = await fetchAllSlugs();
  const allSlugs = [...postSlugs, ...pageSlugs];

  const paths = allSlugs.map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking', // New pages/posts generated on the fly
  };
}

export async function getStaticProps({ params }) {
  const content = await fetchContent(params.slug);

  if (!content) {
    return { notFound: true };
  }

  return {
    props: { content },
    revalidate: 60, // Update every 60 seconds
  };
}
