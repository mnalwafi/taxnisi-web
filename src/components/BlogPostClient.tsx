'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import RichText from '@/components/RichText'
import type { Post, Media, Team } from '@/payload-types'

export default function BlogPostClient({ post }: { post: Post }) {
  const { content } = useLanguage()
  const author = post.author as Team

  return (
    <article className="bg-white text-black min-h-screen">
      {/* HEADER */}
      <header className="pt-40 px-4 md:px-10 pb-10 max-w-4xl mx-auto text-center">
        <Link
          href="/blog"
          className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-8 inline-block"
        >
          ← {content.blog.back_blog}
        </Link>

        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest border border-black/20 px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">{post.title}</h1>

        <div className="flex justify-center items-center gap-8 text-sm opacity-60">
          <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
          {author && (
            <div className="flex items-center gap-2">
              <span>
                {content.blog.written_by} {author.name}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* COVER IMAGE */}
      <div className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden mb-20">
        <Image
          src={(post.coverImage as Media)?.url || ''}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 pb-32">
        <RichText content={post.content} className="text-lg md:text-xl leading-relaxed drop-cap" />
      </div>
    </article>
  )
}
