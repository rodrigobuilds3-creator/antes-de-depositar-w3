# Persona Test · ANTES de depositar

## Session

- Date: August 26, 2026
- Product tested: public version of ANTES de depositar
- Method: guided usability walkthrough with a synthetic persona and completely fictional data; intake, confirmation, result, and support screens were reviewed in order
- Scenario: Facebook investment offer promising a guaranteed 18% monthly return

## Synthetic persona

**Elena, 67.** She uses Facebook and WhatsApp every day but does not easily distinguish an official registry, a simulated source, and an AI-generated check. She wants one answer before transferring: “Should I deposit or not?”

## Task

1. Select the suspicious promotion.
2. Review the four extracted fields.
3. Compare the company, promoter, offer, and payment destination.
4. Explain in her own words what she would do next.

## Walkthrough evidence

- The first screen communicates that the offer should be reviewed before transferring money.
- The fictional promotion loads without entering personal information.
- Extraction separates company, promoter, return claim, and payment destination.
- The overall `ALTO` result and `no deposites` instruction are understandable and actionable.
- Guided support explains that red does not prove fraud; it indicates missing or contradictory evidence.

The ordered screens are documented in the final Persona Test PDF. This was a guided synthetic session performed during construction; it is not presented as a real interview or statistical study.

## Observed confusion

1. **High priority:** the green `Empresa · Coincide` check could be interpreted as a real official lookup because the simulated-source label appeared too low.
2. **Medium priority:** `Confirma lo que encontramos` could imply that Elena must know whether the company is legitimate instead of confirming transcription accuracy.
3. **Low priority:** `cadena de evidencia` is precise but less direct than “the four details you need to check.”

## Worst problem and design decision

The product was changed to prevent a false impression of official authorization. It now:

- displays a prominent `Resultado simulado` banner;
- states that the prototype does not consult authorities, banks, or real registries;
- changes `Coincide` to `Coincide en demo`;
- changes `Nombre localizado` to `Nombre localizado en demo`; and
- keeps the overall recommendation red when information is incomplete or contradictory.

## Iteration outcome

The decision reduces the chapter's central harm: a convincing interface turning simulation into apparent truth. The design exposes what evidence exists, what is fictional, and why the user should not deposit yet.
