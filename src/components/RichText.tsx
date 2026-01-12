import React, { JSX } from 'react'
import escapeHTML from 'escape-html'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types' // Ensure this path is correct

interface RichTextProps {
  content: any
  className?: string
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content?.root?.children) return null

  const serialize = (children: any[]): React.ReactNode => {
    return children.map((node, i) => {
      if (!node) return null

      // 1. Handle Basic Text
      if (node.type === 'text') {
        let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} key={i} />
        if (node.format & 1) text = <strong key={i}>{text}</strong>
        if (node.format & 2) text = <em key={i}>{text}</em>
        if (node.format & 8) text = <u key={i}>{text}</u>
        return text
      }

      // 2. Handle Links
      if (node.type === 'link') {
        return (
          <Link
            key={i}
            href={escapeHTML(node.fields.url)}
            target={node.fields.newTab ? '_blank' : '_self'}
            className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
          >
            {serialize(node.children)}
          </Link>
        )
      }

      // 3. Handle Images (The Missing Part!)
      if (node.type === 'upload') {
        const media = node.value as Media
        if (!media?.url) return null

        return (
          <div key={i} className="my-10 relative w-full h-auto">
            <Image
              src={media.url}
              alt={media.alt || 'Image'}
              width={media.width || 1000}
              height={media.height || 800}
              className="w-full h-auto rounded-lg object-cover"
            />
            {/* Optional Caption if you added one in Payload */}
            {node.fields?.caption && (
              <p className="text-sm opacity-50 mt-2 text-center">{node.fields.caption}</p>
            )}
          </div>
        )
      }

      // 4. Handle Blocks
      switch (node.type) {
        case 'heading':
          const Tag = node.tag as keyof JSX.IntrinsicElements
          return (
            <Tag key={i} className="font-serif text-3xl md:text-5xl mb-6 mt-12 first:mt-0">
              {serialize(node.children)}
            </Tag>
          )

        case 'paragraph':
          return (
            <p key={i} className="mb-6 opacity-80 leading-relaxed font-sans">
              {serialize(node.children)}
            </p>
          )

        case 'list':
          const ListTag = node.listType === 'number' ? 'ol' : 'ul'
          return (
            <ListTag
              key={i}
              className={`mb-6 pl-6 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'}`}
            >
              {serialize(node.children)}
            </ListTag>
          )

        case 'listitem':
          return (
            <li key={i} className="mb-2 pl-2">
              {serialize(node.children)}
            </li>
          )

        case 'quote':
          return (
            <blockquote
              key={i}
              className="border-l-2 border-black pl-6 py-2 my-10 text-2xl font-serif italic opacity-80"
            >
              {serialize(node.children)}
            </blockquote>
          )

        default:
          return <div key={i}>{serialize(node.children)}</div>
      }
    })
  }

  return <div className={className}>{serialize(content.root.children)}</div>
}
