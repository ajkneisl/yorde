import { useEffect, useRef, useState } from "preact/hooks"

const KEY = "yorde:aim"
const INTERACTIVE = "a, button, input, [role='button']"

/** Is this a device where a custom cursor makes any sense at all? */
function precisePointer() {
    return typeof matchMedia !== "undefined" && matchMedia("(pointer: fine)").matches
}

export function useAim() {
    const [aim, setAim] = useState(false)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (!precisePointer()) {
            setReady(true)
            return
        }
        const stored = localStorage.getItem(KEY)
        setAim(stored === null ? true : stored === "on")
        setReady(true)
    }, [])

    useEffect(() => {
        if (!ready) return
        document.documentElement.classList.toggle("aim", aim)
        try {
            localStorage.setItem(KEY, aim ? "on" : "off")
        } catch {
            /* private mode — the toggle just won't persist */
        }
    }, [aim, ready])

    return { aim: aim && ready, toggle: () => setAim((v) => !v) }
}

/** CS2-style crosshair that snaps to the pointer and flares red over anything clickable. */
export function Crosshair({ enabled }: { enabled: boolean }) {
    const ref = useRef<HTMLDivElement>(null)
    const [hits, setHits] = useState<{ id: number; x: number; y: number }[]>([])

    useEffect(() => {
        if (!enabled) return

        const move = (e: MouseEvent) => {
            const el = ref.current
            if (!el) return
            el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
            el.classList.add("live")
            const target = e.target as Element | null
            el.classList.toggle("hot", !!target?.closest?.(INTERACTIVE))
        }

        const click = (e: MouseEvent) => {
            const id = Date.now() + Math.random()
            setHits((h) => [...h, { id, x: e.clientX, y: e.clientY }])
            setTimeout(() => setHits((h) => h.filter((p) => p.id !== id)), 380)
        }

        window.addEventListener("mousemove", move, { passive: true })
        window.addEventListener("mousedown", click)
        return () => {
            window.removeEventListener("mousemove", move)
            window.removeEventListener("mousedown", click)
        }
    }, [enabled])

    if (!enabled) return null

    return (
        <>
            <div ref={ref} class="crosshair" aria-hidden="true">
                <i class="t" />
                <i class="b" />
                <i class="l" />
                <i class="r" />
                <i class="d" />
            </div>
            {hits.map((h) => (
                <span key={h.id} class="hitmarker" style={{ left: `${h.x}px`, top: `${h.y}px` }} />
            ))}
        </>
    )
}
