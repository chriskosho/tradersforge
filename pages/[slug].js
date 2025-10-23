import { fetchAllSlugs, fetchContent } from '../lib/hashnode';

export default function DynamicPage({ content }) {
  if (!content) return <p>Page not found</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />

      {/* Add disclaimer below */}
      <hr style={{ margin: '2rem 0' }} />
<p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic', lineHeight: '1.6' }}>
        I am not a financial advisor. The content shared on this blog is for{' '}
        <b>educational and informational purposes only</b> and should not be considered
        financial or investment advice. Trading involves risk, and you should only trade
        with capital you can afford to lose.
        <br /><br />
        All thoughts and opinions expressed here are my own and{' '}
        <b>do not represent any trading systems, communities, or businesses</b> with which
        I may be associated.
      </p>
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
