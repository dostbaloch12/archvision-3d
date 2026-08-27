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

      const href = link.getAttribute('href')

      if (!href) return

      const isHash = href.startsWith('#')
      const isHomeHash = href.startsWith('/#')

      if (!isHash && !isHomeHash) return

      const hash = isHash ? href : href.replace('/', '')

      if (!document.querySelector(hash) && hash !== '#top') return

      event.preventDefault()
      scrollToHash(hash)
      window.history.pushState(null, '', hash)
    }

    document.addEventListener('click', onClick)

    if (window.location.hash) {
      window.setTimeout(() => {
        scrollToHash(window.location.hash, 'auto')
      }, 120)
    }

    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}