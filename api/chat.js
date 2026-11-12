'use strict';
const refs=[
['Salmos 23:1-4','Dios es descrito como un pastor que acompaña en la dificultad.','Ñandejára oñembojoja peteĩ ovecha rerekua ñangarekóvare.','paz|miedo|solo|kyhyje|pyaguapy'],
['Filipenses 4:6-7','Anima a llevar las preocupaciones a la oración.','Ñamombe’u ñande py’apy ñembo’e rupive.','ansiedad|preocup|oracion|rezar|ñembo'],
['Mateo 11:28-30','Jesús invita a buscar descanso ante el cansancio.','Jesús ohenói umi ikane’õvape.','cansad|trist|kane|deprim'],
['Isaías 41:10','Ofrece palabras de ánimo frente al miedo.','He’i ani hag̃ua jakyhyje ha jajerovia.','futuro|miedo|temor|kyhyje'],
['1 Corintios 13:4-7','Describe el amor paciente y bondadoso.','Mborayhu añetegua ipasiénsia ha ipy’aporã.','amor|familia|pareja|mborayhu'],
['Mateo 6:9-13','Jesús enseña una oración para dirigirse a Dios.','Jesús ombo’e mba’éichapa ñañembo’e.','orar|oracion|rezar|ñembo'],
['Proverbios 3:5-6','Invita a buscar guía con humildad y confianza.','Oñemokyre’ỹ jajerovia ha jaheka arandu.','duda|decision|trabajo|estudio|arandu'],
['Salmos 34:18','Presenta consuelo para quienes tienen el corazón herido.','Oñe’ẽ py’aguapy rehe umi oñembyasyvape.','llorar|dolor|duelo|triste|ñembyasy']];
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function matching(text,lang){const s=norm(text);const ranked=refs.map((p,i)=>({p,i,rank:p[3].split('|').reduce((n,w)=>n+Number(s.includes(w)),0)})).filter(x=>x.rank>0).sort((a,b)=>b.rank-a.rank||a.i-b.i);return ranked.slice(0,1).map(({p})=>({reference:p[0],summary:lang==='gn'?p[2]:p[1]}));}
const SYSTEM="Eres Py'aguapy, una IA cristiana de reflexión bíblica para Paraguay. Nunca afirmes ser Dios, portavoz de Dios, profeta, Jesucristo ni receptor de revelaciones. No garantices milagros. Responde naturalmente en el idioma solicitado, español paraguayo o guaraní paraguayo (avañe'ẽ/jopará). Usa solo las referencias indicadas como paráfrasis; nunca inventes citas. Sé sensible y no reemplaces ayuda humana, pastoral ni profesional. Evita manipulación espiritual.";

function selectLanguage(text,lang){return lang==='gn'?'gn':/\b(sou|voce|você|estou|quero|preciso|obrigado|meu|minha|oração|não|nao)\b/i.test(text)?'pt':'es';}
function classify(text){const s=norm(text);const checks=[
 ['paraguay',/paraguay|paraguayo|paraguaio|paraguai/],
 ['identity',/quien eres|que eres|quem e voce|eres dios|voce e deus/],
 ['hello',/^(hola|ola|buenas|bom dia|boa tarde|mba.eichapa|hello)([!\s.,]|$)/],
 ['prayer',/oraci|orac[aã]o|orar|rezar|ñembo|anembo/],
 ['family',/familia|madre|padre|hermano|hermana|irm[aã]|rogaygu/],
 ['love',/amor|mborayhu|novi|namor|pareja/],
 ['peace',/paz|calma|tranquil|py.?aguapy|ansied|preocup|angust/],
 ['fear',/miedo|medo|futuro|temor|kyhyje/],
 ['sadness',/triste|chora|llorar|dolor|deprim|sozin|ñembyas/],
 ['work',/estud|trabaj|trabalh|decision|arandu/],
 ['bible',/biblia|salmo|versiculo|jesus|evangelio/],
 ['yes',/^(sim|si|sí|ok|dale|claro|entendi|entiendo)[.!\s]*$/]
 ];return (checks.find(x=>x[1].test(s))||['open'])[0];}
const replies={
 es:{
 paraguay:"¡Qué bueno! Py'aguapy está pensado para Paraguay. Podemos conversar en español o guaraní. ¿Cuál preferís?",
 identity:"Soy Py'aguapy, un asistente digital para la reflexión bíblica. No soy Dios ni recibo revelaciones. ¿De qué querés hablar?",
 hello:"¡Hola! Qué bueno que estés aquí. ¿Cómo está tu día?",
 prayer:"Podemos orar: «Señor, dame sabiduría para las decisiones de hoy, calma en mis preocupaciones y fuerza para hacer el bien. Amén». ¿Por qué querés orar?",
 family:"La familia puede ser un apoyo, pero también una preocupación. ¿Qué está pasando?",
 love:"El amor también tiene que ver con el respeto y la paciencia. ¿Hablás de amistad, familia o pareja?",
 peace:"Encontrar paz no exige resolverlo todo hoy. ¿Qué preocupación te está quitando la tranquilidad?",
 fear:"Sentir incertidumbre por el futuro es comprensible. ¿Qué parte te preocupa más?",
 sadness:"Siento que estés atravesando algo difícil. Si querés, contame qué pasó.",
 work:"Tomar una decisión puede resultar difícil. ¿Qué opciones estás considerando?",
 bible:"Puedo conversar sobre un pasaje sin inventar citas. ¿Qué libro o tema bíblico te interesa?",
 yes:"Te escucho. ¿Querés contarme más?",
 open:"Quiero comprenderte mejor, sin repetirte una respuesta automática. ¿Podés contarme un poco más?",
 open2:"Gracias por contármelo. ¿Querés conversar, hacer una oración o buscar una reflexión bíblica?"
 },
 gn:{
 paraguay:"Iporãite! Py'aguapy ojejapo Paraguay-pe g̃uarã. Ikatu ñañemongeta guaraníme térã castellano-pe. Mávapa reipota?",
 identity:"Che Py'aguapy, peteĩ pytyvõhára digital Biblia rehegua. Ndaha'éi Ñandejára. Mba'épa reikuaase?",
 hello:"Mba'éichapa! Mba'érepa reñemongetase ko árape?",
 prayer:"Ñañembo'e: «Ñandejára, eme'ẽ chéve arandu, mbarete ha py'aguapy. Amén». Mba'érepa reñembo'ese?",
 family:"Ñande rogaygua rehe ñañangarekose. Mba'épa oiko?",
 love:"Mborayhu oikotevẽ respeto ha paciencia. Mávarepa reñemongetase?",
 peace:"Sapy'ánte py'aguapy jaheka mbeguekatúpe. Mba'épa ndepy'apy ko árape?",
 fear:"Ndaikatúi jaikuaa opa mba'e tenonderã. Mba'épa nemongyhyje?",
 sadness:"Ambyasy rehasa haguére peteĩ mba'e hasýva. Ikatu emombe'u chéve.",
 work:"Mba'épa redesidise ko'ág̃a?",
 bible:"Ikatu jajepy'amongeta Biblia rehe. Mba'e libro rehepa reikuaase?",
 yes:"Rohendu. Emombe'uve chéve.",
 open:"Aikuaase porãve mba'épa reñandu. Ikatu emombe'uve chéve?",
 open2:"Reikotevẽpa ñembo'e térã ñemongeta?"
 },
 pt:{
 paraguay:"Que bom! O Py'aguapy foi criado para o Paraguai. Podemos conversar em espanhol ou guarani. Também posso te acompanhar em português. Qual você prefere?",
 identity:"Sou o Py'aguapy, um assistente de reflexão bíblica. Não sou Deus nem recebo revelações. Sobre o que gostaria de conversar?",
 hello:"Olá! Que bom que veio conversar. Como está seu dia?",
 prayer:"Podemos orar: «Deus, dá-me paz, sabedoria e coragem para fazer o bem hoje. Amém». Quer orar por algo específico?",
 family:"A família pode trazer apoio e preocupações. O que está acontecendo?",
 love:"Amor também envolve respeito, paciência e limites saudáveis. Você fala de família, namoro ou amizade?",
 peace:"Buscar paz não significa resolver tudo hoje. O que está pesando no seu coração?",
 fear:"É natural sentir medo do futuro. O que está te preocupando?",
 sadness:"Sinto muito que esteja passando por algo difícil. Quer me contar o que aconteceu?",
 work:"Tomar decisões pode ser difícil. Quais opções está considerando?",
 bible:"Posso conversar sobre passagens bíblicas sem inventar citações. Qual tema gostaria de explorar?",
 yes:"Estou ouvindo. Quer me contar mais?",
 open:"Quero entender o que você quis dizer, sem uma resposta automática. Pode contar um pouco mais?",
 open2:"Obrigado por compartilhar. Você prefere conversar, orar ou refletir sobre um texto bíblico?"
 }
};
function contextual(text,lang,history){
 let key=classify(text);if(key==='open'&&Array.isArray(history)&&history.filter(x=>x&&x.role==='assistant').length%2)key='open2';
 const dict=replies[lang]||replies.es, passages=['peace','fear','sadness','love','family','prayer','work','bible'].includes(key)?matching(text,lang):[];
 const note=passages.length&&key!=='prayer'?'\n\n'+passages[0].reference+' — '+passages[0].summary:'';
 return {mode:'guided',passages,reply:(dict[key]||dict.open)+note};
}

const bucket=new Map();function throttled(req){const key=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'local').split(',')[0];const now=Date.now();const arr=(bucket.get(key)||[]).filter(t=>now-t<60000);arr.push(now);bucket.set(key,arr);if(bucket.size>2500)bucket.clear();return arr.length>20;}
module.exports=async function(req,res){res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});if(throttled(req))return res.status(429).json({error:'Too many requests'});let body=req.body||{};if(typeof body==='string'){try{body=JSON.parse(body)}catch(e){return res.status(400).json({error:'Invalid JSON'})}}const {text,lang='es',history=[]}=body;if(typeof text!=='string'||text.trim().length===0||text.length>1800||!['es','gn'].includes(lang))return res.status(400).json({error:'Mensaje inválido'});if(/suicid|matarme|quitarme la vida|quiero morir|ajejuka|añejuka|hacerme da[nñ]o/i.test(norm(text))){return res.status(200).json({mode:'guided',passages:[],reply:lang==='gn'?'Nde rekove tuicha mba’e. Eheka ko’ág̃a peteĩ tapicha rejeroviáva ha emergencias pytyvõ.':'Tu seguridad es lo más importante. Busca ahora a una persona de confianza y llama a emergencias si corres peligro.'});}const spoken=selectLanguage(text,lang);const fallback=contextual(text,spoken,history);const passages=fallback.passages;if(process.env.GROQ_API_KEY){try{const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),15000);let response;try{response=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',signal:ctrl.signal,headers:{'Content-Type':'application/json',Authorization:'Bearer '+process.env.GROQ_API_KEY},body:JSON.stringify({model:process.env.GROQ_MODEL||'openai/gpt-oss-20b',messages:[{role:'system',content:SYSTEM+'\nLanguage: '+spoken+'\nBible references (paraphrases): '+JSON.stringify(passages)},...(Array.isArray(history)?history.slice(-8).filter(x=>x&&['user','assistant'].includes(x.role)&&typeof x.content==='string').map(x=>({role:x.role,content:x.content.slice(0,2000)})):[]),{role:'user',content:text}],temperature:0.5,max_tokens:500})});}finally{clearTimeout(timer)}if(response.ok){const data=await response.json();const reply=data?.choices?.[0]?.message?.content;if(typeof reply==='string'&&reply.trim())return res.status(200).json({mode:'ai',reply:reply.slice(0,5000),passages});}}catch(e){console.error('AI temporarily unavailable',e.message);}}
return res.status(200).json(fallback);};
