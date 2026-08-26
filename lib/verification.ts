import type { Claims } from "./types";

export type CheckKey = keyof Claims;
export type CheckStatus = "confirmed" | "mismatch" | "missing";

export type EvidenceCheck = {
  key: CheckKey;
  title: string;
  status: CheckStatus;
  headline: string;
  detail: string;
  source: string;
  simulated: true;
};

export type VerificationResult = {
  overall: "stop" | "review";
  label: string;
  recommendation: string;
  checks: EvidenceCheck[];
  nextSteps: string[];
};

type DemoInstitution = {
  aliases: string[];
  promoters: string[];
  account: string;
  acceptedReturn: RegExp;
};

const demoInstitutions: DemoInstitution[] = [
  {
    aliases: ["capital faro demo", "capital faro demo sa de cv"],
    promoters: ["mariana silva demo"],
    account: "DEMO-ACCOUNT-040",
    acceptedReturn: /variable/i,
  },
  {
    aliases: ["cooperativa horizonte demo", "horizonte demo"],
    promoters: ["ana robles demo"],
    account: "DEMO-ACCOUNT-001",
    acceptedReturn: /variable anual/i,
  },
];

const normalize = (value: string | null) => value
  ?.normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-zA-Z0-9 ]/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .toLowerCase() ?? "";

const missing = (key: CheckKey, title: string, source: string): EvidenceCheck => ({
  key,
  title,
  status: "missing",
  headline: "Falta este dato",
  detail: "Sin esta pieza no podemos completar la cadena. Pídela antes de considerar un depósito.",
  source,
  simulated: true,
});

export function verifyClaims(claims: Claims): VerificationResult {
  const companyValue = normalize(claims.company);
  const institution = demoInstitutions.find((entry) => entry.aliases.includes(companyValue));

  const company: EvidenceCheck = !companyValue
    ? missing("company", "Empresa", "Padrón regulatorio ficticio")
    : institution
      ? { key: "company", title: "Empresa", status: "confirmed", headline: "Nombre localizado", detail: "El nombre coincide con una institución del padrón de demostración.", source: "Padrón regulatorio ficticio", simulated: true }
      : { key: "company", title: "Empresa", status: "mismatch", headline: "No encontramos coincidencia", detail: "El nombre no coincide exactamente con el padrón ficticio. No deposites hasta aclararlo.", source: "Padrón regulatorio ficticio", simulated: true };

  const promoterValue = normalize(claims.promoter);
  const promoter: EvidenceCheck = !promoterValue
    ? missing("promoter", "Promotor", "Lista de promotores ficticia")
    : institution?.promoters.includes(promoterValue)
      ? { key: "promoter", title: "Promotor", status: "confirmed", headline: "Promotor relacionado", detail: "La persona aparece vinculada a la empresa en la lista de demostración.", source: "Lista de promotores ficticia", simulated: true }
      : { key: "promoter", title: "Promotor", status: "mismatch", headline: "La relación no coincide", detail: "No encontramos a esta persona vinculada con la empresa indicada.", source: "Lista de promotores ficticia", simulated: true };

  const returnValue = claims.returnClaim?.trim() ?? "";
  const impossiblePromise = /(garantiz|segur[oa]|sin riesgo|18% mensual|duplic)/i.test(returnValue);
  const offer: EvidenceCheck = !returnValue
    ? missing("returnClaim", "Oferta", "Documento de oferta ficticio")
    : impossiblePromise
      ? { key: "returnClaim", title: "Oferta", status: "mismatch", headline: "Promesa crítica", detail: "Habla de rendimiento garantizado o fuera de realidad. Esa promesa exige detenerse y pedir documentos.", source: "Documento de oferta ficticio", simulated: true }
      : institution?.acceptedReturn.test(returnValue)
        ? { key: "returnClaim", title: "Oferta", status: "confirmed", headline: "Descripción coincidente", detail: "La descripción coincide con la oferta ficticia, pero no garantiza resultados futuros.", source: "Documento de oferta ficticio", simulated: true }
        : { key: "returnClaim", title: "Oferta", status: "mismatch", headline: "La oferta es distinta", detail: "La promesa no coincide con el documento de oferta de la demostración.", source: "Documento de oferta ficticio", simulated: true };

  const accountValue = claims.paymentDestination?.trim().toUpperCase() ?? "";
  const account: EvidenceCheck = !accountValue
    ? missing("paymentDestination", "Cuenta", "Cuenta receptora ficticia")
    : institution?.account === accountValue
      ? { key: "paymentDestination", title: "Cuenta", status: "confirmed", headline: "Destino coincidente", detail: "La referencia coincide con la cuenta receptora de demostración de la empresa.", source: "Cuenta receptora ficticia", simulated: true }
      : { key: "paymentDestination", title: "Cuenta", status: "mismatch", headline: "Destino no relacionado", detail: "La referencia no corresponde a la cuenta ficticia de la empresa. No transfieras.", source: "Cuenta receptora ficticia", simulated: true };

  const checks = [company, promoter, offer, account];
  const stop = checks.some((check) => check.status !== "confirmed");
  return {
    overall: stop ? "stop" : "review",
    label: stop ? "ALTO" : "REVISA CON CALMA",
    recommendation: stop
      ? "Nuestra recomendación: no deposites. La cadena está incompleta o contiene datos que no coinciden."
      : "Los cuatro datos coinciden en esta demostración. Eso no vuelve segura la inversión: revisa condiciones, riesgos y tu capacidad de pérdida.",
    checks,
    nextSteps: stop
      ? ["No envíes dinero ni documentos personales.", "Solicita por escrito los datos marcados y su evidencia.", "Usa el chat guiado para preparar tus preguntas."]
      : ["Lee el documento completo de la oferta.", "Pregunta por riesgos, comisiones y posibilidad de pérdida.", "Decide sin presión y busca asesoría independiente."],
  };
}
