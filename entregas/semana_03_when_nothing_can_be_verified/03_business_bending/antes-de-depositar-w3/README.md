# ANTES de depositar

Week 3 Business Bending working slice for Rodrigo Peña de León, Operator, Team 8.

ANTES helps a person in Mexico pause before transferring money to an investment opportunity received through WhatsApp or Facebook. The flow connects four pieces of evidence: company, promoter, offer, and receiving account.

## Live product and repository

- Product: https://antes-de-depositar-w3.j6x567qt8g.chatgpt.site/
- Repository: https://github.com/rodrigobuilds3-creator/antes-de-depositar-w3

The public product intentionally uses plain Spanish because its target user is Mexican and may have limited digital or financial literacy.

## Local validation

```bash
npm test
npm run typecheck
npm run build
```

## Technical slice

- Mobile-first Spanish interface.
- Gemini structured text/image extraction when a protected key is available.
- Visibly labeled deterministic demonstration extraction when the key is absent.
- Local transparent rule engine; AI never owns the recommendation.
- Fictional records and payment identifiers only.
- No server-side personal-data storage.

## Explicit limits

The prototype does not consult a real regulator, validate bank accounts, use biometrics, store personal data, or provide financial advice. Even a coherent fictional chain is never called a safe investment.

The approved product definition, scope, flow, architecture, and test plan are documented in [`docs/PACKET.md`](docs/PACKET.md).
