"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { demoCases } from "../lib/demo-cases";
import type { Claims, ExtractionResponse } from "../lib/types";
import { verifyClaims } from "../lib/verification";
import type { VerificationResult } from "../lib/verification";

const emptyClaims: Claims = { company: null, promoter: null, returnClaim: null, paymentDestination: null };
const claimFields: Array<{ key: keyof Claims; label: string; help: string }> = [
  { key: "company", label: "Empresa que recibiría la inversión", help: "Razón social o nombre anunciado" },
  { key: "promoter", label: "Persona que ofrece la inversión", help: "Promotor, asesor o contacto" },
  { key: "returnClaim", label: "Rendimiento u oferta prometida", help: "Porcentaje, plazo o promesa" },
  { key: "paymentDestination", label: "Destino del dinero", help: "Cuenta, CLABE o referencia ficticia" },
];

export default function AntesApp() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [promotion, setPromotion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [claims, setClaims] = useState<Claims>(emptyClaims);
  const [mode, setMode] = useState<ExtractionResponse["mode"]>("demo");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const selectDemo = (text: string) => { setPromotion(text); setFile(null); setError(""); };
  const chooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const chosen = event.target.files?.[0] ?? null;
    if (!chosen) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(chosen.type)) { setError("La captura debe ser PNG, JPG o WebP."); return; }
    if (chosen.size > 5 * 1024 * 1024) { setError("La captura supera el máximo de 5 MB."); return; }
    setFile(chosen); setError("");
  };
  const toBase64 = (source: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(source);
  });
  const analyze = async (event: FormEvent) => {
    event.preventDefault();
    if (!promotion.trim() && !file) { setError("Pega una promoción o selecciona una captura ficticia."); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: promotion.trim(), imageData: file ? await toBase64(file) : undefined, imageMimeType: file?.type }),
      });
      const data = await response.json() as ExtractionResponse & { error?: string };
      if (!response.ok) throw new Error(data.error ?? "No pudimos analizar la promoción.");
      setClaims(data.claims); setMode(data.mode); setNotice(data.note); setStep(2);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "No pudimos analizar la promoción.");
    } finally { setLoading(false); }
  };
  const updateClaim = (key: keyof Claims, value: string) => setClaims((current) => ({ ...current, [key]: value.trimStart() || null }));
  const compare = () => { setResult(verifyClaims(claims)); setStep(3); };
  const restart = () => {
    setStep(1); setPromotion(""); setFile(null); setClaims(emptyClaims); setResult(null); setNotice(""); setError("");
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <main className="site-shell">
      <BrandRail step={step} />
      <section className="intake-panel">
        <MobileHeader />
        <StepMarker step={step} />
        {step === 1 ? (
          <>
            <div className="intake-copy"><p className="eyebrow">Antes de mover tu dinero</p><h1>Revisa antes de transferir.</h1><p>Pega la promoción que recibiste. Te mostraremos qué coincide, qué falta y qué debes preguntar.</p></div>
            <form className="intake-form" onSubmit={analyze} noValidate>
              <label htmlFor="promotion">Promoción, mensaje o enlace</label>
              <textarea id="promotion" name="promotion" rows={6} maxLength={5000} value={promotion} onChange={(event) => setPromotion(event.target.value)} placeholder="Pega aquí el mensaje que recibiste por WhatsApp o Facebook…" />
              <div className="input-actions">
                <input ref={fileInput} className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp" onChange={chooseFile} />
                <button type="button" className="upload-button" onClick={() => fileInput.current?.click()}><span aria-hidden="true">＋</span>{file ? "Cambiar captura" : "Subir captura ficticia"}</button>
                <span>{file ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB` : "PNG, JPG o WebP · máximo 5 MB"}</span>
              </div>
              <fieldset className="demo-picker"><legend>O prueba un caso ficticio</legend><div>{demoCases.map((demo) => <button key={demo.id} type="button" onClick={() => selectDemo(demo.text)}>{demo.label}</button>)}</div></fieldset>
              <SafetyNote />
              {error && <p className="form-error" role="alert">{error}</p>}
              <button type="submit" className="primary-action" disabled={loading}><span>{loading ? "Leyendo la promoción…" : "Revisar oferta"}</span><span aria-hidden="true">→</span></button>
            </form>
          </>
        ) : step === 2 ? (
          <section className="confirm-stage">
            <div className="confirm-heading"><div><p className="eyebrow">Tú tienes la última palabra</p><h1>Confirma lo que encontramos.</h1></div><span className={`mode-tag ${mode}`}>{mode === "gemini" ? "Extraído con Gemini" : "Extracción simulada"}</span></div>
            <p className="stage-intro">No verificamos nada todavía. Corrige estos cuatro datos para comparar la cadena correcta.</p>
            <p className="extraction-note">{notice}</p>
            <form className="claim-form" onSubmit={(event) => event.preventDefault()}>
              <div className="claim-grid">{claimFields.map((field, index) => <label className="claim-card" key={field.key}><span className="claim-number">0{index + 1}</span><span className="claim-label">{field.label}</span><input value={claims[field.key] ?? ""} onChange={(event) => updateClaim(field.key, event.target.value)} placeholder="No encontramos este dato" maxLength={200} /><small>{field.help}</small></label>)}</div>
              <div className="form-navigation"><button type="button" className="secondary-action" onClick={() => setStep(1)}>← Cambiar promoción</button><button type="button" className="primary-action compact" onClick={compare}><span>Comparar evidencia</span><span aria-hidden="true">→</span></button></div>
            </form>
          </section>
        ) : result ? (
          <ResultStage claims={claims} result={result} onBack={() => setStep(2)} onRestart={restart} />
        ) : null}
        <footer className="intake-footer"><span>Esto no es asesoría financiera</span><span>La inversión nunca se presenta como segura</span></footer>
      </section>
    </main>
  );
}

function BrandRail({ step }: { step: number }) {
  const phase = step === 1 ? "Recibir" : step === 2 ? "Confirmar" : "Decidir";
  return <aside className="brand-rail" aria-label="Identidad de ANTES"><div className="brand-lockup"><span className="pause-mark" aria-hidden="true"><span className="pause-line" /><span className="pause-bars">Ⅱ</span><span className="pause-arrow">→</span></span><div><p className="brand-name">ANTES</p><p className="brand-descriptor">de depositar</p></div></div><p className="brand-promise">Una pausa hoy puede evitar un problema mañana.</p><div className="rail-progress"><span>Paso {step} de 3</span><strong>{phase}</strong></div><div className="chain-preview" aria-label="Cadena de evidencia"><span>Empresa</span><i aria-hidden="true" /><span>Promotor</span><i aria-hidden="true" /><span>Oferta</span><i aria-hidden="true" /><span>Cuenta</span></div><p className="rail-note">No revisamos si algo <em>parece</em> real. Conectamos la evidencia de la transacción.</p></aside>;
}
function MobileHeader() { return <header className="mobile-header"><div className="compact-brand"><span className="compact-mark" aria-hidden="true">Ⅱ→</span><span>ANTES</span><small>de depositar</small></div><span className="demo-badge">DEMO SIMULADA</span></header>; }
function StepMarker({ step }: { step: number }) { const label = step === 1 ? "Recibir la promoción" : step === 2 ? "Confirmar los datos" : "Tomar una decisión"; return <div className="step-marker" aria-label={`Paso ${step} de 3`}><span>0{step}</span><div><b /><i className={step >= 2 ? "active" : ""} /><i className={step >= 3 ? "active" : ""} /></div><small>{label}</small></div>; }
function SafetyNote() { return <div className="privacy-note"><span aria-hidden="true">!</span><p>Esta es una demostración académica. No ingreses nombres, cuentas bancarias ni documentos de personas reales.</p></div>; }

function ResultStage({ claims, result, onBack, onRestart }: { claims: Claims; result: VerificationResult; onBack: () => void; onRestart: () => void }) {
  const [answer, setAnswer] = useState("Elige una pregunta. Te ayudaremos a convertir el resultado en una acción concreta.");
  const support = [
    ["¿Qué debo pedir?", "Solicita el registro de la empresa, la autorización del promotor, el documento completo de la oferta y una cuenta a nombre de la entidad. No aceptes sólo capturas."],
    ["¿Por qué está rojo?", "Rojo no significa que ya probamos una estafa. Significa que falta evidencia crítica o que un dato no coincide; por eso no es razonable depositar todavía."],
    ["¿Puedo reportarlo?", "Conserva el enlace, mensaje y datos de pago. En un producto real, con tu permiso, soporte prepararía el caso para la autoridad pertinente."],
  ] as const;
  const download = () => {
    const lines = [
      "ANTES DE DEPOSITAR · RESUMEN DE DEMOSTRACIÓN",
      `Recomendación: ${result.label}`,
      result.recommendation,
      "",
      ...result.checks.flatMap((check) => [`${check.title}: ${check.status.toUpperCase()} · ${check.headline}`, `Fuente simulada: ${check.source}`, check.detail, ""]),
      "Este archivo usa datos ficticios y no constituye asesoría financiera.",
    ];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "ANTES_resumen_demo.txt"; anchor.click(); URL.revokeObjectURL(url);
  };

  return (
    <section className={`result-stage ${result.overall}`}>
      <header className="result-hero">
        <div className="signal-orbit" aria-hidden="true"><span>{result.overall === "stop" ? "!" : "Ⅱ"}</span></div>
        <div><p className="eyebrow">Nuestra recomendación explícita</p><h1>{result.label}</h1><p>{result.recommendation}</p></div>
      </header>
      <div className="never-safe"><strong>No emitimos sellos de “inversión segura”.</strong><span>Comparamos una cadena de evidencia; tú conservas la decisión.</span></div>
      <section className="evidence-section" aria-labelledby="evidence-title">
        <div className="section-heading"><p className="eyebrow">La cadena, pieza por pieza</p><h2 id="evidence-title">Lo que sostiene este resultado</h2></div>
        <div className="evidence-grid">{result.checks.map((check) => (
          <article className={`evidence-card ${check.status}`} key={check.key}>
            <div className="evidence-top"><span className="status-icon" aria-hidden="true">{check.status === "confirmed" ? "✓" : check.status === "missing" ? "?" : "×"}</span><span>{check.title}</span><small>{check.status === "confirmed" ? "Coincide" : check.status === "missing" ? "Falta" : "No coincide"}</small></div>
            <h3>{check.headline}</h3><p>{check.detail}</p><footer><span>Fuente simulada</span><strong>{check.source}</strong></footer>
          </article>
        ))}</div>
      </section>
      <div className="decision-grid">
        <section className="next-card"><p className="eyebrow">Qué hacer ahora</p><ol>{result.nextSteps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol><button type="button" className="download-action" onClick={download}>Descargar resumen local ↓</button></section>
        <section className="support-card"><div className="support-head"><span className="support-avatar" aria-hidden="true">A</span><div><strong>Orientación ANTES</strong><small>Chat guiado · demostración</small></div></div><div className="support-message" aria-live="polite">{answer}</div><div className="support-options">{support.map(([question, response]) => <button type="button" key={question} onClick={() => setAnswer(response)}>{question}</button>)}</div></section>
      </div>
      <div className="result-actions"><button type="button" className="secondary-action" onClick={onBack}>← Corregir datos</button><button type="button" className="primary-action compact" onClick={onRestart}><span>Revisar otra promoción</span><span aria-hidden="true">↗</span></button></div>
      <p className="result-data-note">Datos usados: {claims.company ?? "empresa no indicada"} · La evidencia es ficticia y sólo existe para demostrar el flujo.</p>
    </section>
  );
}
