'use client'

import React, { useState } from 'react'

interface FloatingInputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  label: string
  multiline?: boolean
}

export default function FloatingInput({
  label,
  multiline,
  className = '',
  ...props
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const handleBlur = (e: React.FocusEvent<any>) => {
    setFocused(false)
    setHasValue(!!e.target.value)
    if (props.onBlur) props.onBlur(e)
  }

  const InputTag = multiline ? 'textarea' : 'input'
  const active = focused || hasValue

  return (
    <div className={`relative pt-6 mb-8 ${className}`}>
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-sans
          ${
            active ? 'top-0 text-sm text-black/50 tracking-widest' : 'top-6 text-xl text-black/40'
          }`}
      >
        {label}
      </label>

      <InputTag
        {...props}
        onFocus={(e) => {
          setFocused(true)
          props.onFocus?.(e)
        }}
        onBlur={handleBlur}
        className={`w-full bg-transparent border-b border-black/20 py-2 text-xl font-serif outline-none transition-colors duration-300
          focus:border-black ${multiline ? 'min-h-[100px] resize-none' : ''}`}
      />
    </div>
  )
}
