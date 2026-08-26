# DECISIONS — ANTES · Week 3

## Session close — August 26, 2026

### Decisions made

- Keep Team 8's primary vacuum: Proof-of-Human for commerce, narrowed to false investment offers before the first deposit.
- Build one mobile-first slice: paste text/link or upload a fictional screenshot, confirm four claims, inspect the evidence chain, receive a recommendation, and open guided support.
- Use **ANTES · de depositar** as the working brand. Its visual identity is a pause interrupting a forward transfer.
- Keep the Shadow Clause load-bearing: incomplete verification remains red, and the product never calls an investment safe.
- Use Gemini 3.7 Flash for structured multimodal extraction through a server-only adapter.
- Keep a deterministic, visibly labeled demo adapter so the public URL remains usable when the API is unavailable.
- Use fictional data only. Do not add a database, authentication, real registries, biometrics, real bank data, or authority sharing to the Week 3 slice.
- Preserve evidence through a client-side downloadable case summary and a correction/reanalysis path.
- Treat the packet, mockup, and implementation prompt as approved before code.

### Evidence behind the decisions

- Brightspace requires a working slice honoring the Blueprint, packet before code, an image-generated mockup, Mermaid flow and swimlane, benchmarks, architecture, testing, five commits, two deploys, a persona test, and the security floor.
- Team 8's Blueprint requires the transaction chain to connect company, promoter, offer documents, and receiving account; incomplete verification stays red.
- Current Gemini documentation supports image input and structured JSON output; the Developer API has a free tier suitable for fictional course data.

### Open hypotheses

- A free-to-user service can be funded by an institution that benefits from avoided fraud and lower support costs.
- The target user understands four evidence cards better than a generic score.
- A three-minute guided pause can change the decision before the first deposit.
- The free API quota and latency are sufficient for the class demo.

### Tomorrow's first move

Create the first documentation-only Git commit. Then scaffold the Next.js application and implement only the ANTES design tokens, Step 1 intake, and input validation before adding extraction or verification logic.

