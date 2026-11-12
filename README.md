# Py'aguapy — SaaS de acompañamiento bíblico para Paraguay (MVP)

Aplicación web adaptada a teléfonos con interfaz en **español paraguayo** y **guaraní paraguayo** (versión beta), enfoque cristiano y un chat de apoyo y reflexión bíblica. **No representa a Dios, no afirma tener comunicación divina y no sustituye a profesionales ni líderes de fe.**

## Qué funciona
- Interfaz responsive, bilingüe, mensajes y cambio de idioma durante la sesión.
- Respuesta con IA real **si** se configura una clave `GROQ_API_KEY` válida en servidor. Motor OpenAI-compatible con `openai/gpt-oss-20b` como modelo inicial; disponibilidad y límites dependen del proveedor.
- Sin clave, respuestas temáticas con **25 pasajes de referencia seleccionados**, claramente etiquetadas «Guía bíblica», no simuladas como IA generativa.
- Referencias bíblicas ligadas al tema, sugerencias para orar, botón para copiar y nueva conversación.
- Detección elemental de frases de autolesión para priorizar ayuda humana. No sustituye moderación profesional ni cobertura lingüística nativa.
- No guarda conversaciones en base de datos ni en navegador; el historial se mantiene solo en memoria hasta recargar la pestaña. Cuando se usa la API externa, los mensajes necesarios para responder son enviados al proveedor.

## Ejecutar localmente

```bash
node -v  # Node >= 20
npm test
npm run dev
```

Abrir `http://localhost:3000`. No requiere `npm install` porque no hay dependencias externas.

Para habilitar generación real por IA, configure en el entorno del **servidor** (nunca en el navegador):

```bash
GROQ_API_KEY="tu_clave" GROQ_MODEL="openai/gpt-oss-20b" npm run dev
```

No comparta la clave en el chat ni la suba al repositorio. El modo de orientación funciona sin ella.

## Publicar en Vercel

1. Cree un nuevo repositorio **separado de VP Studio**, suba estos archivos preservando sus rutas.
2. En Vercel, importe el repositorio como proyecto nuevo, *Framework Preset: Other*, sin comando de build y con directorio raíz `./`.
3. Opcionalmente agregue `GROQ_API_KEY` y `GROQ_MODEL` en las variables de entorno del proyecto. Mantenga la clave cifrada.
4. Configure límites persistentes de uso antes de abrir al público. El límite incluido es solo de mejor esfuerzo **por instancia**, no suficiente ante abuso distribuido.
5. Valide guaraní con hablantes paraguayos, matices denominacionales con líderes de fe y adecuación a usuarios menores.

## Contenidos bíblicos y licencias

Esta versión **NO incluye la Biblia completa**. Incluye un índice editorial de 25 referencias con resúmenes originales, no citas literales. No se debe afirmar que el modelo fue «entrenado con toda la Biblia». Para una versión completa, implemente RAG/recuperación de textos licenciados con citas verificadas (sin reentrenar desde cero).

- **Reina-Valera 1909**: texto español identificado como dominio público en https://open.bible/bibles/reina-valera-1909
- **Sociedad Bíblica Paraguaya**: ofrece versiones en guaraní, pero **antes de reproducir las traducciones modernas en un SaaS comercial con IA debe obtener la licencia correspondiente**: https://www.bible.com/es/organizations/8c70b193-4c20-4bb3-b6cf-9c2e812c3ee7
- **Tûpâ Ñandeyára 1913**: Nuevo Testamento histórico, posible fuente para evaluación, verificar la licencia y procedencia concreta antes de redistribuir: https://www.bible.com/es/versions/805
- Muchas traducciones modernas no permiten integrarlas en apps IA sin autorización: https://www.biblica.com/permissions/

## Pendientes para un SaaS comercial

1. Revisar guaraní con correctores nativos y crear evaluaciones humanas (incluido jopará).
2. Importar la Biblia RV1909 completa en una base consultable, crear búsqueda por capítulo/versículo y verificaciones anti-citas falsas.
3. Login, cuentas y límites de uso con Supabase, privacidad y consentimiento apropiado; proteger chats sensibles con controles de acceso.
4. Moderación contra contenido de daño, abuso y falsas afirmaciones religiosas; política de datos transparente.
5. Rate limit persistente + validación de identidad y costes de proveedor. Un uso gratuito ilimitado no está garantizado.
6. Pruebas de carga, accesibilidad y QA de seguridad antes de cobrar o publicitar.

Este es un MVP funcional y honesto sobre sus limitaciones, no un SaaS comercial completo todavía.