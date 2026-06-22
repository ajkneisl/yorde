import type { JSX } from "preact"

type Bullet = string | JSX.Element

export function App() {
    return (
        <div class="max-w-3xl mx-auto px-6 py-16 text-gray-300">
            {/* Header */}
            <header class="mb-12 animate-fade-in">
                <div class="flex items-start gap-5">
                    <img
                        src="/yord.webp"
                        alt="Yordanos Eshete"
                        class="w-20 h-20 rounded-lg object-cover border border-gray-800 shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                        <h1 class="text-3xl font-semibold tracking-tight text-white">
                            Yordanos Eshete
                        </h1>
                        <p class="text-sm text-gray-500 mt-1">
                            Computer Science Student · University of Minnesota · US Citizen
                        </p>
                        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm">
                            <ContactLink href="mailto:ygeshete@gmail.com">ygeshete@gmail.com</ContactLink>
                            <ContactLink href="https://github.com/YordanosEshete">github</ContactLink>
                            <ContactLink href="https://www.linkedin.com/in/yordanoseshete/">linkedin</ContactLink>
                        </div>
                    </div>
                </div>
            </header>

            {/* Education */}
            <Section id="education" label="Education" delay="0.1s">
                <Entry
                    title="University of Minnesota: Twin Cities"
                    location="Minneapolis, MN"
                    subtitle="Bachelor of Science in Computer Science · GPA 3.89"
                    period="Expected May 2027"
                />
                <p class="text-sm text-gray-400 mt-3 leading-relaxed">
                    <span class="text-gray-200 font-medium">Relevant Coursework: </span>
                    Data Structures &amp; Algorithms, Advanced Programming Principles, Linear Algebra, Probability &amp; Statistics, Software Design &amp; Development.
                </p>
            </Section>

            {/* Experience */}
            <Section id="experience" label="Experience" delay="0.2s">
                <div class="space-y-7">
                    <Entry
                        title="Freelance Developer"
                        location="Burnsville, MN"
                        subtitle="Full-stack Developer · Python, TypeScript"
                        period="January 2025 – Present"
                        bullets={[
                            <>Architected and developed <Strong>Tunnel Pathfinder</Strong>, a web application utilizing Dijkstra's algorithm to provide optimized navigation routes through the University of Minnesota's 6-mile Gopher Way tunnel system.</>,
                            <>Built and deployed websites for 3 local churches, adding dynamic scheduling features to manage liturgy times, charity events, and volunteer opportunities.</>,
                        ]}
                    />
                    <Entry
                        title="IT Technical Support Specialist"
                        location="Minneapolis, MN"
                        subtitle="University of Minnesota"
                        period="January 2026 – Present"
                        bullets={[
                            "Delivered rapid-response technical support to students and faculty, independently diagnosing software, network, and hardware access issues.",
                            "Bridged the gap between complex technical university systems and non-technical clients, translating troubleshooting steps into actionable, clear guidance.",
                            "Managed a high-volume ticketing queue, documenting system behaviors and edge cases to streamline issue tracking and escalating critical network malfunctions to tier-2 administrators.",
                        ]}
                    />
                </div>
            </Section>

            {/* Projects */}
            <Section id="projects" label="Projects" delay="0.3s">
                <div class="space-y-7">
                    <Entry
                        title="Burrow"
                        subtitle="TypeScript, Kotlin, React, PostgreSQL, Docker"
                        period="August 2025 – Present"
                        links={[
                            { label: "github", href: "https://github.com/ajkneisl/burrow" },
                            { label: "umn.app", href: "https://umn.app" },
                        ]}
                        bullets={[
                            "Collaborated in a team of 5 to design a social-media platform enabling University of Minnesota students to find nearby study groups, group project opportunities, and events.",
                            "Implemented push notifications and an interactive map showing meetings and events across the Twin Cities campus.",
                            <>Won <Strong>Most Promising Project</Strong> after presenting to Social Coding board members in just under 6 weeks of development.</>,
                        ]}
                    />
                    <Entry
                        title="Echoes — MinneHack '26"
                        subtitle="React Native, TypeScript, Python, AWS, Docker"
                        period="November 2025 – February 2026"
                        links={[
                            { label: "github", href: "https://github.com/ajkneisl/echoes" },
                        ]}
                        bullets={[
                            "Built the client-side mobile infrastructure using React Native and TypeScript, translating requirements into a fully functional cross-platform application.",
                            <>Won <Strong>top five</Strong> in the MinneHack '26 Hackathon competition.</>,
                            "Collaborated in a team of four to engineer the visual identity and screen flow, programming reusable UI components for a highly responsive user experience.",
                            "Integrated the frontend with a custom Kotlin backend, managing complex application state with asynchronous data fetching for optimal runtime performance.",
                        ]}
                    />
                </div>
            </Section>

            {/* Leadership */}
            <Section id="leadership" label="Leadership" delay="0.4s">
                <Entry
                    title="Social Coding Officer"
                    location="Minneapolis, MN"
                    subtitle="University of Minnesota"
                    period="September 2025 – Present"
                    bullets={[
                        "Mentored inexperienced developers from idea to launch of various web applications.",
                        "Guided teams to communicate and build valuable, industry-relevant collaboration and workflow skills.",
                        "Implemented and enforced timelines for project completion deadlines among 20 teams, mentoring underclassmen on project planning and accountability.",
                        <>Presented personal team-project <em class="italic">Burrow</em>, deemed the #1 most promising project in the club.</>,
                    ]}
                />
            </Section>

            {/* Technical Skills */}
            <Section id="skills" label="Technical Skills" delay="0.5s">
                <div class="space-y-2">
                    <SkillGroup label="Languages" items={["Java", "Python", "C/C++", "SQL (Postgres)", "JavaScript", "TypeScript", "HTML/CSS", "Kotlin"]} />
                    <SkillGroup label="Frameworks" items={["React", "Node.js", "Vue.js", "Angular"]} />
                    <SkillGroup label="Developer Tools" items={["Git", "Docker", "Google Cloud Platform", "VS Code", "PyCharm", "IntelliJ"]} />
                    <SkillGroup label="Libraries" items={["pandas", "NumPy", "Matplotlib"]} />
                </div>
            </Section>

            {/* Footer */}
            <footer class="text-xs text-gray-600 pt-8 mt-4 border-t border-gray-800/50">
                © {new Date().getFullYear()} Yordanos Eshete
            </footer>
        </div>
    )
}

function Section({ id, label, delay, children }: {
    id: string
    label: string
    delay: string
    children: JSX.Element | JSX.Element[]
}) {
    return (
        <section id={id} class="mb-12 animate-fade-in" style={{ animationDelay: delay }}>
            <h2 class="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-5 pb-2 border-b border-gray-800">
                {label}
            </h2>
            {children}
        </section>
    )
}

function ContactLink({ href, children }: { href: string; children: string }) {
    const isExternal = href.startsWith("http")
    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            class="text-gray-400 hover:text-sky-400 transition-colors"
        >
            {children}
        </a>
    )
}

function Strong({ children }: { children: JSX.Element | string }) {
    return <strong class="text-white font-medium">{children}</strong>
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
    return (
        <div class="text-sm leading-relaxed">
            <span class="text-white font-medium">{label}: </span>
            <span class="text-gray-400">{items.join(", ")}</span>
        </div>
    )
}

function Entry({ title, location, subtitle, period, bullets, links }: {
    title: string
    location?: string
    subtitle?: string
    period: string
    bullets?: Bullet[]
    links?: { label: string; href: string }[]
}) {
    return (
        <div>
            <div class="flex justify-between items-baseline gap-4 flex-wrap">
                <div class="flex items-baseline gap-3 flex-wrap">
                    <h3 class="font-semibold text-white">{title}</h3>
                    {links && links.length > 0 && (
                        <div class="flex items-center gap-2 text-xs">
                            {links.map((link, i) => (
                                <span key={link.href} class="flex items-center gap-2">
                                    {i > 0 && <span class="text-gray-700">·</span>}
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-gray-500 hover:text-sky-400 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <span class="text-sm text-gray-500 whitespace-nowrap">{period}</span>
            </div>
            {(subtitle || location) && (
                <div class="flex justify-between items-baseline gap-4 flex-wrap mt-0.5">
                    {subtitle && <p class="text-sm text-gray-400 italic">{subtitle}</p>}
                    {location && <span class="text-sm text-gray-500 italic whitespace-nowrap">{location}</span>}
                </div>
            )}
            {bullets && bullets.length > 0 && (
                <ul class="mt-2 space-y-1.5 list-disc list-outside ml-5 marker:text-gray-700">
                    {bullets.map((b, i) => (
                        <li key={i} class="text-sm text-gray-400 leading-relaxed pl-1">{b}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}
