import React, { JSX } from 'react'
import escapeHTML from 'escape-html'

interface RichTextProps {
  content: any // Payload Lexical JSON
  className?: string
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content?.root?.children) return null

  // Simple Lexical Serializer
  const serialize = (children: any[]): React.ReactNode => {
    return children?.map((node, i) => {
      if (!node) return null

      if (node.type === 'text') {
        let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} key={i} />
        if (node.format & 1) text = <strong key={i}>{text}</strong>
        if (node.format & 2) text = <em key={i}>{text}</em>
        if (node.format & 8) text = <u key={i}>{text}</u>
        return text
      }

      switch (node.type) {
        case 'heading':
          const Tag = node.tag as keyof JSX.IntrinsicElements
          return (
            <Tag key={i} className="font-serif text-3xl md:text-4xl mb-4 mt-8">
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
              className={`mb-6 pl-4 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'}`}
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

        default:
          return <div key={i}>{serialize(node.children)}</div>
      }
    })
  }

  return <div className={className}>{serialize(content.root.children)}</div>
}
