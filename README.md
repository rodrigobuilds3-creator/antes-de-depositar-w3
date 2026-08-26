# ANTES · de depositar

Working slice de la semana 3 de Negocios Inteligentes y Comercio Digital.

Ayuda a una persona en México a detenerse antes de transferir a una oportunidad de inversión recibida por WhatsApp o Facebook. El flujo conecta cuatro piezas: empresa, promotor, oferta y cuenta receptora.

## Ejecutar

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

## Arquitectura

- Vinext + React para la experiencia web.
- Gemini 3.7 Flash para extraer texto o datos de una captura cuando existe `GEMINI_API_KEY`.
- Extracción determinista de demostración cuando no hay clave.
- Motor local de reglas para el semáforo; la IA no decide el resultado.
- Datos y registros completamente ficticios.

## Límites explícitos

No consulta un regulador real, no valida cuentas bancarias, no usa biometría, no guarda datos personales y no ofrece asesoría financiera. Una cadena completa tampoco se llama “inversión segura”.

La definición del producto, alcance, flujo, arquitectura y pruebas está en [`docs/PACKET.md`](docs/PACKET.md).
