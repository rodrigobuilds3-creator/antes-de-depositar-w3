import { GoogleGenAI } from "@google/genai";
import { analyzeRequestSchema, claimsSchema } from "../../../lib/types";
import { deterministicExtraction } from "../../../lib/deterministic-extraction";

const responseSchema = {
  type: "object",
  properties: {
    company: { type: ["string", "null"] },
    promoter: { type: ["string", "null"] },
    returnClaim: { type: ["string", "null"] },
    paymentDestination: { type: ["string", "null"] },
  },
  required: ["company", "promoter", "returnClaim", "paymentDestination"],
  additionalProperties: false,
};

export async function POST(request: Request) {
  let input: ReturnType<typeof analyzeRequestSchema.parse>;

  try {
    input = analyzeRequestSchema.parse(await request.json());
  } catch {
    return Response.json({ error: "La información enviada no es válida." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({
      claims: deterministicExtraction(input.text),
      mode: "demo",
      note: "Extracción simulada: revisa y corrige cada dato antes de continuar.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const contents: Array<Record<string, unknown>> = [
      {
        text: `Extrae únicamente los datos explícitos de esta promoción de inversión. No inventes datos. Si falta un dato responde null. Texto: ${input.text}`,
      },
    ];
    if (input.imageData && input.imageMimeType) {
      contents.push({ inlineData: { data: input.imageData, mimeType: input.imageMimeType } });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: [{ role: "user", parts: contents }],
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: responseSchema,
      },
    });
    const claims = claimsSchema.parse(JSON.parse(response.text ?? "{}"));
    return Response.json({
      claims,
      mode: "gemini",
      note: "Gemini extrajo estos datos; tú decides si están correctos.",
    });
  } catch (error) {
    console.error("Gemini extraction failed; using demo fallback", error);
    return Response.json({
      claims: deterministicExtraction(input.text),
      mode: "demo",
      note: "Gemini no respondió. Usamos la extracción simulada y debes corregirla.",
    });
  }
}
