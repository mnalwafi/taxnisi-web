'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

// 1. Extend standard Button props so it accepts onClick, type, disabled, etc.
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export default function MagneticButton({
  children,
  className = '',
  ...props // 2. Capture other props (like 'type' or 'disabled')
}: MagneticButtonProps) {
  const magnetRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const magnet = magnetRef.current
    if (!magnet) return

    const xTo = gsap.quickTo(magnet, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' })
    const yTo = gsap.quickTo(magnet, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' })

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = magnet.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      xTo(x * 0.35)
      yTo(y * 0.35)
    }

    const mouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    magnet.addEventListener('mousemove', mouseMove)
    magnet.addEventListener('mouseleave', mouseLeave)

    return () => {
      magnet.removeEventListener('mousemove', mouseMove)
      magnet.removeEventListener('mouseleave', mouseLeave)
    }
  }, [])

  return (
    // 3. Spread the props onto the button element
    <button ref={magnetRef} className={`relative ${className}`} {...props}>
      {children}
    </button>
  )
}
