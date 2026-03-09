export function App() {
    return (
        <div class="max-w-2xl mx-auto px-6 py-16 text-gray-300">
            {/* Header */}
            <header class="mb-14 animate-fade-in">
                <div class="flex items-center gap-5">
                    <img
                        src="/yord.webp"
                        alt="Yord"
                        class="w-20 h-20 rounded-lg object-cover border border-gray-800"
                    />
                    <div>
                        <h1 class="text-2xl font-semibold tracking-tight text-white font-mono cursor-blink">
                            Yordanos Eshete
                        </h1>
                        <p class="text-gray-500 mt-1 font-mono text-sm">
                            <span class="text-sky-400">~/</span>developer<span class="text-gray-600">@</span>minnesota
                        </p>
                        <div class="flex items-center gap-3 mt-1.5 text-xs font-mono">
                            <a href="mailto:ygeshete@gmail.com" class="text-gray-600 hover:text-sky-400 transition-colors">
                                ygeshete@gmail.com
                            </a>
                            <span class="text-gray-800">|</span>
                            <a href="https://github.com/YordanosEshete" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-sky-400 transition-colors">
                                github
                            </a>
                            <span class="text-gray-800">|</span>
                            <a href="https://www.linkedin.com/in/yordanoseshete/" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-sky-400 transition-colors">
                                linkedin
                            </a>
                        </div>
                    </div>
                </div>
                <div class="mt-5 flex gap-3 text-xs font-mono">
                    <a href="#experience" class="text-gray-500 hover:text-sky-400 transition-colors">
                        <span class="text-gray-600">[</span>experience<span class="text-gray-600">]</span>
                    </a>
                    <a href="#projects" class="text-gray-500 hover:text-sky-400 transition-colors">
                        <span class="text-gray-600">[</span>projects<span class="text-gray-600">]</span>
                    </a>
                    <a href="#skills" class="text-gray-500 hover:text-sky-400 transition-colors">
                        <span class="text-gray-600">[</span>skills<span class="text-gray-600">]</span>
                    </a>
                </div>
            </header>

            {/* Experience */}
            <section id="experience" class="mb-14 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <SectionHeader label="experience" />

                <div class="space-y-8">
                    <Job
                        role="IT Help Desk"
                        company="University of Minnesota"
                        period="Mar 2026 - Present"
                        bullets={[
                            "Provide frontline technical support to students, faculty, and staff across campus",
                            "Troubleshoot hardware, software, and network issues via phone, email, and walk-in",
                            "Document and escalate complex issues through the ticketing system",
                        ]}
                    />
                    <Job
                        role="Freelance Developer"
                        company=""
                        period="Sep 2025 - Present"
                        bullets={[
                            "Built a website for a local church to manage fasting schedules and participation",
                            "Built an inventory management app for a food bank to streamline stock tracking",
                        ]}
                    />
                    <Job
                        role="Assistant Manager"
                        company="Dollar Tree"
                        period="Sep 2024 - Aug 2025"
                        bullets={[
                            "Led teams of 10-30 associates, handling scheduling, training, and daily task delegation",
                            "Managed POS terminals and inventory-tracking software, troubleshooting issues on the fly",
                            "Monitored inventory data to identify variances and reduce shrink",
                            "Served as primary escalation point for operational and customer issues",
                        ]}
                    />
                </div>
            </section>

            {/* Projects */}
            <section id="projects" class="mb-14 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <SectionHeader label="projects" />

                <div class="space-y-6">
                    <Project
                        title="Burrow"
                        description="Full-stack app on the App Store and at umn.app. React Native frontend with a Kotlin/Ktor backend deployed via Docker."
                        tech={["React Native", "Kotlin", "Ktor", "Docker"]}
                        github="https://github.com/ajkneisl/burrow"
                        website="https://umn.app"
                    />
                    <Project
                        title="Echoes"
                        description="Hackathon project that placed top 5 at a Minnesota hackathon. Mobile app built with Kotlin and React Native."
                        tech={["Kotlin", "React Native"]}
                        github="https://github.com/ajkneisl/echoes"
                    />
                </div>
            </section>

            {/* Skills */}
            <section id="skills" class="mb-14 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <SectionHeader label="skills" />

                <div class="space-y-4">
                    <SkillGroup label="languages" items={["TypeScript", "JavaScript", "Kotlin", "SQL"]} />
                    <SkillGroup label="frontend" items={["React", "React Native", "Preact", "Tailwind CSS"]} />
                    <SkillGroup label="backend" items={["Node.js", "Ktor"]} />
                    <SkillGroup label="databases" items={["PostgreSQL", "MongoDB", "Redis"]} />
                    <SkillGroup label="tools" items={["Docker", "Git", "Linux"]} />
                </div>
            </section>

            {/* Footer */}
            <footer class="text-xs text-gray-600 pt-8 border-t border-gray-800/50 font-mono">
                <span class="text-gray-700">{"// "}</span>yord eshete — {new Date().getFullYear()}
            </footer>
        </div>
    )
}

function SectionHeader({ label }: { label: string }) {
    return (
        <h2 class="text-xs font-mono text-gray-600 mb-6 flex items-center gap-3">
            <span class="text-sky-400/70">{">"}</span>
            <span class="text-gray-500">{label}</span>
            <span class="flex-1 border-b border-dashed border-gray-800" />
        </h2>
    )
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
    return (
        <div class="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm font-mono">
            <span class="text-gray-600 text-xs mr-1">{label}:</span>
            {items.map((s, i) => (
                <span key={s}>
                    <span class="text-sky-300/80">{s}</span>
                    {i < items.length - 1 && <span class="text-gray-700">{","}</span>}
                </span>
            ))}
        </div>
    )
}

function Job({ role, company, period, bullets }: {
    role: string
    company: string
    period: string
    bullets: string[]
}) {
    return (
        <div class="group">
            <div class="flex justify-between items-baseline gap-4">
                <h3 class="font-medium text-white">
                    {role}
                    {company && <span class="text-gray-500 font-normal"> @ {company}</span>}
                </h3>
                <span class="text-xs text-gray-600 whitespace-nowrap font-mono">{period}</span>
            </div>
            <ul class="mt-2 space-y-1">
                {bullets.map((b, i) => (
                    <li key={i} class="text-sm text-gray-400 pl-5 relative before:content-['$'] before:absolute before:left-0 before:text-gray-700 before:font-mono before:text-xs">
                        {b}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function Project({ title, description, tech, github, website }: {
    title: string
    description: string
    tech: string[]
    github?: string
    website?: string
}) {
    return (
        <div class="border border-gray-800/50 rounded-lg p-4 hover:border-gray-700 transition-colors bg-gray-900/30">
            <div class="flex items-center gap-2">
                <span class="text-sky-400/70 font-mono text-sm">{">"}</span>
                <h3 class="font-medium text-white">{title}</h3>
                {(github || website) && (
                    <div class="flex items-center gap-2 ml-auto text-xs font-mono">
                        {github && (
                            <a href={github} target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-sky-400 transition-colors">
                                github
                            </a>
                        )}
                        {github && website && <span class="text-gray-800">|</span>}
                        {website && (
                            <a href={website} target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-sky-400 transition-colors">
                                website
                            </a>
                        )}
                    </div>
                )}
            </div>
            <p class="text-sm text-gray-400 mt-2">{description}</p>
            <div class="flex flex-wrap gap-2 mt-3">
                {tech.map(t => (
                    <span key={t} class="text-xs font-mono px-2 py-0.5 rounded bg-sky-400/5 text-sky-400/60 border border-sky-400/10">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    )
}
