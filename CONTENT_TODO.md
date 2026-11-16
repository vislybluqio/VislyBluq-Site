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
| `public/og-image.png` | — | Redesigned to match the new site (November 2026). Source: dark background, headline, logo, service list. |

## Claims to verify or rewrite

These are existing statements the redesign didn't touch, but which may not be accurate. Each needs to be confirmed or rewritten.

| File | Line | What's needed |
| --- | --- | --- |
| `src/pages/FAQ.tsx` | 7 | Says "Compliance with SOC2, GDPR, and HIPAA is non-negotiable" and that consultants work in "high-security VPCs" with zero-trust access. Confirm or remove. |
| `src/pages/FAQ.tsx` | 5–6 | "4-week Technical Discovery phase", "proprietary VislyBluq Agile Framework", "Gold Standard … Rust or Go-based microservices … Kubernetes". Confirm these describe how you actually work. |
| `src/pages/Privacy.tsx` | 11 | The policy now names Mailchimp as the newsletter provider. It also still mentions "AI-curated insights and case studies", and neither exists on the site any more. Have the whole policy reviewed. |
| `src/pages/Privacy.tsx` | 11 | "AES-256 at rest and TLS 1.3 in transit", "MFA and RBAC enforced across all layers", "SOC2 Type II and GDPR compliant infrastructure". A privacy policy must be accurate, so get these checked. |
| `src/pages/About.tsx` | 13–37 | Tone: hero ("Global Engineering Lead", "Building the Future", "the world's most ambitious enterprise ecosystems"), plus "invisible backbone of global digital transformation", "elite technology consulting … data-driven architectural mastery", "polymath engineers". These need plain rewrites like the approved home page copy; send me the facts and I'll draft them. |


## Redesign notes (November 2026)

- **Design system:** all colors and fonts now live in `tailwind.config.js` (`ink`, `paper`, `body`, `brand`) and the shared components in `src/components/site/Enterprise.tsx`. Pages use those names, not hex codes.
- **Home metrics strip removed.** `src/data/metrics.ts` is no longer shown. Bring it back only with confirmed numbers.
- **FAQ rewritten** to match what the rest of the site says. The previous SOC2/HIPAA, "proprietary framework" and "Gold Standard stack" answers were removed, so the FAQ rows in "Claims to verify" above no longer apply.
- **About page copy rewritten** in plain language (the "Global Engineering Lead" / "polymath engineers" copy is gone).
- **Newsletter pop-up switched off** (removed from `src/root.tsx`). The footer sign-up remains. Re-add `<NewsletterPopup />` to turn it back on.
- **Video section** on the home page now only appears once a YouTube ID is set in `src/config/siteVideo.ts`.
- **Privacy and Terms** were restyled only; their wording is unchanged and still needs the review listed above.
- **Contact form project types** now use the same six services as the Services page, and each service page's "Start a project" button pre-selects its service. `src/data/services.ts` is no longer used by any page.

## Fixes (November 2026, second pass)

- **Forms:** `api/submit-form.ts` now reports a failed send as an error (it used to show success), requires a valid reCAPTCHA token whenever `RECAPTCHA_SECRET_KEY` is set, forwards only known fields (no `_cc`/`_next` injection), checks the honeypot, and no longer emails visitors' IP addresses.
- **Set both reCAPTCHA keys in Vercel, or neither.** If `RECAPTCHA_SECRET_KEY` is set but `VITE_RECAPTCHA_SITE_KEY` is not, every form submission will be rejected. The live site currently has no site key.
- **Chat escalation** now goes through `/api/submit-form` (bot-checked, lands in the same inbox as the contact form) instead of posting straight to a Gmail address.
- **One public email:** sales@vislybluq.com everywhere (Apply error message, newsletter error, chat). Personal emails on the Team page are unchanged.
- **Security headers** added in `vercel.json`. A Content-Security-Policy is still to do; it needs testing against Google Fonts, Maps, reCAPTCHA, Cloudinary and YouTube.
- **Unknown URLs now return a real 404.** The catch-all rewrite is gone from `vercel.json`; the build copies the app shell to `404.html`, which shows the "page not found" screen. Check on the Vercel preview that normal pages (e.g. /about, /services/cloud-native-migration) still load and a made-up URL shows the 404 page.
- **Design mockups** moved from `public/` (where they were publicly downloadable) to `design-reference/`.
- **Still needed from you:** individual LinkedIn URLs for the team (every version of the site has pointed all five to the company page), and case studies once you have them.
