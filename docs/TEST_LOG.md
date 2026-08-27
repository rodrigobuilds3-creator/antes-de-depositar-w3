# Test Log · Week 3 Working Slice

## Version tested

- Deployment history: three saved versions; version 3 is public.
- Flow: fictional promotion → extraction → correction → evidence → recommendation.
- Cases: critical mismatch, incomplete information, and coherent fictional chain.

## Failure found

The mechanical red-case test showed that deterministic extraction confused the promoter name with the sales promise that followed it in the same sentence.

- Expected: `Luis Andrade Demo`
- Received: `Luis Andrade Demo guarantees 18% monthly`
- Operating risk: compare the wrong identity and force the user to correct information that was already clearly written.
- Reproducible test: `tests/extraction.test.ts`.

The first run was intentionally red: 3 tests passed and 1 failed.

## Fix

An explicit boundary now stops the promoter name when a sales action begins, including `guarantees`, `promises`, `offers`, `transfers`, or `deposits`. The return claim remains stored separately.

## Revalidation

- Extraction: promoter and return claim remain separate.
- Rules: incomplete information remains red.
- Rules: a guaranteed return and unrelated account remain red.
- Language: a coherent fictional chain is never called a safe investment.
- Automated tests: 4/4 pass.
- TypeScript validation: passes.
- Production build: passes.
- The mechanical fix was deployed, followed by the Persona Test clarification and another deployment.

## Public-site validation

- The flow opens without ChatGPT or GitHub login.
- `Resultado simulado` appears before the user interprets the checks.
- Positive checks say `Coincide en demo`.
- The interface states that it does not consult authorities, banks, or real registries.
- If a Gemini key is absent, the route uses the labeled deterministic fallback and does not claim that vision extraction occurred.
