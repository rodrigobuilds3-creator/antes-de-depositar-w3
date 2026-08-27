import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { verifyClaims } from "../lib/verification.ts";

describe("verifyClaims", () => {
  it("mantiene rojo cuando falta una parte de la cadena", () => {
    const result = verifyClaims({ company: "Horizonte Demo", promoter: null, returnClaim: null, paymentDestination: null });
    assert.equal(result.overall, "stop");
    assert.equal(result.checks.filter((check) => check.status === "missing").length, 3);
  });

  it("detiene una promesa garantizada y una cuenta ajena", () => {
    const result = verifyClaims({ company: "Capital Faro Demo", promoter: "Luis Andrade Demo", returnClaim: "garantiza 18% mensual", paymentDestination: "DEMO-ACCOUNT-404" });
    assert.equal(result.overall, "stop");
    assert.ok(result.checks.filter((check) => check.status === "mismatch").length >= 3);
  });

  it("nunca llama segura a una cadena completa", () => {
    const result = verifyClaims({ company: "Cooperativa Horizonte Demo", promoter: "Ana Robles Demo", returnClaim: "rendimiento variable anual", paymentDestination: "DEMO-ACCOUNT-001" });
    assert.equal(result.overall, "review");
    assert.ok(!result.recommendation.toLowerCase().includes("inversión segura"));
    assert.match(result.checks[0].headline.toLowerCase(), /demo/);
    assert.match(result.checks[0].detail.toLowerCase(), /no consultamos un regulador real/);
  });
});
