import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { demoCases } from "../lib/demo-cases.ts";
import { deterministicExtraction } from "../lib/deterministic-extraction.ts";

describe("deterministicExtraction", () => {
  it("separa el nombre del promotor de la promesa de rendimiento", () => {
    const criticalCase = demoCases.find((demo) => demo.id === "critical");
    assert.ok(criticalCase);
    const claims = deterministicExtraction(criticalCase.text);
    assert.equal(claims.promoter, "Luis Andrade Demo");
    assert.equal(claims.returnClaim, "garantiza 18% mensual");
  });
});
