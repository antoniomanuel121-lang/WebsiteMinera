import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, Menu, X, Globe2, Layers3, Workflow, Smartphone, MoveUpRight, Check, Mail, ExternalLink } from 'lucide-react';

const offerings = [
  {number:'01', label:'PRESENÇA DIGITAL', title:'Websites que deixam marca.', desc:'A primeira impressão do seu negócio merece mais do que um template. Criamos experiências digitais que transmitem confiança e convidam à ação.', tags:['Websites institucionais','Lojas online','Experiências interativas'], icon:Globe2, id:'websites'},
  {number:'02', label:'SOFTWARE À MEDIDA', title:'Menos complicações. Mais controlo.', desc:'Encomendas, clientes e processos num só lugar. Desenvolvemos ferramentas que se adaptam à forma como a sua empresa trabalha.', tags:['Gestão empresarial','Portais de clientes','Plataformas SaaS'], icon:Layers3, id:'software'},
  {number:'03', label:'AUTOMAÇÃO INTELIGENTE', title:'O tempo da sua equipa vale mais.', desc:'Transformamos tarefas repetitivas em processos simples e automáticos. Menos trabalho manual, mais espaço para fazer crescer o negócio.', tags:['Automatização','Integrações','Inteligência artificial'], icon:Workflow, id:'automacao'},
  {number:'04', label:'PRODUTOS DIGITAIS', title:'Da ideia ao ecrã.', desc:'Tem uma ideia para uma aplicação? Ajudamos a transformá-la num produto intuitivo, útil e pronto para evoluir.', tags:['Aplicações móveis','MVPs','Produtos digitais'], icon:Smartphone, id:'apps'}
];

function Brand(){return <a className="brand" href="#inicio" aria-label="Minera, voltar ao início">MINERA<span>.</span></a>}
function Header(){const [open,setOpen]=useState(false);return <header className="header"><div className="nav-shell"><Brand/><nav className={open?'nav-links open':'nav-links'} aria-label="Navegação principal"><a href="#solucoes" onClick={()=>setOpen(false)}>Soluções</a><a href="#projetos" onClick={()=>setOpen(false)}>Projetos</a><a href="#processo" onClick={()=>setOpen(false)}>Como trabalhamos</a><a className="mobile-contact" href="#contacto" onClick={()=>setOpen(false)}>Fale connosco</a></nav><a className="nav-cta" href="#contacto">Vamos conversar <ArrowUpRight size={16}/></a><button className="menu-button" aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>}
const heroServices = [{number:'01',title:'Websites',id:'websites'},{number:'02',title:'Software',id:'software'},{number:'03',title:'IA & Automação',id:'automacao'},{number:'04',title:'Aplicações',id:'apps'}];
function MagneticLink({className,href,children}:{className:string;href:string;children:React.ReactNode}){const ref=useRef<HTMLAnchorElement>(null);const reduce=useReducedMotion();return <a ref={ref} className={`${className} minera-magnetic`} href={href} onPointerMove={e=>{if(reduce||e.pointerType==='touch')return;const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);el.style.setProperty('--mag-x',`${dx*.16}px`);el.style.setProperty('--mag-y',`${dy*.22}px`);el.style.setProperty('--shine-x',`${e.clientX-r.left}px`);}} onPointerLeave={()=>{const el=ref.current;if(!el)return;el.style.setProperty('--mag-x','0px');el.style.setProperty('--mag-y','0px')}}>{children}</a>}
function Hero(){const reduce=useReducedMotion();const heroRef=useRef<HTMLElement>(null);return <section id="inicio" className="hero hero-v2" ref={heroRef} onPointerMove={e=>{if(reduce||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;const el=e.currentTarget;el.style.setProperty('--cursor-x',`${x}px`);el.style.setProperty('--cursor-y',`${y}px`);el.style.setProperty('--tilt-x',`${((y/r.height)-.5)*-10}deg`);el.style.setProperty('--tilt-y',`${((x/r.width)-.5)*10}deg`);el.style.setProperty('--orb-x',`${((x/r.width)-.5)*25}px`);el.style.setProperty('--orb-y',`${((y/r.height)-.5)*25}px`);}} onPointerLeave={e=>{const el=e.currentTarget;el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg');el.style.setProperty('--orb-x','0px');el.style.setProperty('--orb-y','0px');}}><div className="hero-v2-noise" aria-hidden="true"/><div className="hero-v2-aura" aria-hidden="true"/><div className="hero-v3-grid" aria-hidden="true"/><div className="hero-v3-cursor-glow" aria-hidden="true"/><div className="hero-v31-grid-reactive" aria-hidden="true"/><div className="hero-v2-container container"><motion.div className="hero-v2-topline" initial={reduce?false:{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.7}}><span className="hero-v2-line"/><span>ESTÚDIO DIGITAL · PORTUGAL</span><span className="hero-v2-topright">WE BUILD WHAT'S NEXT <ArrowUpRight size={14}/></span></motion.div><div className="hero-v2-stage"><motion.div className="hero-v2-content" initial={reduce?false:{opacity:0,y:42}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.12}}><div className="hero-v2-overline"><span className="status-dot"/><span>ESTÚDIO CRIATIVO & TECNOLÓGICO</span><span className="hero-v32-overline-rule"/></div><h1>Tecnologia<br/><span className="hero-v2-outline">avançada.</span><br/><span className="hero-v2-highlight">Soluções</span> simples<span className="hero-v2-period">.</span></h1><div className="hero-v2-bottom"><p>Transformamos ideias ambiciosas em experiências digitais que fazem os negócios avançar. Websites, software, automação e aplicações — pensados para si.</p><div className="hero-v2-buttons"><MagneticLink className="hero-v2-primary" href="#solucoes">Explorar soluções <ArrowUpRight size={19}/></MagneticLink><MagneticLink className="hero-v2-secondary" href="#contacto">Falar sobre um projeto <ArrowRight size={17}/></MagneticLink></div></div></motion.div><motion.div className="hero-v2-sculpture" initial={reduce?false:{opacity:0,scale:.75,rotate:-15}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1.3,delay:.3,type:'spring',bounce:.12}}  aria-hidden="true"><div className="hero-v31-sculpture-tilt"><div className="hero-v2-sculpture-halo"/><div className="hero-v3-orbit orbit-one"/><div className="hero-v3-orbit orbit-two"/><div className="hero-v3-spark spark-one"/><div className="hero-v3-spark spark-two"/><div className="hero-v3-spark spark-three"/><div className="hero-v2-ring ring-a"/><div className="hero-v2-ring ring-b"/><div className="hero-v2-ring ring-c"/><div className="hero-v2-core"><div className="hero-v2-core-inner"/></div><div className="hero-v2-orb orb-a"/><div className="hero-v2-orb orb-b"/><div className="hero-v2-orb orb-c"/></div></motion.div></div><nav className="hero-v32-service-bar" aria-label="Explorar as áreas da Minera"><div className="hero-v32-bar-heading"><span className="hero-v32-bar-signal"/><span>O QUE FAZEMOS</span><span className="hero-v32-bar-count">01 — 04</span></div><div className="hero-v32-service-links">{heroServices.map(s=><a href={`#${s.id}`} className="hero-v32-service-link" key={s.id}><span className="hero-v32-service-number">{s.number}</span><span className="hero-v32-service-title">{s.title}</span><ArrowUpRight size={16} strokeWidth={1.6}/></a>)}</div></nav><div className="hero-v2-footer"><a href="#solucoes" className="hero-v2-scroll"><span className="hero-v2-scroll-icon">↓</span> DESLIZE PARA EXPLORAR</a><div className="hero-v2-footer-right">ESTRATÉGIA <span>✳</span> DESIGN <span>✳</span> TECNOLOGIA</div></div></div><div className="hero-v2-edge" aria-hidden="true">M / 001 — DIGITAL EXPERIENCES</div></section>}

// v0.4.2 — One persistent SVG object. The SAME three ring paths become the browser.
// No duplicate orbit overlays, no switching between separate visual elements.
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(n:number)=>{const t=clamp(n);return t*t*(3-2*t)};
const POINTS=128;
type Pt=[number,number];
function orbitGeometry(i:number):Pt[]{
  const angle=[-.48,.81,1.58][i],rx=[118,105,90][i],ry=[47,59,76][i];
  return Array.from({length:POINTS},(_,j)=>{
    const t=2*Math.PI*j/POINTS;
    const x=rx*Math.cos(t),y=ry*Math.sin(t);
    return [x*Math.cos(angle)-y*Math.sin(angle),x*Math.sin(angle)+y*Math.cos(angle)];
  });
}
function browserGeometry(i:number):Pt[]{
  // Each ring becomes a DIFFERENT, still-closed outline within the browser motif.
  const w=[115,108,79][i],h=[73,60,35][i],cy=[0,4,17][i];
  return Array.from({length:POINTS},(_,j)=>{
    const t=(j/POINTS)*4;
    let x:number,y:number;
    if(t<1){x=-w+2*w*t;y=-h}
    else if(t<2){x=w;y=-h+2*h*(t-1)}
    else if(t<3){x=w-2*w*(t-2);y=h}
    else{x=-w;y=h-2*h*(t-3)}
    return [x,y+cy];
  });
}
const orbitalSources=[0,1,2].map(orbitGeometry);
const orbitalTargets=[0,1,2].map(browserGeometry);
function pathAt(i:number,p:number){
  // First let the real ring curves uncoil; then reshape their geometry into the browser.
  const t=smooth(p);
  return orbitalSources[i].map(([x,y],j)=>{
    const [tx,ty]=orbitalTargets[i][j];
    return `${j?'L':'M'}${(x+(tx-x)*t).toFixed(2)} ${ (y+(ty-y)*t).toFixed(2)}`;
  }).join(' ')+' Z';
}
function OrbitalJourney(){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=root.current;
    const hero=document.getElementById('inicio');
    const services=document.getElementById('solucoes');
    if(!el||!hero||!services)return;
    const desktop=window.matchMedia('(min-width:1100px)');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    const paths=Array.from(el.querySelectorAll<SVGPathElement>('[data-orbit]'));
    const glows=Array.from(el.querySelectorAll<SVGPathElement>('[data-orbit-glow]'));
    let raf=0;
    function update(){
      raf=0;
      if(!desktop.matches||reduced.matches){document.documentElement.classList.remove('orbital-live');return}
      document.documentElement.classList.add('orbital-live');
      const y=window.scrollY,vh=window.innerHeight,vw=window.innerWidth;
      // Long, reversible transition. The rings remain on screen beyond the Hero.
      const start=vh*.18;
      const end=Math.max(start+vh*1.6,services.offsetTop+vh*.72);
      const p=clamp((y-start)/(end-start));
      const travel=smooth(p);
      const maxWidth=Math.min(1480,vw-112);
      const left=(vw-maxWidth)/2;
      const x0=vw*.73,y0=vh*.48;
      const x1=left+112,y1=vh*.47;
      el.style.left=`${x0+(x1-x0)*travel}px`;
      el.style.top=`${y0+(y1-y0)*travel}px`;
      el.style.transform=`translate(-50%,-50%) scale(${1-.43*travel})`;
      const software=document.getElementById('software');
      const disappear=software?clamp((y-(software.offsetTop+vh*.2))/(vh*.7)):0;
      el.style.opacity=String(1-disappear);
      el.style.setProperty('--orbit-volume',String(1-smooth(p*1.45)));
      paths.forEach((path,i)=>path.setAttribute('d',pathAt(i,p)));
      glows.forEach((path,i)=>path.setAttribute('d',pathAt(i,p)));
    }
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(update)};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    update();
    return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);if(raf)cancelAnimationFrame(raf);document.documentElement.classList.remove('orbital-live')};
  },[]);
  return <div className="orbital-continuous" ref={root} aria-hidden="true"><svg viewBox="-145 -110 290 220" fill="none" xmlns="http://www.w3.org/2000/svg"><defs>
    <linearGradient id="mineraOrbitMetal" x1="-125" y1="-100" x2="110" y2="105" gradientUnits="userSpaceOnUse"><stop stopColor="#A9D0FF"/><stop offset=".23" stopColor="#4078DC"/><stop offset=".52" stopColor="#15366E"/><stop offset=".75" stopColor="#78ABFF"/><stop offset="1" stopColor="#2854B1"/></linearGradient>
    <linearGradient id="mineraOrbitLight" x1="-120" y1="-80" x2="120" y2="95" gradientUnits="userSpaceOnUse"><stop stopColor="#C7E6FF"/><stop offset=".5" stopColor="#76A7FF"/><stop offset="1" stopColor="#396BE2"/></linearGradient>
    <radialGradient id="mineraOrbitAura"><stop stopColor="#3679E8" stopOpacity=".23"/><stop offset="1" stopColor="#3679E8" stopOpacity="0"/></radialGradient>
  </defs><ellipse className="orbital-continuous-aura" rx="141" ry="106" fill="url(#mineraOrbitAura)"/>
  {[0,1,2].map(i=><g key={i}><path data-orbit-glow={i} d={pathAt(i,0)} stroke="url(#mineraOrbitMetal)" strokeWidth={18-i*3} opacity={.8-i*.12} strokeLinecap="round" strokeLinejoin="round"/><path data-orbit={i} d={pathAt(i,0)} stroke="url(#mineraOrbitLight)" strokeWidth={3.3-i*.4} opacity={1-i*.1} strokeLinecap="round" strokeLinejoin="round"/></g>)}
  </svg><span className="orbital-continuous-caption">MINERA / DIGITAL FLOW</span></div>;
}
function ServiceVisual({id}:{id:string}){if(id==='websites')return <div className="service-art website-art"><div className="mock-browser"><div className="mock-top"><span>● ● ●</span><span>atelier.pt</span><span>↗</span></div><div className="mock-content"><span>ATELIER / DESIGN & ARQUITETURA</span><strong>Espaços com<br/><em>identidade.</em></strong><div className="mock-image"><div className="architecture"/></div><span className="mock-link">CONHECER PROJETOS ↗</span></div></div><div className="art-badge">DESIGN QUE CONVERTE <MoveUpRight size={13}/></div></div>;
if(id==='software')return <div className="service-art software-art"><div className="software-panel"><div className="software-heading"><span>◈ &nbsp; Painel de gestão</span><span>● Em dia</span></div><div className="software-stats"><div><small>Pedidos ativos</small><strong>32</strong></div><div><small>Clientes</small><strong>148</strong></div><div><small>Concluídos</small><strong>86%</strong></div></div><div className="software-table"><div><span>PROJETO</span><span>ESTADO</span></div><div><span>Encomenda #1042</span><b>Em curso</b></div><div><span>Encomenda #1041</span><b className="done">Concluído</b></div><div><span>Encomenda #1040</span><b>Em curso</b></div></div></div></div>;
if(id==='automacao')return <div className="service-art automation-art"><div className="flow-node"><Mail size={19}/><span>Novo pedido</span></div><div className="flow-connector"><span/></div><div className="flow-node flow-center"><Workflow size={20}/><span>Processar</span></div><div className="flow-connector"><span/></div><div className="flow-node"><Check size={19}/><span>Organizado</span></div><div className="flow-caption">UM PROCESSO. ZERO COMPLICAÇÕES.</div></div>;
return <div className="service-art apps-art"><div className="phone phone-back"><div className="phone-notch"/><div className="phone-label">MINERA</div><div className="phone-card faded"/><div className="phone-card faded short"/></div><div className="phone phone-front"><div className="phone-notch"/><div className="phone-label">A sua app.</div><div className="phone-greeting">Bom dia, Ana 👋</div><div className="phone-card"><small>PRÓXIMA RESERVA</small><strong>Quinta-feira, 15:30</strong><span>Confirmada ✓</span></div><div className="phone-card short"/><div className="phone-card short"/></div></div>}
function Services(){return <section className="services section" id="solucoes"><div className="container"><div className="section-intro"><div className="section-tag">01 / O QUE FAZEMOS</div><h2>Problemas reais.<br/><span>Soluções que funcionam.</span></h2><p>Não complicamos o que pode ser simples. Descubra como podemos ajudar a sua empresa a crescer.</p></div><div className="services-list">{offerings.map((o,i)=><motion.article key={o.id} className={`service-row ${i%2?'reverse':''}`} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.55}}><div className="service-copy"><div className="service-index"><span>{o.number} / 04</span><span>{o.label}</span></div><h3>{o.title}</h3><p>{o.desc}</p><div className="service-tags">{o.tags.map(t=><span key={t}>{t}</span>)}</div><a href="#contacto" className="text-link">Vamos falar sobre isto <ArrowUpRight size={17}/></a></div><ServiceVisual id={o.id}/></motion.article>)}</div></div></section>}
function Projects(){return <section id="projetos" className="section projects"><div className="container projects-layout"><div><div className="section-tag">02 / PROJETOS</div><h2>Boas ideias merecem<br/><span>boa execução.</span></h2><p>Estamos a preparar a apresentação dos nossos trabalhos. Aqui vais encontrar projetos reais, explicados de forma simples: o desafio, a solução e o resultado.</p><a className="text-link" href="#contacto">Tem um projeto em mente? <ArrowUpRight size={17}/></a></div><div className="projects-preview"><span>EM CONSTRUÇÃO</span><div className="project-symbol">M<span>.</span></div><strong>Os próximos projetos<br/>começam aqui.</strong><small>Portefólio Minera · Brevemente</small></div></div></section>}
function Process(){return <section className="section process" id="processo"><div className="container"><div className="section-tag">03 / COMO TRABALHAMOS</div><h2>Sem complicações.<br/><span>Do início ao fim.</span></h2><div className="process-grid">{[{n:'01',t:'Ouvimos',d:'Percebemos o seu negócio e o que precisa realmente de resolver.'},{n:'02',t:'Planeamos',d:'Desenhamos uma solução clara, com objetivos e etapas definidas.'},{n:'03',t:'Construímos',d:'Transformamos o plano numa experiência digital funcional.'},{n:'04',t:'Acompanhamos',d:'Testamos, entregamos e ajudamos a evoluir a solução.'}].map(s=><div className="process-step" key={s.n}><span>{s.n}</span><h3>{s.t}</h3><p>{s.d}</p></div>)}</div></div></section>}
function Contact(){return <section id="contacto" className="contact section"><div className="contact-light"/><div className="container contact-inner"><div className="section-tag">04 / VAMOS CONVERSAR</div><h2>O próximo passo<br/>começa com uma <span>conversa.</span></h2><p>Tem uma ideia, um desafio ou um projeto em mente? Conte-nos o que precisa. Sem termos complicados.</p><a className="btn btn-primary" href="mailto:contacto@exemplo.pt?subject=Projeto%20Minera" onClick={(e)=>{e.preventDefault();alert('O contacto profissional da Minera será adicionado antes do lançamento.');}}>Vamos falar <ArrowUpRight size={18}/></a><div className="contact-note">Contacto profissional a disponibilizar no lançamento.</div></div></section>}
function Footer(){return <footer className="footer"><div className="container footer-inner"><Brand/><span>TECNOLOGIA PARA NEGÓCIOS REAIS.</span><span>© {new Date().getFullYear()} MINERA · WEBSITE EM DESENVOLVIMENTO</span><a href="#inicio" aria-label="Voltar ao início"><ExternalLink size={16}/></a></div></footer>}
export default function App(){return <><Header/><OrbitalJourney/><main><Hero/><Services/><Projects/><Process/><Contact/></main><Footer/></>}
