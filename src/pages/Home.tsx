import { Link, useNavigate } from 'react-router-dom'
import {
  BentoGrid,
  BentoGridCard,
  Button,
  GradientButton,
  RainbowButton,
} from 'fancy-ui-react'
import { SECTIONS, pagesIn } from '../lib/content'
import { MotionBeam, MotionReveal, useMotion } from '../lib/motion'
import { usePageMeta } from '../lib/usePageMeta'

const base = import.meta.env.BASE_URL

export function Home() {
  usePageMeta(
    undefined,
    'James Gibson is a Node.js Platform Architect in Denver. His work, his approach to platform engineering, and how to reach him.',
  )
  const navigate = useNavigate()
  const { mode } = useMotion()
  const still = mode === 'still'
  const full = mode === 'full'

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="plot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <MotionReveal preset="fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs tracking-wide text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-pulse" />
                Denver, CO · working remotely
              </p>
            </MotionReveal>

            <MotionReveal preset="fade-up" delay={60}>
              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-cream sm:text-6xl">
                James Gibson,
                <br />
                <span className="text-pulse">Node.js Platform Architect</span>.
              </h1>
            </MotionReveal>

            <MotionReveal preset="fade-up" delay={120}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                Platform architecture, developer enablement and technical leadership. I work at
                the boundary between a system and the people who have to use it — where a correct
                design and a usable one are the same problem.
              </p>
            </MotionReveal>

            <MotionReveal preset="fade-up" delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {full ? (
                  <>
                    <RainbowButton href={`${base}about/james`}>
                      About James<span className="sr-only"> — read the short version</span>
                    </RainbowButton>
                    <GradientButton onClick={() => navigate('/work')}>
                      See the work
                    </GradientButton>
                  </>
                ) : (
                  <>
                    <Button href={`${base}about/james`} variant="primary">
                      About James<span className="sr-only"> — read the short version</span>
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/work')}>
                      See the work
                    </Button>
                  </>
                )}
              </div>
            </MotionReveal>

            <p className="mt-6 text-xs text-muted">
              Source available for the open-source work. No signup, no gate.
            </p>
          </div>

          <MotionReveal preset="fade-up" delay={140}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/90 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
              <MotionBeam colorFrom="#ff2d95" colorTo="#ffc2dd" duration={11} size={220} glow={0.5} />
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs tracking-[0.16em] text-muted uppercase">Start here</p>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pulse" />
                  <Link to="/about/james" className="text-cream hover:text-pulse">
                    The short version
                  </Link>{' '}
                  — who James is and where.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pulse" />
                  <Link to="/about/experience" className="text-cream hover:text-pulse">
                    Experience
                  </Link>{' '}
                  — roles, stacks and artifacts.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
                  <Link to="/contact/details" className="text-cream hover:text-pulse">
                    Contact
                  </Link>{' '}
                  — email, GitHub and LinkedIn.
                </li>
              </ul>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-cream sm:text-3xl">
              Three ways in
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              The site is small on purpose. Every page is reachable from these three sections, and
              each one says what it is before it says anything else.
            </p>
          </div>
        </div>

        <MotionReveal preset="fade-up" className="mt-8">
          <BentoGrid accent="#ff2d95" className="w-full" reveal={!still}>
            {SECTIONS.map((section) => (
              <BentoGridCard
                key={section.id}
                name={section.label}
                description={section.blurb}
                href={`${base}${section.id}`}
                cta={`${pagesIn(section.id).length} pages`}
                icon={<span className="font-mono text-xs text-pulse">{section.id}</span>}
              />
            ))}
          </BentoGrid>
        </MotionReveal>
      </section>

      <section className="overflow-hidden border-y border-line/70 bg-surface/40 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 sm:px-8">
          <p className="text-sm text-muted">Looking for the CVs?</p>
          <Link
            to="/about/cv-technical"
            className="text-sm text-pulse underline decoration-pulse/30 underline-offset-4 hover:decoration-pulse"
          >
            Technical
          </Link>
          <Link
            to="/about/cv-executive"
            className="text-sm text-pulse underline decoration-pulse/30 underline-offset-4 hover:decoration-pulse"
          >
            Executive
          </Link>
          <Link to="/contact/details" className="text-sm text-cream hover:text-pulse">
            Or get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
