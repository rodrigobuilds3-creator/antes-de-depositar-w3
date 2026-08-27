import type { Claims } from "./types";

const valueAfter = (text: string, labels: string[]) => {
  for (const label of labels) {
    const expression = new RegExp(
      `${label}\\s*[:\\-]?\\s*([^.;\\n]+?)(?=\\s+(?:garantiza|promete|ofrece|te invita|transfiere|deposita)\\b|[.;\\n]|$)`,
      "i",
    );
    const match = text.match(expression);
    if (match?.[1]) return match[1].trim();
  }
  return null;
};

export function deterministicExtraction(text: string): Claims {
  const knownDemoCompany = ["Cooperativa Horizonte Demo", "Capital Faro Demo", "Horizonte Demo"]
    .find((name) => text.toLocaleLowerCase("es-MX").includes(name.toLocaleLowerCase("es-MX")));
  const company = knownDemoCompany ??
    text.match(/(?:con|empresa|instituci[oó]n)\s+([A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ ]+?Demo)(?=[.,]|\s+ofrece|\s+te\s)/)?.[1]?.trim() ?? null;
  const promoter =
    valueAfter(text, ["promotor", "asesor", "contacto"]) ??
    text.match(/([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+\s+Demo)\s+te invita/)?.[1] ??
    null;
  const returnClaim =
    text.match(/(?:garantiza|rendimiento)\s+([^.;\n]+)/i)?.[0]?.trim() ?? null;
  const paymentDestination =
    text.match(/(?:DEMO-ACCOUNT-[A-Z0-9-]+|CLABE-DEMO-[A-Z0-9-]+)/i)?.[0]?.toUpperCase() ?? null;

  return { company, promoter, returnClaim, paymentDestination };
}
