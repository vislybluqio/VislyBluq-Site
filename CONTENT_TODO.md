# Content TODO

Every placeholder on the site is listed here. In code, each one has a `// TODO(content):` comment. In dev builds (`npm run dev`), each one also shows a visible amber "TODO: real content" marker (the `ContentTodo` component in `src/components/site/Enterprise.tsx`). Production builds hide those markers.

## Content needed

| File | Line | What's needed |
| --- | --- | --- |
| `src/data/testimonials.ts` | 8 | Real testimonials that clients have approved (quote, name, role, company). The home page section stays hidden until at least one exists. |
| `src/data/metrics.ts` | 6 | Confirm each home page metric is accurate: `5+` builds & prototypes, `10+` strategy sessions, `24h` typical first response, `3` core delivery tracks. |
| `src/pages/Home.tsx` | 98 | Dev marker above the metrics strip. Remove it once the metrics are confirmed. |
| `src/data/insights.ts` | 29 | Insight post slot 1 of 3: real article (title, summary, body, takeaways, `tags` matching service IDs). |
| `src/data/insights.ts` | 29 | Insight post slot 2 of 3. |
| `src/data/insights.ts` | 29 | Insight post slot 3 of 3. |
| `src/data/insights.ts` | 14 | Confirm that the one remaining post, "Practical AI Systems for Growing Businesses", is content you're happy to publish. It was kept because it's on-topic and coherent, but it's short and general. |
| `src/data/industries.ts` | 16 | Short description for **Fintech and Cooperatives** (shown on `/industries/fintech-cooperatives`). Also confirm the linked services and projects. |
| `src/data/industries.ts` | 24 | Short description for **SMBs and Retail** (shown on `/industries/smbs-retail`). Also confirm the linked services and projects. |
| `src/data/projects.ts` | 17 | Real product screenshots for each project (`image` field). The home page "Selected work" strip (Sentinel Fraud Engine, Lighthill Cooperative, Cognitive Core Ops) shows a plain gradient placeholder until then. Also confirm these are the three projects you want featured (`featuredProjectIds`). |
| `src/components/home/SelectedWork.tsx` | 33 | Dev marker inside each placeholder image. It disappears automatically once a project has an `image`. |
| `src/config/focus.ts` | 32 | Focus page (`/focus/ai-for-fintech`) intro paragraph. |
| `src/config/focus.ts` | 35 | Focus page stats: 3–4 real value + label pairs. The stat row is hidden in production until at least one is filled in. |
| `src/config/focus.ts` | 19
41 | Focus page full-bleed band image and alt text. The band is hidden in production until set. |
| `src/config/focus.ts` | 44 | Focus page "The problem" paragraph. |
| `src/config/focus.ts` | 46 | Focus page "How we approach it" paragraph. The two-column section is hidden in production while both paragraphs are empty. |
| `src/config/siteVideo.ts` | 2 | YouTube ID for the "Watch our story" video. The hero video card is hidden while this is empty. |

## Technical follow-ups

| File | Line | What's needed |
| --- | --- | --- |
| `api/chat.ts` | 4 | Check `llama-3.3-70b-versatile` against Groq's current model list (console.groq.com/docs/models). Set `GROQ_MODEL` in Vercel env vars to override it without a code change. |
| `api/chat.ts` | 11–14 | `rateLimitMap` is in-memory, so each serverless instance keeps its own counts and they reset on cold start. It is not a real global rate limit. If abuse becomes a problem, replace it with a shared store (Upstash Redis / Vercel KV). |
