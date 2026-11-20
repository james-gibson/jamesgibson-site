import { useEffect } from 'react'

const SITE = 'James Gibson'

export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = !title ? `${SITE} — Node.js Platform Architect` : `${title} · ${SITE}`
    if (description) {
      const tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', description)
    }
  }, [title, description])
}
