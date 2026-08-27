# Persona Test · ANTES de depositar

## Sesión

- Fecha: 26 de agosto de 2026
- Producto probado: versión pública de ANTES de depositar
- Método: recorrido guiado de usabilidad con persona sintética y datos completamente ficticios
- Escenario: oferta recibida por Facebook con rendimiento garantizado de 18% mensual

## Persona sintética

**Elena, 67 años.** Usa Facebook y WhatsApp todos los días, pero no distingue con facilidad entre un registro oficial, una fuente simulada y una verificación hecha por inteligencia artificial. Quiere saber una sola cosa antes de transferir: “¿Deposito o no deposito?”.

## Tarea

1. Elegir la promoción sospechosa.
2. Revisar los cuatro datos extraídos.
3. Comparar empresa, promotor, oferta y cuenta.
4. Explicar con sus propias palabras qué haría después.

## Evidencia del recorrido

- La primera pantalla explica con claridad que se debe revisar antes de transferir.
- La promoción ficticia se carga sin escribir datos personales.
- La extracción separa correctamente empresa, promotor, rendimiento y cuenta.
- El resultado general “ALTO” y la frase “no deposites” son entendibles y accionables.
- El chat guiado explica correctamente que rojo no prueba una estafa; señala que falta evidencia o existen datos que no coinciden.

## Confusiones observadas

1. **Alta prioridad:** el check verde “Empresa · Coincide” podía interpretarse como consulta a un registro oficial real. La leyenda “Fuente simulada” aparecía demasiado abajo para una persona que sólo escanea el resultado.
2. **Prioridad media:** “Confirma lo que encontramos” puede hacer sentir al usuario que debe saber si la empresa o cuenta son verdaderas; en realidad sólo debe confirmar que la extracción coincide con el mensaje recibido.
3. **Prioridad baja:** la expresión “cadena de evidencia” es correcta, pero menos directa que “los cuatro datos que debes revisar”.

## Peor problema y decisión de diseño

Se corrigió la posible falsa sensación de autorización oficial. El producto ahora:

- muestra un aviso visible: “Resultado simulado”;
- aclara que no consulta autoridades, bancos ni registros reales;
- cambia “Coincide” por “Coincide en demo”;
- cambia “Nombre localizado” por “Nombre localizado en demo”; y
- mantiene la recomendación general en rojo cuando hay información incompleta o no coincidente.

## Resultado de la iteración

La decisión reduce el riesgo dramatizado por el capítulo: que una interfaz convincente convierta una simulación en una aparente verdad. El diseño no pide confianza en el sistema; obliga a leer qué evidencia existe, cuál es ficticia y por qué no se debe depositar todavía.
