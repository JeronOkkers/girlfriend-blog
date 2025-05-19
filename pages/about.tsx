// pages/about.tsx
import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout title="About">
      <h2 className="text-3xl font-bold mb-4">About This Blog</h2>
      <p>
        This is a simple Next.js blog that uses Markdown for posts. My
        girlfriend can log into a friendly admin UI (Netlify CMS) to write new
        posts without ever touching code.
      </p>
    </Layout>
  );
}
