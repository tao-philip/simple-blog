// pages/index.tsx
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export default function HomePage({ posts }) {
  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post}>
            <Link href={`/posts/${post}`}>
            {post}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))

  return {
    props: {
      posts: files.map((filename) => filename.replace('.md', ''))
    },
    revalidate: 60
  }
}