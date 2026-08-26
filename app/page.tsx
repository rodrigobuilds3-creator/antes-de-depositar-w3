export default function Home() {
  return (
    <main className="site-shell">
      <aside className="brand-rail" aria-label="Identidad de ANTES">
        <div className="brand-lockup">
          <span className="pause-mark" aria-hidden="true">
            <span className="pause-line" />
            <span className="pause-bars">Ⅱ</span>
            <span className="pause-arrow">→</span>
          </span>
          <div>
            <p className="brand-name">ANTES</p>
            <p className="brand-descriptor">de depositar</p>
          </div>
        </div>
        <p className="brand-promise">Una pausa hoy puede evitar un problema mañana.</p>
        <div className="chain-preview" aria-label="Cadena de evidencia">
          <span>Empresa</span><i aria-hidden="true" />
          <span>Promotor</span><i aria-hidden="true" />
          <span>Oferta</span><i aria-hidden="true" />
          <span>Cuenta</span>
        </div>
        <p className="rail-note">
          No revisamos si algo <em>parece</em> real. Conectamos la evidencia de la transacción.
        </p>
      </aside>

      <section className="intake-panel">
        <header className="mobile-header">
          <div className="compact-brand">
            <span className="compact-mark" aria-hidden="true">Ⅱ→</span>
            <span>ANTES</span><small>de depositar</small>
          </div>
          <span className="demo-badge">DEMO SIMULADA</span>
        </header>
        <div className="step-marker" aria-label="Paso 1 de 3">
          <span>01</span><div><b /><i /><i /></div><small>Recibir la promoción</small>
        </div>
        <div className="intake-copy">
          <p className="eyebrow">Antes de mover tu dinero</p>
          <h1>Revisa antes de transferir.</h1>
          <p>
            Pega la promoción que recibiste. Te mostraremos qué información coincide,
            qué falta y qué debes preguntar.
          </p>
        </div>
        <form className="intake-form">
          <label htmlFor="promotion">Promoción, mensaje o enlace</label>
          <textarea
            id="promotion"
            name="promotion"
            rows={6}
            maxLength={5000}
            placeholder="Pega aquí el mensaje que recibiste por WhatsApp o Facebook…"
          />
          <div className="input-actions">
            <button type="button" className="upload-button">
              <span aria-hidden="true">＋</span>Subir captura ficticia
            </button>
            <span>PNG, JPG o WebP · máximo 5 MB</span>
          </div>
          <div className="privacy-note">
            <span aria-hidden="true">!</span>
            <p>
              Esta es una demostración académica. No ingreses nombres, cuentas bancarias
              ni documentos de personas reales.
            </p>
          </div>
          <button type="button" className="primary-action">
            <span>Revisar oferta</span><span aria-hidden="true">→</span>
          </button>
        </form>
        <footer className="intake-footer">
          <span>Esto no es asesoría financiera</span>
          <span>La inversión nunca se presenta como segura</span>
        </footer>
      </section>
    </main>
  );
}
