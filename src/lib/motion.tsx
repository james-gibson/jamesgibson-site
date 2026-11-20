import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react'
import { BorderBeam, NumberTicker, Reveal } from 'fancy-ui-react'

/**
 * The motion budget.
 *
 * The default is calm: reveals and small accents, no ambient loops. A reader can
 * choose still or full, and the choice is stored because a preference that
 * resets on navigation is not a preference. Reduced-motion is not an override:
 * it wins, always.
 */
export type MotionMode = 'still' | 'calm' | 'full'

/**
 * The modes this site actually implements.
 *
 * A copy of the seed that never added a `full`-only effect is still offering a
 * control for it, and the control does nothing — which is worse than not having
 * it. Declaring the modes here lets the toggle offer exactly these, so the
 * control cannot lie about what the site does.
 */
export const MODES: MotionMode[] = ['still', 'calm', 'full']

const STORAGE_KEY = 'jamesgibson.motion'

type MotionState = {
  /** the mode actually in force */
  mode: MotionMode
  /** what the ladder would choose, before any preference */
  auto: MotionMode
  /** null until the reader chooses */
  explicit: MotionMode | null
  setMode: (mode: MotionMode) => void
  /** true when the OS asks for reduced motion; it pins mode to "still" */
  reduced: boolean
}

const MotionContext = createContext<MotionState | null>(null)

function isMode(value: string | null): value is MotionMode {
  return value === 'still' || value === 'calm' || value === 'full'
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [explicit, setExplicit] = useState<MotionMode | null>(() => {
    if (typeof window === 'undefined') return null
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return isMode(stored) ? stored : null
  })

  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const auto = useMemo<MotionMode>(() => 'calm', [])

  const setMode = useCallback((mode: MotionMode) => {
    setExplicit(mode)
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // Private browsing with storage disabled: the choice still applies this session.
    }
  }, [])

  const mode: MotionMode = reduced ? 'still' : (explicit ?? auto)

  return (
    <MotionContext.Provider value={{ mode, auto, explicit, setMode, reduced }}>
      {children}
    </MotionContext.Provider>
  )
}

export function useMotion(): MotionState {
  const state = useContext(MotionContext)
  if (!state) throw new Error('useMotion must be used inside <MotionProvider>')
  return state
}

/** A reveal that becomes a plain block when motion is off. */
export function MotionReveal({
  preset = 'fade-up',
  delay = 0,
  className,
  children,
}: {
  preset?: ComponentProps<typeof Reveal>['preset']
  delay?: number
  className?: string
  children: ReactNode
}) {
  const { mode } = useMotion()
  if (mode === 'still') return <div className={className}>{children}</div>
  return (
    <Reveal preset={preset} delay={delay} className={className}>
      {children}
    </Reveal>
  )
}

/** A border beam that simply is not there when motion is off. */
export function MotionBeam(props: ComponentProps<typeof BorderBeam>) {
  const { mode } = useMotion()
  if (mode === 'still') return null
  return <BorderBeam {...props} />
}

/** A number that counts only when counting is welcome. */
export function MotionTicker({ value, duration = 1100 }: { value: number; duration?: number }) {
  const { mode } = useMotion()
  if (mode === 'still') return <>{value}</>
  return <NumberTicker value={value} duration={duration} />
}
