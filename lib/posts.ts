// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

// 1. Read all .md filenames, parse front matter, and return sorted array
export function getSortedPostsData(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostMeta[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const { title, date, tags } = matterResult.data as {
      title: string;
      date: string;
      tags: string[];
    };

    return { slug, title, date, tags };
  });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 2. Return an array of `{ params: { slug: string } }` for getStaticPaths
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));
}

export interface PostData {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  contentHtml: string;
}

// 3. Given a slug, read the Markdown, parse front matter, convert to HTML
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const { title, date, tags } = matterResult.data as {
    title: string;
    date: string;
    tags: string[];
  };

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return { slug, title, date, tags, contentHtml };
}
