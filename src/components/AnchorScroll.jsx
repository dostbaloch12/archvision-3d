'use client'

import { useEffect } from 'react'

const NAVBAR_HEIGHT = 92

function scrollToHash(hash, behavior = 'smooth') {
  if (!hash || hash === '#') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  const target = document.querySelector(hash)

  if (!target) {
    return
  }

  if (hash === '#top') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  const targetTop = target.getBoundingClientRect().top + window.scrollY
  const finalTop = Math.max(targetTop - NAVBAR_HEIGHT, 0)

  window.scrollTo({
    top: finalTop,
    behavior,
  })
}

export default function AnchorScroll() {
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest('a')

      if (!link) return

      const rawHref = link.getAttribute('href')

      if (!rawHref) return

      const isSamePageHash = rawHref.startsWith('#')
      const isHomeHash = rawHref.startsWith('/#')

      if (!isSamePageHash && !isHomeHash) return

      const hash = isSamePageHash ? rawHref : rawHref.replace('/', '')

      if (!document.querySelector(hash) && hash !== '#top') return

      event.preventDefault()

      scrollToHash(hash)

      window.history.pushState(null, '', hash)
    }

    document.addEventListener('click', onClick)

    const initialHash = window.location.hash
    if (initialHash) {
      window.setTimeout(() => {
        scrollToHash(initialHash, 'auto')
      }, 120)
    }

    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}