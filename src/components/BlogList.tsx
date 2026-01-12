'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import type { Post, Media, Team } from '@/payload-types'

export default function BlogList({ posts }: { posts: Post[] }) {
  const { content } = useLanguage()

  // Format Date Helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-white text-black pt-40 px-4 md:px-10 pb-20">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <p className="text-sm uppercase tracking-widest opacity-40 font-bold mb-4">
          ( {content.blog.title} )
        </p>
        <h1 className="font-serif text-6xl md:text-8xl mb-6">{content.blog.subtitle}</h1>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
        {posts.map((post, i) => {
          const isFeatured = i === 0 // First item is BIG
          const author = post.author as Team

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`group block ${isFeatured ? 'md:col-span-3 mb-10' : 'md:col-span-1'}`}
            >
              {/* IMAGE */}
              <div
                className={`relative overflow-hidden bg-gray-100 mb-6 ${isFeatured ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}
              >
                <Image
                  src={(post.coverImage as Media)?.url || ''}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* META */}
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-40 mb-3">
                <span>{post.category}</span>
                <span>•</span>
                <span>{formatDate(post.publishedDate)}</span>
              </div>

              {/* TITLE */}
              <h2
                className={`font-serif leading-tight group-hover:underline decoration-1 underline-offset-4 mb-4 ${isFeatured ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}
              >
                {post.title}
              </h2>

              {/* EXCERPT */}
              <p
                className={`opacity-60 leading-relaxed font-serif mb-4 ${isFeatured ? 'text-xl max-w-2xl' : 'text-base'}`}
              >
                {post.excerpt}
              </p>

              {/* AUTHOR */}
              {author && (
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={(author.photo as Media)?.url || ''}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs uppercase tracking-widest opacity-50">
                    {author.name}
                  </span>
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
