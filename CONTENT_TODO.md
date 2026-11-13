# Content TODO

Every placeholder on the site is listed here. In code, each one has a `// TODO(content):` comment. In dev builds (`npm run dev`), each one also shows a visible amber "TODO: real content" marker (the `ContentTodo` component in `src/components/site/Enterprise.tsx`). Production builds hide those markers.

## Content needed

| File | Line | What's needed |
| --- | --- | --- |
| `src/data/testimonials.ts` | 8 | Real testimonials that clients have approved (quote, name, role, company). The section is commented out in `src/pages/Home.tsx` for now; uncomment it there once there are real quotes. |
| `src/data/metrics.ts` | 6 | Confirm each home page metric is accurate: `5+` builds & prototypes, `10+` strategy sessions, `24h` typical first response, `3` core delivery tracks. |
| `src/pages/Home.tsx` | 105 | Dev marker above the metrics strip. Remove it once the metrics are confirmed. |
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
| `vercel.json` | — | **Before merging the `prerender` branch:** open its Vercel preview deployment and check the home page, a service page, the contact form, the newsletter and the chat. `vercel.json` now sets the build output to `build/client`; if the Vercel project's settings override the build or output directory, clear those overrides. |
| `public/sitemap.xml` | — | After the prerendered site is live, submit `https://www.vislybluq.com/sitemap.xml` in Google Search Console. Add new pages to the sitemap by hand when you create them. |
| `public/og-image.png` | — | The share-preview image was generated from the logo and tagline. Replace it with a designed 1200×630 image if you have one. |

## Claims to verify or rewrite

These are existing statements the redesign didn't touch, but which may not be accurate. Each needs to be confirmed or rewritten.

| File | Line | What's needed |
| --- | --- | --- |
| `src/pages/FAQ.tsx` | 7 | Says "Compliance with SOC2, GDPR, and HIPAA is non-negotiable" and that consultants work in "high-security VPCs" with zero-trust access. Confirm or remove. |
| `src/pages/FAQ.tsx` | 5–6 | "4-week Technical Discovery phase", "proprietary VislyBluq Agile Framework", "Gold Standard … Rust or Go-based microservices … Kubernetes". Confirm these describe how you actually work. |
| `src/pages/Privacy.tsx` | 11 | The policy now names Mailchimp as the newsletter provider. It also still mentions "AI-curated insights and case studies", and neither exists on the site any more. Have the whole policy reviewed. |
| `src/pages/Privacy.tsx` | 11 | "AES-256 at rest and TLS 1.3 in transit", "MFA and RBAC enforced across all layers", "SOC2 Type II and GDPR compliant infrastructure". A privacy policy must be accurate, so get these checked. |
| `src/pages/About.tsx` | 13–37 | Tone: hero ("Global Engineering Lead", "Building the Future", "the world's most ambitious enterprise ecosystems"), plus "invisible backbone of global digital transformation", "elite technology consulting … data-driven architectural mastery", "polymath engineers". These need plain rewrites like the approved home page copy; send me the facts and I'll draft them. |

