import { Route, Routes, useParams } from 'react-router-dom'
import { Layout } from './components/Layout'
import { SECTIONS, getPage, type SectionId } from './lib/content'
import { DocPage } from './pages/DocPage'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { SectionIndex } from './pages/SectionIndex'

function isSection(value: string | undefined): value is SectionId {
  return !!value && SECTIONS.some((s) => s.id === value)
}

function SectionRoute() {
  const { section } = useParams()
  if (!isSection(section)) return <NotFound />
  return <SectionIndex section={section} />
}

function PageRoute() {
  const { section, slug } = useParams()
  const page = isSection(section) && slug ? getPage(section, slug) : undefined
  if (!page) return <NotFound />
  return <DocPage page={page} />
}

/** Old portfolio URLs: render the same page at the old path, no redirect. */
function LegacyDoc({ section, slug }: { section: SectionId; slug: string }) {
  const page = getPage(section, slug)
  if (!page) return <NotFound />
  return <DocPage page={page} />
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {/* URLs from the previous portfolio: keep them alive. */}
        <Route path="cv-technical" element={<LegacyDoc section="about" slug="cv-technical" />} />
        <Route path="cv-executive" element={<LegacyDoc section="about" slug="cv-executive" />} />
        <Route path="contact" element={<LegacyDoc section="contact" slug="details" />} />
        <Route path=":section" element={<SectionRoute />} />
        <Route path=":section/:slug" element={<PageRoute />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
