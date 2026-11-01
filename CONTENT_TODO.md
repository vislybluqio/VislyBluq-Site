# Content TODO

Every placeholder on the site is listed here. In code, each one has a `// TODO(content):` comment. In dev builds (`npm run dev`), each one also shows a visible amber "TODO: real content" marker (the `ContentTodo` component in `src/components/site/Enterprise.tsx`). Production builds hide those markers.

## Content needed

| File | Line | What's needed |
| --- | --- | --- |
| `src/data/testimonials.ts` | 8 | Real testimonials that clients have approved (quote, name, role, company). The home page section stays hidden until at least one exists. |
| `src/data/metrics.ts` | 6 | Confirm each home page metric is accurate: `5+` builds & prototypes, `10+` strategy sessions, `24h` typical first response, `3` core delivery tracks. |
| `src/pages/Home.tsx` | 110 | Dev marker above the metrics strip. Remove it once the metrics are confirmed. |
| `src/data/industries.ts` | 16 | Short description for **Fintech and Cooperatives** (shown on `/industries/fintech-cooperatives`). Also confirm the linked services. |
| `src/data/industries.ts` | 24 | Short description for **SMBs and Retail** (shown on `/industries/smbs-retail`). Also confirm the linked services. |
| `src/config/focus.ts` | 32 | Focus page (`/focus/ai-for-fintech`) intro paragraph. |
| `src/config/focus.ts` | 35 | Focus page stats: 3–4 real value + label pairs. The stat row is hidden in production until at least one is filled in. |
| `src/config/focus.ts` | 41 | Focus page full-bleed band image and alt text. The band is hidden in production until set. |
| `src/config/focus.ts` | 44 | Focus page "The problem" paragraph. |
| `src/config/focus.ts` | 46 | Focus page "How we approach it" paragraph. The two-column section is hidden in production while both paragraphs are empty. |
| `src/pages/About.tsx` | 5 | Real company milestones (year, description, label). The fabricated timeline ("Fortune 500 fintech", "quantum-ready architecture", "A Decade of Disruption") was removed; the section is hidden until this is filled. |
| `src/pages/About.tsx` | 8 | Real, verifiable company metrics. The unsupported strip ("120+ Enterprise systems", "Top 1%", "0.1ms") and the "0.1ms Avg Latency / 99.99% Uptime Promise" cards were removed. |
| `src/config/siteVideo.ts` | 2 | YouTube ID for the company video in the home page "Watch our story" section. Until it is set, the live site shows the section with a "Video coming soon" frame (no play button). |

## Technical follow-ups

| File | Line | What's needed |
| --- | --- | --- |
| `api/chat.ts` | 4 | Check `llama-3.3-70b-versatile` against Groq's current model list (console.groq.com/docs/models). Set `GROQ_MODEL` in Vercel env vars to override it without a code change. |
| `api/chat.ts` | 11–14 | `rateLimitMap` is in-memory, so each serverless instance keeps its own counts and they reset on cold start. It is not a real global rate limit. If abuse becomes a problem, replace it with a shared store (Upstash Redis / Vercel KV). |
| `api/newsletter.ts` | — | **Required before newsletter signups work:** create a Mailchimp audience, then set `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID` in Vercel env vars. Until then the form shows "temporarily unavailable". Test one real signup afterwards, including re-subscribing after an unsubscribe. |
| `src/components/Footer.tsx` | 73 | Footer service links go to `/services?service=<id>#<id>`, but nothing on the Services page reads that parameter or has those anchors, so they land at the top of /services. This was already the case before the redesign. |
| `src/assets/vislybluq-vcube-logo.png` | — | The logo is 288×288 but the hero cube shows it at up to 256px, so it's slightly soft on retina screens. A 600px+ PNG or an SVG would fix that. |

## Claims to verify or rewrite

These are existing statements the redesign didn't touch, but which may not be accurate. Each needs to be confirmed or rewritten.

| File | Line | What's needed |
| --- | --- | --- |
| `src/pages/FAQ.tsx` | 7 | Says "Compliance with SOC2, GDPR, and HIPAA is non-negotiable" and that consultants work in "high-security VPCs" with zero-trust access. Confirm or remove. |
| `src/pages/FAQ.tsx` | 5–6 | "4-week Technical Discovery phase", "proprietary VislyBluq Agile Framework", "Gold Standard … Rust or Go-based microservices … Kubernetes". Confirm these describe how you actually work. |
| `src/pages/Privacy.tsx` | 11 | The policy now names Mailchimp as the newsletter provider. It also still mentions "AI-curated insights and case studies", and neither exists on the site any more. Have the whole policy reviewed. |
| `src/pages/Privacy.tsx` | 11 | "AES-256 at rest and TLS 1.3 in transit", "MFA and RBAC enforced across all layers", "SOC2 Type II and GDPR compliant infrastructure". A privacy policy must be accurate, so get these checked. |
| `src/pages/About.tsx` | 13–37 | Tone: hero ("Global Engineering Lead", "Building the Future", "the world's most ambitious enterprise ecosystems"), plus "invisible backbone of global digital transformation", "elite technology consulting … data-driven architectural mastery", "polymath engineers". These need plain rewrites like the approved home page copy; send me the facts and I'll draft them. |

