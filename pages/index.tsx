// pages/index.tsx
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { getSortedPostsData, PostMeta } from "../lib/posts";

interface HomeProps {
  allPostsData: PostMeta[];
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout>
      <section>
        <h2 className="text-3xl font-bold mb-4">Latest Posts</h2>
        <ul>
          {allPostsData.map(({ slug, date, title }) => (
            <li key={slug} className="mb-4">
              <Link
                legacyBehavior
                href={`/posts/${slug}`}
                className="text-xl text-blue-600 hover:underline"
              >
                {title}
              </Link>
              <p className="text-gray-500 text-sm">Published on {date}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
