// pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import { getAllPostSlugs, getPostData, PostData } from "../../lib/posts";

interface PostPageProps {
  postData: PostData;
}

export default function PostPage({ postData }: PostPageProps) {
  return (
    <Layout title={postData.title}>
      <article className="prose max-w-none">
        <h1 className="text-4xl font-bold mb-2">{postData.title}</h1>
        <p className="text-gray-500 mb-6">{postData.date}</p>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params!.slug as string);
  return {
    props: {
      postData,
    },
  };
};
