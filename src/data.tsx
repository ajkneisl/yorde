import type { JSX } from "preact"

export type Bullet = string | JSX.Element
export type Link = { label: string; href: string }
export type Rarity = "covert" | "classified" | "restricted" | "milspec"

function Hl({ children }: { children: JSX.Element | string }) {
    return <strong class="font-semibold text-bone">{children}</strong>
}

export const profile = {
    name: "Yordanos Eshete",
    first: "Yordanos",
    last: "Eshete",
    alias: "yorde",
    status: "Graduating May 2027 · open to opportunities",
    location: "Minneapolis, MN",
    email: "ygeshete@gmail.com",
    github: "https://github.com/YordanosEshete",
    linkedin: "https://www.linkedin.com/in/yordanoseshete/",
    tagline: (
        <>
            CS at the University of Minnesota. I build things with teams, on deadlines,
            in front of <em class="font-display italic text-bone">actual people</em>.
        </>
    ),
    bio: [
        <>
            I like problems that keep score. Most weeks that means shipping something with a
            team — a campus app that has to survive finals week, a hackathon build with 36
            hours on the clock, a church website that has to work on Sunday morning.
        </>,
        <>
            The rest of the time I'm queuing <Hl>Counter-Strike</Hl>. Same appeal, honestly:
            five people, a plan that lasts about eleven seconds, and whoever adapts fastest
            wins the round. Good practice for a standup.
        </>,
    ],
}

/* CS2 killfeed — the toolkit, fragged one at a time. */
export const killfeed: { weapon: "rifle" | "awp" | "knife" | "nade" | "pistol"; victim: string; hs: boolean }[] = [
    { weapon: "rifle", victim: "TypeScript", hs: true },
    { weapon: "awp", victim: "Kotlin", hs: false },
    { weapon: "rifle", victim: "React", hs: true },
    { weapon: "knife", victim: "PostgreSQL", hs: false },
    { weapon: "rifle", victim: "Python", hs: false },
    { weapon: "nade", victim: "Docker", hs: false },
    { weapon: "awp", victim: "React Native", hs: true },
    { weapon: "pistol", victim: "Java", hs: false },
    { weapon: "rifle", victim: "C/C++", hs: false },
    { weapon: "knife", victim: "Node.js", hs: true },
    { weapon: "rifle", victim: "AWS", hs: false },
    { weapon: "pistol", victim: "Vue.js", hs: false },
]

export const stats = [
    { value: "3.89", label: "GPA", note: "cumulative" },
    { value: "5", label: "Teammates", note: "on Burrow" },
    { value: "2", label: "Awards", note: "in 12 months" },
    { value: "20", label: "Teams led", note: "Social Coding" },
]

/* Styled as a CS2 end-of-match scoreboard. */
export const scoreboard = [
    {
        mvp: true,
        event: "Social Coding Showcase",
        map: "Burrow",
        year: "2025",
        result: "#1 MOST PROMISING",
        tone: "gold" as const,
    },
    {
        mvp: true,
        event: "MinneHack '26",
        map: "Echoes",
        year: "2026",
        result: "TOP 5 / FIELD",
        tone: "gold" as const,
    },
    {
        mvp: false,
        event: "Social Coding",
        map: "Officer",
        year: "2025 — now",
        result: "20 TEAMS SHIPPED",
        tone: "plain" as const,
    },
    {
        mvp: false,
        event: "Freelance",
        map: "3 churches + Gopher Way",
        year: "2025 — now",
        result: "DEPLOYED",
        tone: "plain" as const,
    },
]

export const projects: {
    num: string
    title: string
    rarity: Rarity
    period: string
    blurb: string
    tech: string[]
    links: Link[]
    bullets: Bullet[]
    award?: string
}[] = [
    {
        num: "01",
        title: "Burrow",
        rarity: "covert",
        period: "Aug 2025 — Present",
        award: "Most Promising Project",
        blurb: "A social platform that helps UMN students find study groups, project partners, and events happening around them.",
        tech: ["TypeScript", "Kotlin", "React", "PostgreSQL", "Docker"],
        links: [
            { label: "umn.app", href: "https://umn.app" },
            { label: "GitHub", href: "https://github.com/ajkneisl/burrow" },
        ],
        bullets: [
            "Collaborated in a team of 5 to design a social-media platform enabling University of Minnesota students to find nearby study groups, group project opportunities, and events.",
            "Implemented push notifications and an interactive map showing meetings and events across the Twin Cities campus.",
            <>Won <Hl>Most Promising Project</Hl> after presenting to Social Coding board members in just under 6 weeks of development.</>,
        ],
    },
    {
        num: "02",
        title: "Echoes",
        rarity: "classified",
        period: "Nov 2025 — Feb 2026",
        award: "Top 5 · MinneHack '26",
        blurb: "A cross-platform mobile app built end-to-end by four people for MinneHack '26 — visual identity, screen flow, and a custom Kotlin backend.",
        tech: ["React Native", "TypeScript", "Python", "AWS", "Docker"],
        links: [{ label: "GitHub", href: "https://github.com/ajkneisl/echoes" }],
        bullets: [
            "Built the client-side mobile infrastructure using React Native and TypeScript, translating requirements into a fully functional cross-platform application.",
            <>Won <Hl>top five</Hl> in the MinneHack '26 Hackathon competition.</>,
            "Collaborated in a team of four to engineer the visual identity and screen flow, programming reusable UI components for a highly responsive user experience.",
            "Integrated the frontend with a custom Kotlin backend, managing complex application state with asynchronous data fetching for optimal runtime performance.",
        ],
    },
    {
        num: "03",
        title: "Tunnel Pathfinder",
        rarity: "restricted",
        period: "Freelance",
        blurb: "Routing for the 6-mile Gopher Way tunnel system — Dijkstra's algorithm applied to the problem of not freezing on the way to class.",
        tech: ["Python", "TypeScript", "Graph algorithms"],
        links: [],
        bullets: [
            <>Architected and developed a web application utilizing Dijkstra's algorithm to provide optimized navigation routes through the University of Minnesota's <Hl>6-mile Gopher Way</Hl> tunnel system.</>,
        ],
    },
]

export const experience: {
    title: string
    org: string
    location: string
    period: string
    bullets: Bullet[]
}[] = [
    {
        title: "IT Technical Support Specialist",
        org: "University of Minnesota",
        location: "Minneapolis, MN",
        period: "Jan 2026 — Present",
        bullets: [
            "Delivered rapid-response technical support to students and faculty, independently diagnosing software, network, and hardware access issues.",
            "Bridged the gap between complex technical university systems and non-technical clients, translating troubleshooting steps into actionable, clear guidance.",
            "Managed a high-volume ticketing queue, documenting system behaviors and edge cases to streamline issue tracking and escalating critical network malfunctions to tier-2 administrators.",
        ],
    },
    {
        title: "Officer",
        org: "Social Coding · University of Minnesota",
        location: "Minneapolis, MN",
        period: "Sep 2025 — Present",
        bullets: [
            "Mentored inexperienced developers from idea to launch of various web applications.",
            "Guided teams to communicate and build valuable, industry-relevant collaboration and workflow skills.",
            <>Implemented and enforced project timelines across <Hl>20 teams</Hl>, mentoring underclassmen on project planning and accountability.</>,
            <>Presented personal team-project <em class="font-display italic text-bone">Burrow</em>, deemed the #1 most promising project in the club.</>,
        ],
    },
    {
        title: "Freelance Developer",
        org: "Self-employed",
        location: "Burnsville, MN",
        period: "Jan 2025 — Present",
        bullets: [
            "Architected and developed Tunnel Pathfinder, a web application utilizing Dijkstra's algorithm to provide optimized navigation routes through the University of Minnesota's 6-mile Gopher Way tunnel system.",
            "Built and deployed websites for 3 local churches, adding dynamic scheduling features to manage liturgy times, charity events, and volunteer opportunities.",
        ],
    },
]

/* Styled as a buy menu: slot key, category, contents. */
export const loadout = [
    {
        key: "1",
        slot: "Primary",
        label: "Languages",
        items: ["TypeScript", "Kotlin", "Java", "Python", "C/C++", "SQL (Postgres)", "JavaScript", "HTML/CSS"],
    },
    {
        key: "2",
        slot: "Secondary",
        label: "Frameworks",
        items: ["React", "React Native", "Node.js", "Vue.js", "Angular"],
    },
    {
        key: "3",
        slot: "Utility",
        label: "Tools",
        items: ["Git", "Docker", "Google Cloud Platform", "AWS", "IntelliJ", "VS Code", "PyCharm"],
    },
    {
        key: "4",
        slot: "Gear",
        label: "Libraries",
        items: ["pandas", "NumPy", "Matplotlib"],
    },
]

export const education = {
    school: "University of Minnesota — Twin Cities",
    degree: "B.S. Computer Science",
    period: "Expected May 2027",
    gpa: "3.89",
    location: "Minneapolis, MN",
    coursework: [
        "Data Structures & Algorithms",
        "Advanced Programming Principles",
        "Linear Algebra",
        "Probability & Statistics",
        "Software Design & Development",
    ],
}
