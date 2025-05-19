// components/Layout.tsx
import Head from "next/head";
import Link from "next/link";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = "My Blog" }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </Head>
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            <Link legacyBehavior href="/">
              <a>My Blog</a>
            </Link>
          </h1>
          <nav>
            <Link legacyBehavior href="/">
              <a className="mr-4 hover:underline">Home</a>
            </Link>
            <Link legacyBehavior href="/about">
              <a className="hover:underline">About</a>
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto flex-1 p-4">{children}</main>
      <footer className="bg-gray-100 text-gray-700 text-sm p-4 text-center">
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </footer>
    </div>
  );
}
