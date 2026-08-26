# Test log · Week 3 working slice

## Versión probada

- Primer deploy: versión 1, publicada de forma privada.
- Flujo: promoción ficticia → extracción → corrección → evidencia → recomendación.
- Casos: datos críticos que no coinciden, información incompleta y cadena completa.

## Falla encontrada

La prueba mecánica del caso rojo mostró que la extracción simulada confundía el nombre del promotor con la promesa que seguía en la misma oración.

- Esperado: `Luis Andrade Demo`
- Obtenido: `Luis Andrade Demo garantiza 18% mensual`
- Riesgo operativo: comparar una identidad incorrecta y obligar al usuario a corregir información que sí estaba claramente escrita.
- Prueba reproducible: `tests/extraction.test.ts`.

La prueba se ejecutó primero en rojo: 3 pasaron y 1 falló.

## Corrección

Se añadió un límite explícito para detener el nombre cuando comienza una acción de venta como “garantiza”, “promete”, “ofrece”, “transfiere” o “deposita”. La promesa de rendimiento sigue guardándose por separado.

## Revalidación

- Extracción: promotor y rendimiento quedan separados.
- Reglas: información incompleta continúa en rojo.
- Reglas: promesa garantizada y cuenta ajena continúan en rojo.
- Lenguaje: una cadena completa nunca se llama inversión segura.
- TypeScript y build de producción: deben pasar antes del segundo deploy.
