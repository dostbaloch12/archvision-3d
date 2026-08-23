'use client'

import { useEffect } from 'react'

const NAVBAR_HEIGHT = 92

export default function AnchorScroll() {
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest('a')

      if (!link) return

      const href = link.getAttribute('href')

      if (!href) return

      const isHash = href.startsWith('#')
      const isHomeHash = href.startsWith('/#')

      if (!isHash && !isHomeHash) return

      const hash = isHash ? href : href.replace('/', '')
      const target = document.querySelector(hash)

      if (!target) return

      event.preventDefault()

      const top =
        target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT

      window.scrollTo({
        top,
        behavior: 'smooth',
      })

      window.history.pushState(null, '', hash)
    }

    document.addEventListener('click', onClick)

    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}