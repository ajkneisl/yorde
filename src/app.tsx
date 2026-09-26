import type { JSX } from "preact"

type Bullet = string | JSX.Element

export function App() {
    return (
        <div class="w-full px-6 sm:px-10 py-16 text-gray-800">
            {/* Header */}
            <header class="mb-12">
                <div class="flex items-start gap-5">
                    <img
                        src="/yord.webp"
                        alt="Yordanos Eshete"
                        class="w-20 h-20 rounded object-cover border border-gray-300 shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                        <h1 class="text-3xl font-semibold tracking-tight text-gray-900">
                            Yordanos Eshete
                        </h1>
                        <p class="text-sm text-gray-600 mt-1">
                            Computer Science Student · University of Minnesota
                        </p>
                        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm">
                            <ContactLink href="mailto:ygeshete@gmail.com">ygeshete@gmail.com</ContactLink>
                            <ContactLink href="https://github.com/YordanosEshete">github</ContactLink>
                            <ContactLink href="https://www.linkedin.com/in/yordanoseshete/">linkedin</ContactLink>
                            <ContactLink href="/resume.pdf">resume</ContactLink>
                        </div>
                    </div>
                </div>
            </header>

            {/* Education */}
            <Section id="education" label="Education">
                <Entry
                    title="University of Minnesota: Twin Cities"
                    location="Minneapolis, MN"
                    subtitle="Bachelor of Science in Computer Science · GPA 3.89"
                    period="Expected May 2028"
                />
                <p class="text-sm text-gray-700 mt-3 leading-relaxed">
                    <span class="text-gray-900 font-medium">Relevant Coursework: </span>
                    Data Structures &amp; Algorithms, Advanced Programming Principles, Linear Algebra, Probability &amp; Statistics, Software Design &amp; Development.
                </p>
            </Section>

            {/* Experience */}
            <Section id="experience" label="Experience">
                <div class="space-y-7">
                    <Entry
                        title="IT Technical Support Specialist"
                        logo="/logo-umn.png"
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
            <Section id="projects" label="Projects">
                <div class="space-y-7">
                    <Entry
                        title="Burrow"
                        logo="/logo-burrow.png"
                        period="August 2025 – Present"
                        tech={["TypeScript", "Kotlin", "React Native", "Ktor", "PostgreSQL", "Docker"]}
                        links={[
                            { label: "umn.app", href: "https://umn.app" },
                            { label: "github", href: "https://github.com/ajkneisl/burrow" },
                        ]}
                        bullets={[
                            "Collaborated in a team of 5 to design a social-media platform enabling University of Minnesota students to find nearby study groups, group project opportunities, and events.",
                            "Implemented push notifications and an interactive map showing meetings and events across the Twin Cities campus.",
                            <>Won <Strong>Most Promising Project</Strong> after presenting to Social Coding board members in just under 6 weeks of development.</>,
                        ]}
                    />
                    <Entry
                        title="socialcoding.net"
                        logo="/logo-socialcoding.svg"
                        tech={["React", "TypeScript", "Tailwind CSS", "Kotlin/Ktor", "PostgreSQL", "Docker"]}
                        links={[
                            { label: "socialcoding.net", href: "https://socialcoding.net"},
                            {label: "github", href: "https://github.com/ajkneisl/socialcoding"}
                        ]}
                        bullets={[
                            "Built and maintain the website for the University of Minnesota Social Coding club, the club's front door for prospective members and project teams.",
                        ]}
                    />
                    <Entry
                        title="Allersight"
                        logo="/logo-allersight.svg"
                        tech={["Typescript/React, React Native, PostgreSQL, OpenCV, Python, Flask"]}
                        links={[
                            { label: "Demo", href: "https://www.youtube.com/watch?v=qBpOIuomM3g" },
                        ]}
                        bullets={[
                            "Built a computer vision allergen detector for businesses and consumers, scanning products to surface allergens for the people who need to avoid them.",
                            <>Placed <Strong>top 10</Strong> in the hackathon it was built for.</>,
                        ]}
                    />
                </div>
            </Section>

            {/* Leadership */}
            <Section id="leadership" label="Leadership">
                <Entry
                    title="Social Coding Officer"
                    logo="/logo-socialcoding.svg"
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
            <Section id="skills" label="Technical Skills">
                <div class="space-y-2">
                    <SkillGroup label="Languages" items={["Java", "Python", "C/C++", "SQL (Postgres)", "JavaScript", "TypeScript", "HTML/CSS", "Kotlin"]} />
                    <SkillGroup label="Frameworks" items={["React", "Node.js", "Vue.js", "Angular"]} />
                    <SkillGroup label="Developer Tools" items={["Git", "Docker", "Google Cloud Platform", "VS Code", "PyCharm", "IntelliJ"]} />
                    <SkillGroup label="Libraries" items={["pandas", "NumPy", "Matplotlib"]} />
                </div>
            </Section>

            {/* Footer */}
            <footer class="text-xs text-gray-600 pt-8 mt-4 border-t border-gray-200">
                © {new Date().getFullYear()} Yordanos Eshete
            </footer>
        </div>
    )
}

function Section({ id, label, children }: {
    id: string
    label: string
    children: JSX.Element | JSX.Element[]
}) {
    return (
        <section id={id} class="mb-12">
            <h2 class="text-xs uppercase tracking-[0.2em] text-gray-600 font-semibold mb-5 pb-2 border-b border-gray-300">
                {label}
            </h2>
            {children}
        </section>
    )
}

function ContactLink({ href, children }: { href: string; children: string }) {
    const isExternal = href.startsWith("http") || href.endsWith(".pdf")
    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            class="text-gray-700 underline underline-offset-2 hover:text-gray-900"
        >
            {children}
        </a>
    )
}

function Strong({ children }: { children: JSX.Element | string }) {
    return <strong class="text-gray-900 font-medium">{children}</strong>
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
    return (
        <div class="text-sm leading-relaxed">
            <span class="text-gray-900 font-medium">{label}: </span>
            <span class="text-gray-700">{items.join(", ")}</span>
        </div>
    )
}

function Entry({ title, location, subtitle, period, tech, logo, bullets, links }: {
    title: string
    location?: string
    subtitle?: string
    period?: string
    tech?: string[]
    logo?: string
    bullets?: Bullet[]
    links?: { label: string; href: string }[]
}) {
    return (
        <div class="flex items-start gap-4">
            {logo && (
                <img
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    class="w-11 h-11 object-contain shrink-0 mt-0.5 rounded border border-gray-200 p-1"
                />
            )}
            <div class="flex-1 min-w-0">
                <div class="flex justify-between items-baseline gap-4 flex-wrap">
                    <div class="flex items-baseline gap-3 flex-wrap">
                        <h3 class="font-semibold text-gray-900">{title}</h3>
                        {links && links.length > 0 && (
                            <div class="flex items-center gap-2 text-xs">
                                {links.map((link, i) => (
                                    <span key={link.href} class="flex items-center gap-2">
                                        {i > 0 && <span class="text-gray-400">·</span>}
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="text-gray-600 underline underline-offset-2 hover:text-gray-900"
                                        >
                                            {link.label}
                                        </a>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    {period && <span class="text-sm text-gray-600 whitespace-nowrap">{period}</span>}
                </div>
                {(subtitle || location) && (
                    <div class="flex justify-between items-baseline gap-4 flex-wrap mt-0.5">
                        {subtitle && <p class="text-sm text-gray-700 italic">{subtitle}</p>}
                        {location && <span class="text-sm text-gray-600 italic whitespace-nowrap">{location}</span>}
                    </div>
                )}
                {tech && tech.length > 0 && (
                    <p class="text-sm text-gray-700 mt-0.5">{tech.join(", ")}</p>
                )}
                {bullets && bullets.length > 0 && (
                    <ul class="mt-2 space-y-1.5 list-disc list-outside ml-5 marker:text-gray-400">
                        {bullets.map((b, i) => (
                            <li key={i} class="text-sm text-gray-700 leading-relaxed pl-1">{b}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
