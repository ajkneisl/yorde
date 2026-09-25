import type { JSX } from "preact"
import { useCallback, useEffect, useRef, useState } from "preact/hooks"
import { Console } from "./console"
import { Crosshair, useAim } from "./crosshair"
import {
    education,
    experience,
    killfeed,
    loadout,
    profile,
    projects,
    scoreboard,
    stats,
    type Bullet,
    type Link,
    type Rarity,
} from "./data"

const SECTIONS = [
    { id: "work", label: "Work" },
    { id: "scoreboard", label: "Scoreboard" },
    { id: "experience", label: "Experience" },
    { id: "loadout", label: "Loadout" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
]

const RARITY: Record<Rarity, { label: string; varName: string }> = {
    covert: { label: "Covert", varName: "var(--color-covert)" },
    classified: { label: "Classified", varName: "var(--color-classified)" },
    restricted: { label: "Restricted", varName: "var(--color-restricted)" },
    milspec: { label: "Mil-Spec", varName: "var(--color-milspec)" },
}

const reduceMotion = () =>
    typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches

export function App() {
    useReveal()
    const active = useActiveSection()
    const { aim, toggle } = useAim()
    const [consoleOpen, setConsoleOpen] = useState(false)
    const [shaking, setShaking] = useState(false)

    const shake = useCallback(() => {
        if (reduceMotion()) return
        setShaking(true)
        setTimeout(() => setShaking(false), 650)
    }, [])

    // ~ opens the console from anywhere that isn't a text field.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "`" && e.key !== "~") return
            const t = e.target as HTMLElement | null
            if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return
            e.preventDefault()
            setConsoleOpen((v) => !v)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    return (
        <div class={shaking ? "shake" : undefined}>
            <div class="bg-field" aria-hidden="true" />
            <div class="bg-radar" aria-hidden="true" />
            <div class="bg-grain" aria-hidden="true" />

            <Crosshair enabled={aim} />
            <Console
                open={consoleOpen}
                onClose={() => setConsoleOpen(false)}
                onShake={shake}
            />

            <ScrollProgress />
            <SideNav active={active} />
            <TopBar />

            <main class="mx-auto w-full max-w-5xl px-6 sm:px-8">
                <Hero />
                <Killfeed />
                <Bio />
                <Work />
                <Scoreboard />
                <Experience />
                <Loadout />
                <Education />
            </main>

            <Contact />
            <Hud aim={aim} onAim={toggle} onConsole={() => setConsoleOpen((v) => !v)} />
        </div>
    )
}

/* ---------------------------------------------------------------- chrome */

function ScrollProgress() {
    const [pct, setPct] = useState(0)

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
        }
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [])

    return (
        <div class="fixed inset-x-0 top-0 z-50 h-px" aria-hidden="true">
            <div
                class="h-full bg-gradient-to-r from-blaze to-gold transition-[width] duration-150 ease-out"
                style={{ width: `${pct}%` }}
            />
        </div>
    )
}

function TopBar() {
    return (
        <header class="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 mix-blend-difference sm:px-8">
            <a
                href="#top"
                class="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.28em] text-bone/80 transition-colors hover:text-bone"
            >
                Y. Eshete
            </a>
            <a
                href={`mailto:${profile.email}`}
                class="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.28em] text-bone/80 transition-colors hover:text-bone"
            >
                Get in touch
            </a>
        </header>
    )
}

function SideNav({ active }: { active: string }) {
    return (
        <nav class="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block" aria-label="Sections">
            <ul class="space-y-4">
                {SECTIONS.map((s) => {
                    const on = active === s.id
                    return (
                        <li key={s.id}>
                            <a href={`#${s.id}`} class="group flex items-center gap-3">
                                <span
                                    class={`block h-px transition-all duration-300 ${
                                        on ? "w-8 bg-blaze" : "w-4 bg-faint group-hover:w-6 group-hover:bg-muted"
                                    }`}
                                />
                                <span
                                    class={`font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                                        on ? "text-bone" : "text-faint group-hover:text-muted"
                                    }`}
                                >
                                    {s.label}
                                </span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

/** Bottom-right HUD: crosshair toggle + the console hint. */
function Hud({
    aim,
    onAim,
    onConsole,
}: {
    aim: boolean
    onAim: () => void
    onConsole: () => void
}) {
    return (
        <div class="fixed bottom-4 right-4 z-40 hidden items-center gap-2 sm:flex">
            <button
                type="button"
                onClick={onConsole}
                class="border border-line bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint backdrop-blur transition-colors hover:border-blaze/50 hover:text-bone"
            >
                <span class="text-blaze">~</span> console
            </button>
            <button
                type="button"
                onClick={onAim}
                aria-pressed={aim}
                class="border border-line bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint backdrop-blur transition-colors hover:border-blaze/50 hover:text-bone"
            >
                crosshair{" "}
                <span class={aim ? "text-scope" : "text-faint"}>{aim ? "on" : "off"}</span>
            </button>
        </div>
    )
}

/* ------------------------------------------------------------------ hero */

function Hero() {
    const ref = useRef<HTMLDivElement>(null)

    const onMove = (e: JSX.TargetedMouseEvent<HTMLElement>) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty("--mx", `${e.clientX - r.left}px`)
        el.style.setProperty("--my", `${e.clientY - r.top}px`)
    }

    return (
        <section
            id="top"
            class="relative flex min-h-[94svh] flex-col justify-center py-28"
            onMouseMove={onMove}
        >
            <Reticle />

            <div ref={ref} class="relative">
                <img
                    src="/yord.webp"
                    alt=""
                    width="64"
                    height="64"
                    class="rise mb-7 h-16 w-16 rounded-full object-cover ring-1 ring-blaze/40 ring-offset-4 ring-offset-ink"
                />

                <p
                    class="rise flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
                    style={{ animationDelay: "0.05s" }}
                >
                    <span class="inline-flex items-center gap-2">
                        <span class="relative flex h-1.5 w-1.5">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-scope opacity-70" />
                            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-scope" />
                        </span>
                        {profile.status}
                    </span>
                    <span class="text-faint">/</span>
                    <span>{profile.location}</span>
                </p>

                <h1 class="mt-7 font-display leading-[0.86] tracking-[-0.02em]">
                    <span class="rise block text-[clamp(3.2rem,13vw,9.5rem)]" style={{ animationDelay: "0.12s" }}>
                        {profile.first}
                    </span>
                    <span
                        class="rise block text-[clamp(3.2rem,13vw,9.5rem)] italic text-blaze"
                        style={{ animationDelay: "0.22s" }}
                    >
                        {profile.last}
                    </span>
                </h1>

                <div class="sweep rule mt-8 max-w-md" style={{ animationDelay: "0.4s" }} aria-hidden="true" />

                <p
                    class="rise mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
                    style={{ animationDelay: "0.34s" }}
                >
                    {profile.tagline}
                </p>

                <div class="rise mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.44s" }}>
                    <Button href="#work" primary>
                        See the work
                    </Button>
                    <Button href={profile.github}>GitHub</Button>
                    <Button href={profile.linkedin}>LinkedIn</Button>
                    <Button href={`mailto:${profile.email}`}>Email</Button>
                </div>

                <dl
                    class="rise mt-16 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4"
                    style={{ animationDelay: "0.54s" }}
                >
                    {stats.map((s) => (
                        <div key={s.label} class="group bg-ink-2/70 px-5 py-5 transition-colors hover:bg-ink-3">
                            <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                                {s.label}
                            </dt>
                            <dd>
                                <span class="mt-2 block font-display text-4xl leading-none text-bone">
                                    {s.value}
                                </span>
                                <span class="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-faint/70">
                                    {s.note}
                                </span>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}

/** Oversized crosshair ghosted behind the hero type. */
function Reticle() {
    return (
        <svg
            class="pointer-events-none absolute -right-10 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 text-blaze/[0.07] lg:block"
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden="true"
        >
            <circle cx="100" cy="100" r="78" stroke="currentColor" stroke-width="1" />
            <circle cx="100" cy="100" r="46" stroke="currentColor" stroke-width="1" />
            <circle cx="100" cy="100" r="3" fill="currentColor" />
            <path d="M100 6v56M100 138v56M6 100h56M138 100h56" stroke="currentColor" stroke-width="2" />
            <path
                d="M30 30h14M30 30v14M170 30h-14M170 30v14M30 170h14M30 170v-14M170 170h-14M170 170v-14"
                stroke="currentColor"
                stroke-width="2"
            />
        </svg>
    )
}

function Button({ href, primary, children }: { href: string; primary?: boolean; children: string }) {
    const external = href.startsWith("http")
    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            class={
                primary
                    ? "group inline-flex items-center gap-2 bg-blaze px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-bone hover:text-ink"
                    : "group inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-all duration-300 hover:border-blaze/60 hover:text-bone"
            }
        >
            {children}
            <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
    )
}

/* -------------------------------------------------------------- killfeed */

function WeaponGlyph({ kind }: { kind: (typeof killfeed)[number]["weapon"] }) {
    const common = { fill: "currentColor" }
    if (kind === "knife")
        return (
            <svg viewBox="0 0 48 18" class="h-3 w-11 text-bone/80" aria-hidden="true">
                <path {...common} d="M2 11h22l14-7-2 7h8v3H24L8 16l-6-2z" />
            </svg>
        )
    if (kind === "nade")
        return (
            <svg viewBox="0 0 48 18" class="h-3 w-11 text-bone/80" aria-hidden="true">
                <path {...common} d="M20 2h8v3h-8zM16 6h16a8 8 0 0 1 0 10H16a8 8 0 0 1 0-10z" />
                <path {...common} d="M32 1h10v2H32z" />
            </svg>
        )
    if (kind === "pistol")
        return (
            <svg viewBox="0 0 48 18" class="h-3 w-11 text-bone/80" aria-hidden="true">
                <path {...common} d="M8 4h30v4H24l-4 4h-4l-2 5H9l3-9H8z" />
            </svg>
        )
    if (kind === "awp")
        return (
            <svg viewBox="0 0 48 18" class="h-3 w-11 text-bone/80" aria-hidden="true">
                <path {...common} d="M0 8h12v4H0zM12 7h24v5H12zM36 8.5h12v2H36z" />
                <path {...common} d="M16 3h12v3H16zM20 12h5v5h-5z" />
            </svg>
        )
    return (
        <svg viewBox="0 0 48 18" class="h-3 w-11 text-bone/80" aria-hidden="true">
            <path {...common} d="M2 6h30v4H2zM32 7h14v2H32z" />
            <path {...common} d="M10 10h6l-2 7H8zM22 10h4v4h-4zM0 5h4v6H0z" />
        </svg>
    )
}

function Killfeed() {
    const row = (
        <div class="flex shrink-0 items-center">
            {killfeed.map((k, i) => (
                <div key={`${k.victim}-${i}`} class="kf mx-2 flex items-center gap-3 px-3 py-1.5">
                    <span class="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
                        {profile.alias}
                    </span>
                    <WeaponGlyph kind={k.weapon} />
                    {k.hs && (
                        <svg viewBox="0 0 16 16" class="h-3 w-3 text-bone/70" aria-hidden="true">
                            <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" />
                            <circle cx="8" cy="8" r="2" fill="currentColor" />
                        </svg>
                    )}
                    <span class="font-mono text-[11px] uppercase tracking-[0.12em] text-bone/85">
                        {k.victim}
                    </span>
                </div>
            ))}
        </div>
    )

    return (
        <div class="marquee edge-fade relative -mx-6 select-none overflow-hidden border-y border-line py-5 sm:-mx-8">
            <p class="sr-only">
                Technologies: {killfeed.map((k) => k.victim).join(", ")}
            </p>
            <div class="marquee-track" aria-hidden="true">
                {row}
                {row}
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------- bio */

function Bio() {
    return (
        <section class="py-24 sm:py-28">
            <div class="grid gap-8 md:grid-cols-[10rem_1fr]">
                <p
                    data-reveal
                    class="font-mono text-[10px] uppercase tracking-[0.24em] text-blaze md:pt-2"
                >
                    // player bio
                </p>
                <div data-reveal style={{ transitionDelay: "90ms" }} class="space-y-5">
                    {profile.bio.map((p, i) => (
                        <p key={i} class="max-w-2xl text-lg leading-relaxed text-bone/80 sm:text-xl">
                            {p}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* -------------------------------------------------------------- sections */

function SectionHead({
    id,
    index,
    kicker,
    title,
    note,
}: {
    id: string
    index: string
    kicker: string
    title: string
    note?: string
}) {
    return (
        <div data-reveal class="mb-12">
            <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-blaze">
                {index} // {kicker}
            </p>
            <h2
                id={`${id}-title`}
                class="mt-4 font-display text-[clamp(2.1rem,6vw,3.5rem)] leading-none tracking-[-0.02em]"
            >
                {title}
            </h2>
            {note && <p class="mt-4 max-w-lg text-sm leading-relaxed text-muted">{note}</p>}
            <div class="rule mt-6" aria-hidden="true" />
        </div>
    )
}

function Work() {
    return (
        <section id="work" class="scroll-mt-24 py-24 sm:py-32" aria-labelledby="work-title">
            <SectionHead
                id="work"
                index="01"
                kicker="inventory"
                title="Selected work"
                note="Built with other people, shipped on a deadline, defended in front of a room."
            />
            <div class="space-y-6">
                {projects.map((p, i) => (
                    <ProjectCard key={p.title} project={p} delay={i * 90} />
                ))}
            </div>
        </section>
    )
}

function ProjectCard({ project, delay }: { project: (typeof projects)[number]; delay: number }) {
    const ref = useRef<HTMLElement>(null)
    const rarity = RARITY[project.rarity]

    const onMove = (e: JSX.TargetedMouseEvent<HTMLElement>) => {
        const el = ref.current
        if (!el || reduceMotion()) return
        const r = el.getBoundingClientRect()
        el.style.setProperty("--cx", `${e.clientX - r.left}px`)
        el.style.setProperty("--cy", `${e.clientY - r.top}px`)
    }

    return (
        <article
            ref={ref}
            data-reveal
            style={{ transitionDelay: `${delay}ms`, "--rarity": rarity.varName }}
            onMouseMove={onMove}
            class="card brackets group p-7 sm:p-10"
        >
            <div class="flex flex-col gap-6 sm:flex-row sm:gap-10">
                <div class="flex shrink-0 items-start gap-4 sm:w-28 sm:flex-col sm:gap-3">
                    <span class="font-display text-5xl leading-none text-faint transition-colors duration-500 group-hover:text-[var(--rarity)]">
                        {project.num}
                    </span>
                    <span class="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                        <span
                            class="block h-2 w-2 shrink-0"
                            style={{ background: rarity.varName }}
                            aria-hidden="true"
                        />
                        {rarity.label}
                    </span>
                </div>

                <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                        <h3 class="font-display text-3xl leading-none tracking-[-0.01em] sm:text-4xl">
                            {project.title}
                        </h3>
                        <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                            {project.period}
                        </span>
                    </div>

                    {project.award && (
                        <p class="mt-3 inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                            ★ {project.award}
                        </p>
                    )}

                    <p class="mt-4 max-w-2xl text-base leading-relaxed text-bone/80">{project.blurb}</p>

                    <ul class="mt-5 space-y-2.5">
                        {project.bullets.map((b, i) => (
                            <li key={i} class="flex gap-3 text-sm leading-relaxed text-muted">
                                <span class="mt-2 h-px w-3 shrink-0 bg-faint" aria-hidden="true" />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>

                    <div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <TechRow items={project.tech} />
                        {project.links.length > 0 && (
                            <div class="flex flex-wrap items-center gap-4">
                                {project.links.map((l) => (
                                    <ExternalLink key={l.href} link={l} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <span class="rarity-bar" aria-hidden="true" />
        </article>
    )
}

function TechRow({ items }: { items: string[] }) {
    return (
        <ul class="flex flex-wrap gap-2">
            {items.map((t) => (
                <li
                    key={t}
                    class="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
                >
                    {t}
                </li>
            ))}
        </ul>
    )
}

function ExternalLink({ link }: { link: Link }) {
    return (
        <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            class="ul-link font-mono text-[11px] uppercase tracking-[0.18em] text-blaze hover:text-bone"
        >
            {link.label} ↗
        </a>
    )
}

/** End-of-match scoreboard for the things that actually got a result. */
function Scoreboard() {
    return (
        <section
            id="scoreboard"
            class="scroll-mt-24 py-24 sm:py-32"
            aria-labelledby="scoreboard-title"
        >
            <SectionHead
                id="scoreboard"
                index="02"
                kicker="match history"
                title="Scoreboard"
                note="Wins are nice. Shipping on a deadline with four other people is the actual skill."
            />
            <div data-reveal class="overflow-x-auto border border-line">
                <table class="w-full min-w-[34rem] border-collapse text-left">
                    <thead>
                        <tr class="border-b border-line bg-ink-2/70">
                            {["", "Event", "Entry", "Season", "Result"].map((h, i) => (
                                <th
                                    key={i}
                                    scope="col"
                                    class="px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-faint"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {scoreboard.map((r) => (
                            <tr
                                key={r.event + r.map}
                                class="border-b border-line last:border-0 transition-colors hover:bg-ink-3/60"
                            >
                                <td class="px-4 py-4 text-center">
                                    <span class={r.mvp ? "text-gold" : "text-faint/40"} aria-hidden="true">
                                        ★
                                    </span>
                                    {r.mvp && <span class="sr-only">MVP</span>}
                                </td>
                                <td class="px-4 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-bone">
                                    {r.event}
                                </td>
                                <td class="px-4 py-4 font-display text-xl text-bone/90">{r.map}</td>
                                <td class="px-4 py-4 font-mono text-[11px] tracking-[0.1em] text-faint">
                                    {r.year}
                                </td>
                                <td
                                    class={`px-4 py-4 font-mono text-[11px] uppercase tracking-[0.14em] ${
                                        r.tone === "gold" ? "text-gold" : "text-muted"
                                    }`}
                                >
                                    {r.result}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

function Experience() {
    return (
        <section id="experience" class="scroll-mt-24 py-24 sm:py-32" aria-labelledby="experience-title">
            <SectionHead
                id="experience"
                index="03"
                kicker="rounds played"
                title="Where I've worked"
                note="Support desks, student orgs, freelance clients — places where the fix has to work for someone who isn't me."
            />
            <ol class="relative space-y-12 border-l border-line pl-8 sm:pl-12">
                {experience.map((job, i) => (
                    <li
                        key={job.title}
                        data-reveal
                        style={{ transitionDelay: `${i * 90}ms` }}
                        class="group relative"
                    >
                        <span
                            class="absolute -left-[2.05rem] top-2 h-2 w-2 rounded-full bg-faint ring-4 ring-ink transition-colors duration-300 group-hover:bg-blaze sm:-left-[3.3rem]"
                            aria-hidden="true"
                        />
                        <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                            <h3 class="font-display text-2xl leading-tight sm:text-3xl">{job.title}</h3>
                            <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                                {job.period}
                            </span>
                        </div>
                        <p class="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-blaze/90">
                            {job.org} <span class="text-faint">· {job.location}</span>
                        </p>
                        <ul class="mt-4 space-y-2.5">
                            {job.bullets.map((b: Bullet, j: number) => (
                                <li key={j} class="flex gap-3 text-sm leading-relaxed text-muted">
                                    <span class="mt-2 h-px w-3 shrink-0 bg-faint" aria-hidden="true" />
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </section>
    )
}

/** Skills, arranged like a buy menu. */
function Loadout() {
    return (
        <section id="loadout" class="scroll-mt-24 py-24 sm:py-32" aria-labelledby="loadout-title">
            <SectionHead id="loadout" index="04" kicker="buy menu" title="Loadout" />
            <div class="grid gap-px border border-line bg-line sm:grid-cols-2">
                {loadout.map((group, i) => (
                    <div
                        key={group.label}
                        data-reveal
                        style={{ transitionDelay: `${i * 70}ms` }}
                        class="group bg-ink-2/70 p-7 transition-colors duration-300 hover:bg-ink-3"
                    >
                        <div class="flex items-center gap-3">
                            <span class="flex h-5 w-5 items-center justify-center border border-line font-mono text-[10px] text-faint transition-colors group-hover:border-blaze/60 group-hover:text-blaze">
                                {group.key}
                            </span>
                            <h3 class="font-mono text-[10px] uppercase tracking-[0.24em] text-blaze">
                                {group.label}
                            </h3>
                            <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-faint/70">
                                / {group.slot}
                            </span>
                        </div>
                        <ul class="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                            {group.items.map((item) => (
                                <li key={item} class="text-base text-bone/85">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

function Education() {
    return (
        <section id="education" class="scroll-mt-24 py-24 sm:py-32" aria-labelledby="education-title">
            <SectionHead id="education" index="05" kicker="training" title="Education" />
            <div data-reveal class="card brackets p-7 sm:p-10">
                <div class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                    <div class="min-w-0">
                        <h3 class="font-display text-3xl leading-tight sm:text-4xl">{education.school}</h3>
                        <p class="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-blaze/90">
                            {education.degree}{" "}
                            <span class="text-faint">
                                · {education.period} · {education.location}
                            </span>
                        </p>
                        <p class="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
                            Relevant coursework
                        </p>
                        <ul class="mt-3 flex flex-wrap gap-2">
                            {education.coursework.map((c) => (
                                <li key={c} class="border border-line px-2.5 py-1 text-xs text-muted">
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div class="shrink-0 border border-blaze/25 bg-blaze/5 px-6 py-5 text-center">
                        <span class="block font-display text-5xl leading-none text-bone">
                            {education.gpa}
                        </span>
                        <span class="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                            GPA
                        </span>
                    </div>
                </div>
                <span class="rarity-bar" aria-hidden="true" />
            </div>
        </section>
    )
}

/* --------------------------------------------------------------- contact */

function Contact() {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(profile.email)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch {
            /* clipboard unavailable — the mailto link still works */
        }
    }

    return (
        <footer id="contact" class="scroll-mt-24 border-t border-line">
            <div class="mx-auto w-full max-w-5xl px-6 py-24 sm:px-8 sm:py-32">
                <div data-reveal>
                    <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-blaze">
                        06 // next round
                    </p>
                    <h2
                        id="contact-title"
                        class="mt-6 font-display text-[clamp(2.4rem,9vw,6rem)] leading-[0.9] tracking-[-0.02em]"
                    >
                        Let's build
                        <br />
                        <span class="italic text-blaze">something good.</span>
                    </h2>

                    <div class="mt-10 flex flex-wrap items-center gap-3">
                        <Button href={`mailto:${profile.email}`} primary>
                            {profile.email}
                        </Button>
                        <button
                            type="button"
                            onClick={copy}
                            class="inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-all duration-300 hover:border-blaze/60 hover:text-bone"
                        >
                            {copied ? "Copied ✓" : "Copy address"}
                        </button>
                    </div>

                    <div class="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
                        <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                            © {new Date().getFullYear()} {profile.name} · press{" "}
                            <span class="text-blaze">~</span> for console
                        </p>
                        <div class="flex flex-wrap items-center gap-6">
                            <ExternalLink link={{ label: "GitHub", href: profile.github }} />
                            <ExternalLink link={{ label: "LinkedIn", href: profile.linkedin }} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

/* ----------------------------------------------------------------- hooks */

function useReveal() {
    useEffect(() => {
        const pending = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]"))
        if (typeof IntersectionObserver === "undefined" || reduceMotion()) {
            pending.forEach((el) => el.classList.add("in"))
            return
        }

        const show = (el: Element) => {
            el.classList.add("in")
            pending.delete(el as HTMLElement)
            io.unobserve(el)
        }

        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && show(e.target)),
            { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
        )
        pending.forEach((el) => io.observe(el))

        // IntersectionObserver samples too slowly for anchor jumps and flung
        // scrolls, so sweep anything that has already come into view.
        let queued = false
        const sweep = () => {
            queued = false
            if (!pending.size) return
            const h = window.innerHeight
            for (const el of [...pending]) {
                if (el.getBoundingClientRect().top < h) show(el)
            }
        }
        const onScroll = () => {
            if (queued) return
            queued = true
            requestAnimationFrame(sweep)
        }
        window.addEventListener("scroll", onScroll, { passive: true })

        return () => {
            io.disconnect()
            window.removeEventListener("scroll", onScroll)
        }
    }, [])
}

function useActiveSection() {
    const [active, setActive] = useState("")

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return
        const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
            (el): el is HTMLElement => el !== null,
        )
        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
                if (visible) setActive(visible.target.id)
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
        )
        targets.forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [])

    return active
}
