import { unified } from 'unified';
import parse from 'rehype-parse';
import rehypeSlug from 'rehype-slug';
import rehypeTOC from 'rehype-toc';
import rehypeStringify from 'rehype-stringify';
import { fetchAllSlugs, fetchContent } from '../lib/hashnode';

// Generate TOC HTML
async function generateTOC(htmlContent) {
  const file = await unified()
    .use(parse, { fragment: true })  // parse HTML fragment
    .use(rehypeSlug)                 // add IDs to headings
    .use(rehypeTOC, { headings: ['h2', 'h3'] }) // generate TOC for H2/H3
    .use(rehypeStringify)
    .process(htmlContent);

  return String(file);
}

// Main component for posts/pages
export default function DynamicPage({ content, toc }) {
  if (!content) return <p>Page not found</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{content.title}</h1>

      {/* Table of Contents */}
      <div
        className="toc"
        dangerouslySetInnerHTML={{ __html: toc }}
        style={{
          backgroundColor: '#111',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      />

      {/* Main Content */}
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}

// Generate paths for all posts and pages
export async function getStaticPaths() {
  const { postSlugs, pageSlugs } = await fetchAllSlugs();
  const allSlugs = [...postSlugs, ...pageSlugs];

  const paths = allSlugs.map((slug) => ({ params: { slug } }));

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

  const toc = await generateTOC(content.content);

  return {
    props: { content, toc },
    revalidate: 60,
  };
}
