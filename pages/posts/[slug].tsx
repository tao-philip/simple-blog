// pages/posts/[slug].tsx
import fs from 'fs'
import path from 'path'
import { useRouter } from 'next/router'

export default function PostPage({ post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{post}</h1>
    </div>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const post = fs.readFileSync(path.join('posts', slug + '.md'), 'utf8')

  return {
    props: {
      post
    }
  }
}