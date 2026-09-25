import { useEffect, useRef, useState } from "preact/hooks"
import { loadout, profile, projects } from "./data"

type Line = { text: string; tone?: "cmd" | "warn" | "good" | "dim" }

const BANNER: Line[] = [
    { text: "Developer console  //  build 2027.eshete", tone: "dim" },
    { text: "Type 'help' for a list of commands.", tone: "dim" },
]

const HELP = [
    ["help", "you are here"],
    ["whoami", "the short version"],
    ["status", "server info"],
    ["projects", "what I've shipped"],
    ["loadout", "what I build with"],
    ["contact", "how to reach me"],
    ["rush_b", "do not overthink it"],
    ["sv_cheats 1", "hmm"],
    ["clear", "wipe the log"],
    ["exit", "close console (or press ~)"],
]

/** Quake-style dropdown console, toggled with ~ — the site's easter egg. */
export function Console({
    open,
    onClose,
    onShake,
}: {
    open: boolean
    onClose: () => void
    onShake: () => void
}) {
    const [log, setLog] = useState<Line[]>(BANNER)
    const [value, setValue] = useState("")
    const [cheats, setCheats] = useState(false)
    const [history, setHistory] = useState<string[]>([])
    const [cursor, setCursor] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const logRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (open) inputRef.current?.focus()
    }, [open])

    useEffect(() => {
        const el = logRef.current
        if (el) el.scrollTop = el.scrollHeight
    }, [log, open])

    const print = (lines: Line[]) => setLog((l) => [...l, ...lines])

    const run = (raw: string) => {
        const input = raw.trim()
        if (!input) return
        setHistory((h) => [input, ...h])
        setCursor(-1)
        print([{ text: `] ${input}`, tone: "cmd" }])

        const [cmd, ...rest] = input.toLowerCase().split(/\s+/)
        const arg = rest.join(" ")

        switch (cmd) {
            case "help":
                print(HELP.map(([c, d]) => ({ text: `  ${c.padEnd(14)} ${d}`, tone: "dim" as const })))
                break

            case "whoami":
                print([
                    { text: `${profile.name} — "${profile.alias}"` },
                    { text: "B.S. Computer Science, University of Minnesota (May 2027)." },
                    { text: "Builds campus platforms, hackathon apps, and things people rely on." },
                    { text: "Currently: IT support @ UMN, officer @ Social Coding.", tone: "dim" },
                ])
                break

            case "status":
                print([
                    { text: "hostname : yordanoseshete" },
                    { text: "version  : 2027.0 / portfolio" },
                    { text: `udp/ip   : ${profile.location}` },
                    { text: "os       : caffeine" },
                    { text: "players  : 1 human, 0 bots (recruiters welcome)", tone: "good" },
                ])
                break

            case "projects":
                print(
                    projects.flatMap((p) => [
                        { text: `${p.num}  ${p.title}  [${p.rarity.toUpperCase()}]`, tone: "good" as const },
                        { text: `    ${p.blurb}`, tone: "dim" as const },
                        ...p.links.map((l) => ({ text: `    → ${l.href}`, tone: "dim" as const })),
                    ]),
                )
                break

            case "loadout":
                print(
                    loadout.map((g) => ({
                        text: `  [${g.key}] ${g.slot.toUpperCase().padEnd(10)} ${g.items.join(", ")}`,
                        tone: "dim" as const,
                    })),
                )
                break

            case "contact":
                print([
                    { text: `email    : ${profile.email}`, tone: "good" },
                    { text: `github   : ${profile.github}` },
                    { text: `linkedin : ${profile.linkedin}` },
                ])
                break

            case "rush_b":
            case "rush":
                onShake()
                print([
                    { text: "RUSH B. DO NOT STOP.", tone: "warn" },
                    { text: "  ...five of us, one plan, eleven seconds of discipline.", tone: "dim" },
                ])
                break

            case "sv_cheats":
                if (arg === "1") {
                    setCheats(true)
                    print([{ text: "sv_cheats set to 1. try 'noclip'.", tone: "warn" }])
                } else {
                    setCheats(false)
                    print([{ text: "sv_cheats set to 0." }])
                }
                break

            case "noclip":
                print(
                    cheats
                        ? [{ text: "noclip ON — sadly the walls here are load-bearing.", tone: "good" }]
                        : [{ text: "Can't use cheat command noclip in multiplayer.", tone: "warn" }],
                )
                break

            case "mp_drop_knife":
            case "drop":
                print([{ text: "You dropped: a well-scoped pull request.", tone: "dim" }])
                break

            case "clear":
                setLog(BANNER)
                break

            case "exit":
            case "quit":
            case "disconnect":
                onClose()
                break

            default:
                print([{ text: `Unknown command: "${cmd}". Try 'help'.`, tone: "warn" }])
        }
    }

    const onKey = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            run(value)
            setValue("")
        } else if (e.key === "Escape" || e.key === "`" || e.key === "~") {
            e.preventDefault()
            onClose()
        } else if (e.key === "ArrowUp" && history.length) {
            e.preventDefault()
            const next = Math.min(cursor + 1, history.length - 1)
            setCursor(next)
            setValue(history[next])
        } else if (e.key === "ArrowDown") {
            e.preventDefault()
            const next = cursor - 1
            setCursor(next)
            setValue(next < 0 ? "" : history[next])
        }
    }

    if (!open) return null

    const tone = (t?: Line["tone"]) =>
        t === "cmd"
            ? "text-blaze"
            : t === "warn"
              ? "text-covert"
              : t === "good"
                ? "text-scope"
                : t === "dim"
                  ? "text-muted"
                  : "text-bone/85"

    return (
        <div class="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-6 sm:pt-6">
            <div class="console-shell mx-auto max-w-4xl">
                <div class="flex items-center justify-between border-b border-blaze/25 px-4 py-2">
                    <span class="font-mono text-[10px] uppercase tracking-[0.24em] text-blaze">
                        console
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        class="font-mono text-[10px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-bone"
                    >
                        esc / ~
                    </button>
                </div>

                <div
                    ref={logRef}
                    class="console-log h-56 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed sm:h-72"
                >
                    {log.map((l, i) => (
                        <p key={i} class={`whitespace-pre-wrap break-words ${tone(l.tone)}`}>
                            {l.text}
                        </p>
                    ))}
                </div>

                <div class="flex items-center gap-2 border-t border-blaze/25 px-4 py-2.5">
                    <span class="font-mono text-[12px] text-blaze">]</span>
                    <input
                        ref={inputRef}
                        value={value}
                        spellcheck={false}
                        autocomplete="off"
                        aria-label="Console command"
                        onInput={(e) => setValue((e.target as HTMLInputElement).value)}
                        onKeyDown={onKey}
                        class="w-full bg-transparent font-mono text-[12px] text-bone outline-none placeholder:text-faint"
                        placeholder="help"
                    />
                </div>
            </div>
        </div>
    )
}
