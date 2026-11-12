# Py'aguapy — SaaS de reflexión bíblica (Paraguay)

Versión demostrativa publicada en https://pyaguapy-saas.vercel.app

## Funcionalidades actuales
- Interfaz web adaptada para celular en español paraguayo y guaraní paraguayo (avañe’ẽ, beta).
- Chat sobre fe y reflexión bíblica, oraciones orientativas y diez referencias bíblicas resumidas.
- Con una variable de entorno `GROQ_API_KEY`, la API puede consultar un modelo generativo. Sin clave, usa respuestas guiadas y las identifica como tales.
- Una conversación permanece en memoria de la pestaña, no se guarda en una cuenta ni en base de datos.
- El asistente **no es Dios, no dice recibir revelaciones divinas y no reemplaza apoyo pastoral ni profesional**.

## Estructura
- `index.html`: interfaz web y lógica de interacción.
- `api/chat.js`: API de orientación bíblica y conexión opcional a IA.
- `package.json` y `vercel.json`: configuración del despliegue.

## Despliegue
El proyecto ya existe en Vercel. Un despliegue de producción se creó desde el commit de GitHub, pero **la conexión automática Git↔Vercel todavía debe configurarse en Vercel → Proyecto → Settings → Git**. No cree otro proyecto.

Opcional: configurar `GROQ_API_KEY` únicamente como variable de entorno del servidor, nunca en el repositorio ni en el navegador. `GROQ_MODEL` puede personalizar el modelo si el proveedor lo admite.

## Alcance y advertencias
Este repositorio contiene la **versión simplificada publicada actualmente**, no el paquete MVP local más completo. No incluye la Biblia íntegra, cuentas de usuario, planes ni controles de abuso robustos. Las referencias son resúmenes originales, no citas literales de una traducción. Validar idioma guaraní con hablantes nativos y licencias de traducciones bíblicas antes de lanzar comercialmente.

Los planes Hobby de Vercel están destinados a uso personal no comercial; revisar términos y costes antes de usar como un SaaS de pago.
