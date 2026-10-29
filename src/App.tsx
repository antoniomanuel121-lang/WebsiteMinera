import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, Menu, X, Globe2, Layers3, Workflow, Smartphone, MoveUpRight, Check, Mail, ExternalLink } from 'lucide-react';

const offerings = [
  {number:'01', label:'PRESENÇA DIGITAL', title:'Websites que deixam marca.', desc:'A primeira impressão do seu negócio merece mais do que um template. Criamos experiências digitais que transmitem confiança e convidam à ação.', tags:['Websites institucionais','Lojas online','Experiências interativas'], icon:Globe2, id:'websites'},
  {number:'02', label:'SOFTWARE À MEDIDA', title:'Menos complicações. Mais controlo.', desc:'Encomendas, clientes e processos num só lugar. Desenvolvemos ferramentas que se adaptam à forma como a sua empresa trabalha.', tags:['Gestão empresarial','Portais de clientes','Plataformas SaaS'], icon:Layers3, id:'software'},
  {number:'03', label:'AUTOMAÇÃO INTELIGENTE', title:'O tempo da sua equipa vale mais.', desc:'Transformamos tarefas repetitivas em processos simples e automáticos. Menos trabalho manual, mais espaço para fazer crescer o negócio.', tags:['Automatização','Integrações','Inteligência artificial'], icon:Workflow, id:'automacao'},
  {number:'04', label:'PRODUTOS DIGITAIS', title:'Da ideia ao ecrã.', desc:'Tem uma ideia para uma aplicação? Ajudamos a transformá-la num produto intuitivo, útil e pronto para evoluir.', tags:['Aplicações móveis','MVPs','Produtos digitais'], icon:Smartphone, id:'apps'}
];


/* Persistent Digital Core: a single set of animated strokes morphs through all four services.
   It is separate from the original Hero rings, which are intentionally unchanged. */
type Point = [number, number];
const digitalShapes: Point[][][] = [
  // Original Digital Core.
  [
    [[50,7],[76,17],[93,44],[83,77],[50,94],[18,78],[7,48],[22,19],[50,7]],
    [[50,7],[50,94],[7,48],[93,44],[50,7],[18,78],[83,77],[50,94],[50,7]],
    [[22,19],[76,17],[83,77],[18,78],[22,19],[50,46],[93,44],[50,94],[22,19]],
    [[18,78],[50,7],[83,77],[18,78],[50,94],[93,44],[7,48],[50,7],[18,78]],
    [[50,7],[22,19],[7,48],[18,78],[50,94],[83,77],[93,44],[76,17],[50,7]]
  ],
  // Website: unmistakable browser chrome, URL field, structured page content.
  [
    [[5,17],[95,17],[95,84],[5,84],[5,17],[5,17],[5,17],[5,17],[5,17]],
    [[5,34],[95,34],[95,34],[95,34],[95,34],[95,34],[95,34],[95,34],[95,34]],
    [[12,43],[56,43],[56,52],[12,52],[12,43],[12,58],[56,58],[56,65],[12,65]],
    [[65,43],[87,43],[87,72],[65,72],[65,43],[65,43],[65,43],[65,43],[65,43]],
    [[12,75],[43,75],[43,75],[43,75],[43,75],[43,75],[43,75],[43,75],[43,75]]
  ],
  // Software: many workstreams converge into one central command hub.
  [
    [[8,11],[30,11],[30,30],[8,30],[8,11],[8,11],[8,11],[8,11],[8,11]],
    [[70,11],[92,11],[92,30],[70,30],[70,11],[70,11],[70,11],[70,11],[70,11]],
    [[8,70],[30,70],[30,89],[8,89],[8,70],[8,70],[8,70],[8,70],[8,70]],
    [[70,70],[92,70],[92,89],[70,89],[70,70],[70,70],[70,70],[70,70],[70,70]],
    [[31,36],[69,36],[69,65],[31,65],[31,36],[31,36],[31,36],[31,36],[31,36]]
  ],
  // AI: recognisable brain-like two-hemisphere neural outline.
  [
    [[50,18],[40,11],[26,15],[19,25],[13,27],[9,41],[14,54],[10,65],[19,76]],
    [[50,18],[60,11],[74,15],[81,25],[87,27],[91,41],[86,54],[90,65],[81,76]],
    [[19,76],[27,86],[40,86],[50,80],[50,18],[50,35],[50,51],[50,67],[50,80]],
    [[81,76],[73,86],[60,86],[50,80],[50,18],[50,35],[50,51],[50,67],[50,80]],
    [[20,43],[35,36],[45,46],[30,61],[43,73],[58,64],[73,73],[80,49],[64,35]]
  ],
  // Original app outline retained.
  [
    [[29,6],[71,6],[77,12],[77,88],[71,94],[29,94],[23,88],[23,12],[29,6]],
    [[42,15],[58,15],[58,15],[58,15],[58,15],[58,15],[58,15],[58,15],[58,15]],
    [[33,32],[67,32],[67,59],[33,59],[33,32],[34,70],[66,70],[66,78],[34,78]],
    [[33,23],[67,23],[67,23],[67,23],[67,23],[67,23],[67,23],[67,23],[67,23]],
    [[50,85],[50,85],[50,85],[50,85],[50,85],[50,85],[50,85],[50,85],[50,85]]
  ]
];
const clamp01=(n:number)=>Math.min(1,Math.max(0,n));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
function DigitalCore(){
  const [stage,setStage]=useState(0);
  const [visible,setVisible]=useState(false);
  const [heroMode,setHeroMode]=useState(true);
  const reduce=useReducedMotion();
  useEffect(()=>{
    let raf=0;
    const update=()=>{
      raf=0;
      const hero=document.getElementById('inicio');
      const sections=['websites','software','automacao','apps'].map(id=>document.getElementById(id));
      const services=document.getElementById('solucoes');
      if(!hero||!services||sections.some(x=>!x))return;
      const y=window.scrollY+window.innerHeight*.52;
      const heroEnd=hero.getBoundingClientRect().bottom+window.scrollY;
      const centers=sections.map(el=>{const r=el!.getBoundingClientRect();return r.top+window.scrollY+r.height*.5});
      // Hold each finished icon through most of its section; morph near the next section.
      let progress=0;
      const first=centers[0];
      const firstStart=heroEnd-window.innerHeight*.12;
      if(y<first){progress=clamp01((y-firstStart)/(first-firstStart||1));}
      else {
        progress=4;
        for(let i=0;i<3;i++){
          const a=centers[i], b=centers[i+1], gap=b-a;
          if(y<b){
            const transitionStart=a+gap*.62;
            progress=i+1+clamp01((y-transitionStart)/(b-transitionStart||1));
            break;
          }
        }
      }
      setStage(progress);
      setHeroMode(window.scrollY<heroEnd-window.innerHeight*.25);
      const last=sections[3]!;
      const lastEnd=last.getBoundingClientRect().bottom+window.scrollY;
      setVisible(window.innerWidth>=1100 && y<lastEnd+window.innerHeight*.12);

    };
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);cancelAnimationFrame(raf)};
  },[]);
  const index=Math.min(3,Math.floor(stage)), t=reduce?Math.round(stage-index):stage-index;
  const paths=digitalShapes[index].map((points,i)=>{
    const next=digitalShapes[index+1][i];
    return 'M '+points.map((p,j)=>{
      const x=lerp(p[0],next[j][0],t), y=lerp(p[1],next[j][1],t);
      return `${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' L ');
  });
  const aiNodes: Point[]=[[10,24],[35,12],[62,26],[88,11],[91,52],[73,79],[46,90],[13,73],[38,47]];
  const aiAlpha=clamp01(1-Math.abs(stage-3)*1.6);
  return <div className={`digital-core ${visible?'digital-core-visible':''} ${heroMode?'digital-core-hero':''}`} aria-hidden="true">
    <div className="digital-core-aura"/>
    <div className="digital-core-orbit digital-core-orbit-a"/>
    <div className="digital-core-orbit digital-core-orbit-b"/>
    <span className="digital-core-spark digital-core-spark-one"/><span className="digital-core-spark digital-core-spark-two"/>
    <svg viewBox="0 0 100 100" className="digital-core-svg">
      <defs><linearGradient id="digital-core-stroke" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#A9D6FF"/><stop offset=".5" stopColor="#478BFF"/><stop offset="1" stopColor="#2353B7"/></linearGradient></defs>
      {paths.map((d,i)=><path key={i} d={d} className={i===0?'digital-core-primary':'digital-core-trace'} fill="none" stroke="url(#digital-core-stroke)" strokeWidth={i===0?1.9:1.1} strokeLinejoin="round" strokeLinecap="round" opacity={1-i*.1}/>)}
      <g className="digital-core-web-details" style={{opacity:clamp01(1-Math.abs(stage-1)*3)}}>
        <circle cx="12" cy="25" r="1.2"/><circle cx="16" cy="25" r="1.2"/><circle cx="20" cy="25" r="1.2"/>
        <rect x="26" y="21" width="60" height="9" rx="3" fill="#152B50" stroke="#80B6FF" strokeWidth=".65"/>
        <text x="31" y="27.1" fontSize="4.4" letterSpacing=".25" fill="#A8D5FF">www.</text>
        <path d="M45 26 H54 M56 26 H61 M63 26 H72 M74 26 H80" stroke="#91BAF7" strokeWidth="1.5" strokeLinecap="round" opacity=".75"/>
      </g>
      <g className="digital-core-software-details" style={{opacity:clamp01(1-Math.abs(stage-2)*3)}}>
        <path d="M30 20 L50 40 L70 20 M30 79 L50 61 L70 79" stroke="#82BAFF" strokeWidth="1.2" strokeDasharray="3 2" fill="none"/>
        <path d="M43 45 H57 M43 50 H55 M43 55 H59" stroke="#C2E7FF" strokeWidth="1.7" strokeLinecap="round"/>
        <circle cx="50" cy="50" r="17" fill="none" stroke="#5395FF" strokeWidth=".6" opacity=".4"/>
        <circle cx="50" cy="20" r="1.9" className="digital-core-data-dot"/><circle cx="80" cy="50" r="1.9" className="digital-core-data-dot delay-one"/>
        <circle cx="50" cy="79" r="1.9" className="digital-core-data-dot delay-two"/><circle cx="20" cy="50" r="1.9" className="digital-core-data-dot delay-three"/>
      </g>
      <g className="digital-core-ai-details" style={{opacity:clamp01(1-Math.abs(stage-3)*3)}}>
        <path d="M20 43 L35 36 L45 46 L30 61 L43 73 M80 49 L64 35 L58 64 L73 73 M35 36 L64 35 M45 46 L58 64" stroke="#80BBFF" strokeWidth=".85" fill="none" opacity=".7"/>
        {([[20,43],[35,36],[45,46],[30,61],[43,73],[58,64],[73,73],[80,49],[64,35]] as Point[]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%3===0?2.2:1.4} fill="#BCE5FF" className="digital-core-neuron"/>)}
        <path d="M50 19 V80" stroke="#C4E9FF" strokeWidth=".9" strokeDasharray="2 4" opacity=".5"/>
      </g>
      <path d={paths[4]} className="digital-core-energy" fill="none" stroke="#C8E8FF" strokeWidth="1.5" strokeDasharray="2 14" strokeLinecap="round"/>
      {aiNodes.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r={i%3===0?2.2:1.6} fill="#C2E8FF" opacity={aiAlpha} className="digital-core-neuron"/>)}
      <circle cx="50" cy="50" r="2.2" fill="#A6D2FF" opacity={Math.max(0,1-stage*2)}/>
    </svg>
    <span className="digital-core-caption">{['DIGITAL CORE','WEB','SOFTWARE','IA','APPS'][Math.round(stage)]}</span>
  </div>;
}

function Brand(){return <a className="brand" href="#inicio" aria-label="Minera, voltar ao início">MINERA<span>.</span></a>}
function Header(){const [open,setOpen]=useState(false);return <header className="header"><div className="nav-shell"><Brand/><nav className={open?'nav-links open':'nav-links'} aria-label="Navegação principal"><a href="#solucoes" onClick={()=>setOpen(false)}>Soluções</a><a href="#projetos" onClick={()=>setOpen(false)}>Projetos</a><a href="#processo" onClick={()=>setOpen(false)}>Como trabalhamos</a><a className="mobile-contact" href="#contacto" onClick={()=>setOpen(false)}>Fale connosco</a></nav><a className="nav-cta" href="#contacto">Vamos conversar <ArrowUpRight size={16}/></a><button className="menu-button" aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>}
const heroServices = [{number:'01',title:'Websites',id:'websites'},{number:'02',title:'Software',id:'software'},{number:'03',title:'IA & Automação',id:'automacao'},{number:'04',title:'Aplicações',id:'apps'}];
function MagneticLink({className,href,children}:{className:string;href:string;children:React.ReactNode}){const ref=useRef<HTMLAnchorElement>(null);const reduce=useReducedMotion();return <a ref={ref} className={`${className} minera-magnetic`} href={href} onPointerMove={e=>{if(reduce||e.pointerType==='touch')return;const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);el.style.setProperty('--mag-x',`${dx*.16}px`);el.style.setProperty('--mag-y',`${dy*.22}px`);el.style.setProperty('--shine-x',`${e.clientX-r.left}px`);}} onPointerLeave={()=>{const el=ref.current;if(!el)return;el.style.setProperty('--mag-x','0px');el.style.setProperty('--mag-y','0px')}}>{children}</a>}
function Hero(){const reduce=useReducedMotion();const heroRef=useRef<HTMLElement>(null);return <section id="inicio" className="hero hero-v2" ref={heroRef} onPointerMove={e=>{if(reduce||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;const el=e.currentTarget;el.style.setProperty('--cursor-x',`${x}px`);el.style.setProperty('--cursor-y',`${y}px`);el.style.setProperty('--tilt-x',`${((y/r.height)-.5)*-10}deg`);el.style.setProperty('--tilt-y',`${((x/r.width)-.5)*10}deg`);el.style.setProperty('--orb-x',`${((x/r.width)-.5)*25}px`);el.style.setProperty('--orb-y',`${((y/r.height)-.5)*25}px`);}} onPointerLeave={e=>{const el=e.currentTarget;el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg');el.style.setProperty('--orb-x','0px');el.style.setProperty('--orb-y','0px');}}><div className="hero-v2-noise" aria-hidden="true"/><div className="hero-v2-aura" aria-hidden="true"/><div className="hero-v3-grid" aria-hidden="true"/><div className="hero-v3-cursor-glow" aria-hidden="true"/><div className="hero-v31-grid-reactive" aria-hidden="true"/><div className="hero-v2-container container"><motion.div className="hero-v2-topline" initial={reduce?false:{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.7}}><span className="hero-v2-line"/><span>ESTÚDIO DIGITAL · PORTUGAL</span><span className="hero-v2-topright">WE BUILD WHAT'S NEXT <ArrowUpRight size={14}/></span></motion.div><div className="hero-v2-stage"><motion.div className="hero-v2-content" initial={reduce?false:{opacity:0,y:42}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.12}}><div className="hero-v2-overline"><span className="status-dot"/><span>ESTÚDIO CRIATIVO & TECNOLÓGICO</span><span className="hero-v32-overline-rule"/></div><h1>Tecnologia<br/><span className="hero-v2-outline">avançada.</span><br/><span className="hero-v2-highlight">Soluções</span> simples<span className="hero-v2-period">.</span></h1><div className="hero-v2-bottom"><p>Transformamos ideias ambiciosas em experiências digitais que fazem os negócios avançar. Websites, software, automação e aplicações — pensados para si.</p><div className="hero-v2-buttons"><MagneticLink className="hero-v2-primary" href="#solucoes">Explorar soluções <ArrowUpRight size={19}/></MagneticLink><MagneticLink className="hero-v2-secondary" href="#contacto">Falar sobre um projeto <ArrowRight size={17}/></MagneticLink></div></div></motion.div><motion.div className="hero-v2-sculpture" initial={reduce?false:{opacity:0,scale:.75,rotate:-15}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1.3,delay:.3,type:'spring',bounce:.12}}  aria-hidden="true"><div className="hero-v31-sculpture-tilt"><div className="hero-v2-sculpture-halo"/><div className="hero-v3-orbit orbit-one"/><div className="hero-v3-orbit orbit-two"/><div className="hero-v3-spark spark-one"/><div className="hero-v3-spark spark-two"/><div className="hero-v3-spark spark-three"/><div className="hero-v2-ring ring-a"/><div className="hero-v2-ring ring-b"/><div className="hero-v2-ring ring-c"/><div className="hero-v2-core"><div className="hero-v2-core-inner"/></div><div className="hero-v2-orb orb-a"/><div className="hero-v2-orb orb-b"/><div className="hero-v2-orb orb-c"/></div></motion.div></div><nav className="hero-v32-service-bar" aria-label="Explorar as áreas da Minera"><div className="hero-v32-bar-heading"><span className="hero-v32-bar-signal"/><span>O QUE FAZEMOS</span><span className="hero-v32-bar-count">01 — 04</span></div><div className="hero-v32-service-links">{heroServices.map(s=><a href={`#${s.id}`} className="hero-v32-service-link" key={s.id}><span className="hero-v32-service-number">{s.number}</span><span className="hero-v32-service-title">{s.title}</span><ArrowUpRight size={16} strokeWidth={1.6}/></a>)}</div></nav><div className="hero-v2-footer"><a href="#solucoes" className="hero-v2-scroll"><span className="hero-v2-scroll-icon">↓</span> DESLIZE PARA EXPLORAR</a><div className="hero-v2-footer-right">ESTRATÉGIA <span>✳</span> DESIGN <span>✳</span> TECNOLOGIA</div></div></div><div className="hero-v2-edge" aria-hidden="true">M / 001 — DIGITAL EXPERIENCES</div></section>}
function ServiceVisual({id}:{id:string}){if(id==='websites')return <div className="service-art website-art"><div className="mock-browser"><div className="mock-top"><span>● ● ●</span><span>atelier.pt</span><span>↗</span></div><div className="mock-content"><span>ATELIER / DESIGN & ARQUITETURA</span><strong>Espaços com<br/><em>identidade.</em></strong><div className="mock-image"><div className="architecture"/></div><span className="mock-link">CONHECER PROJETOS ↗</span></div></div><div className="art-badge">DESIGN QUE CONVERTE <MoveUpRight size={13}/></div></div>;
if(id==='software')return <div className="service-art software-art"><div className="software-panel"><div className="software-heading"><span>◈ &nbsp; Painel de gestão</span><span>● Em dia</span></div><div className="software-stats"><div><small>Pedidos ativos</small><strong>32</strong></div><div><small>Clientes</small><strong>148</strong></div><div><small>Concluídos</small><strong>86%</strong></div></div><div className="software-table"><div><span>PROJETO</span><span>ESTADO</span></div><div><span>Encomenda #1042</span><b>Em curso</b></div><div><span>Encomenda #1041</span><b className="done">Concluído</b></div><div><span>Encomenda #1040</span><b>Em curso</b></div></div></div></div>;
if(id==='automacao')return <div className="service-art automation-art"><div className="flow-node"><Mail size={19}/><span>Novo pedido</span></div><div className="flow-connector"><span/></div><div className="flow-node flow-center"><Workflow size={20}/><span>Processar</span></div><div className="flow-connector"><span/></div><div className="flow-node"><Check size={19}/><span>Organizado</span></div><div className="flow-caption">UM PROCESSO. ZERO COMPLICAÇÕES.</div></div>;
return <div className="service-art apps-art"><div className="phone phone-back"><div className="phone-notch"/><div className="phone-label">MINERA</div><div className="phone-card faded"/><div className="phone-card faded short"/></div><div className="phone phone-front"><div className="phone-notch"/><div className="phone-label">A sua app.</div><div className="phone-greeting">Bom dia, Ana 👋</div><div className="phone-card"><small>PRÓXIMA RESERVA</small><strong>Quinta-feira, 15:30</strong><span>Confirmada ✓</span></div><div className="phone-card short"/><div className="phone-card short"/></div></div>}
function Services(){return <section className="services section" id="solucoes"><div className="container"><div className="section-intro"><div className="section-tag">01 / O QUE FAZEMOS</div><h2>Problemas reais.<br/><span>Soluções que funcionam.</span></h2><p>Não complicamos o que pode ser simples. Descubra como podemos ajudar a sua empresa a crescer.</p></div><div className="services-list">{offerings.map((o,i)=><motion.article id={o.id} key={o.id} className={`service-row ${i%2?'reverse':''}`} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.55}}><div className="service-copy"><div className="service-index"><span>{o.number} / 04</span><span>{o.label}</span></div><h3>{o.title}</h3><p>{o.desc}</p><div className="service-tags">{o.tags.map(t=><span key={t}>{t}</span>)}</div><a href="#contacto" className="text-link">Vamos falar sobre isto <ArrowUpRight size={17}/></a></div><ServiceVisual id={o.id}/></motion.article>)}</div></div></section>}
function Projects(){return <section id="projetos" className="section projects"><div className="container projects-layout"><div><div className="section-tag">02 / PROJETOS</div><h2>Boas ideias merecem<br/><span>boa execução.</span></h2><p>Estamos a preparar a apresentação dos nossos trabalhos. Aqui vais encontrar projetos reais, explicados de forma simples: o desafio, a solução e o resultado.</p><a className="text-link" href="#contacto">Tem um projeto em mente? <ArrowUpRight size={17}/></a></div><div className="projects-preview"><span>EM CONSTRUÇÃO</span><div className="project-symbol">M<span>.</span></div><strong>Os próximos projetos<br/>começam aqui.</strong><small>Portefólio Minera · Brevemente</small></div></div></section>}
function Process(){return <section className="section process" id="processo"><div className="container"><div className="section-tag">03 / COMO TRABALHAMOS</div><h2>Sem complicações.<br/><span>Do início ao fim.</span></h2><div className="process-grid">{[{n:'01',t:'Ouvimos',d:'Percebemos o seu negócio e o que precisa realmente de resolver.'},{n:'02',t:'Planeamos',d:'Desenhamos uma solução clara, com objetivos e etapas definidas.'},{n:'03',t:'Construímos',d:'Transformamos o plano numa experiência digital funcional.'},{n:'04',t:'Acompanhamos',d:'Testamos, entregamos e ajudamos a evoluir a solução.'}].map(s=><div className="process-step" key={s.n}><span>{s.n}</span><h3>{s.t}</h3><p>{s.d}</p></div>)}</div></div></section>}
function Contact(){return <section id="contacto" className="contact section"><div className="contact-light"/><div className="container contact-inner"><div className="section-tag">04 / VAMOS CONVERSAR</div><h2>O próximo passo<br/>começa com uma <span>conversa.</span></h2><p>Tem uma ideia, um desafio ou um projeto em mente? Conte-nos o que precisa. Sem termos complicados.</p><a className="btn btn-primary" href="mailto:contacto@exemplo.pt?subject=Projeto%20Minera" onClick={(e)=>{e.preventDefault();alert('O contacto profissional da Minera será adicionado antes do lançamento.');}}>Vamos falar <ArrowUpRight size={18}/></a><div className="contact-note">Contacto profissional a disponibilizar no lançamento.</div></div></section>}
function Footer(){return <footer className="footer"><div className="container footer-inner"><Brand/><span>TECNOLOGIA PARA NEGÓCIOS REAIS.</span><span>© {new Date().getFullYear()} MINERA · WEBSITE EM DESENVOLVIMENTO</span><a href="#inicio" aria-label="Voltar ao início"><ExternalLink size={16}/></a></div></footer>}
export default function App(){return <><Header/><DigitalCore/><main><Hero/><Services/><Projects/><Process/><Contact/></main><Footer/></>}
