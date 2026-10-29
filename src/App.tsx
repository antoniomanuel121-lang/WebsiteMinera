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
  // Living seed: faceted energy crystal with inner diagonals.
  [
    [[50,5],[79,19],[94,49],[79,81],[50,95],[21,81],[6,49],[21,19],[50,5]],
    [[50,5],[50,95],[6,49],[94,49],[50,5],[21,81],[79,81],[50,95],[50,5]],
    [[21,19],[79,19],[79,81],[21,81],[21,19],[50,49],[94,49],[50,95],[21,19]],
    [[50,5],[79,19],[50,49],[21,19],[50,5],[79,81],[50,49],[21,81],[50,5]],
    [[6,49],[21,19],[50,49],[79,19],[94,49],[79,81],[50,49],[21,81],[6,49]]
  ],
  // Website: recognisable browser, header dots, hero card, text and sidebar.
  [
    [[7,14],[93,14],[93,86],[7,86],[7,14],[7,14],[7,14],[7,14],[7,14]],
    [[7,30],[93,30],[93,30],[93,30],[93,30],[93,30],[93,30],[93,30],[93,30]],
    [[14,41],[57,41],[57,70],[14,70],[14,41],[14,41],[14,41],[14,41],[14,41]],
    [[65,41],[85,41],[85,47],[65,47],[65,41],[65,56],[85,56],[85,56],[85,56]],
    [[15,22],[17,22],[17,22],[23,22],[25,22],[25,22],[31,22],[33,22],[33,22]]
  ],
  // Software: four dashboard cards, side navigation and chart.
  [
    [[8,12],[92,12],[92,88],[8,88],[8,12],[8,12],[8,12],[8,12],[8,12]],
    [[28,12],[28,88],[28,88],[28,88],[28,88],[28,88],[28,88],[28,88],[28,88]],
    [[35,22],[60,22],[60,45],[35,45],[35,22],[35,22],[35,22],[35,22],[35,22]],
    [[67,22],[85,22],[85,45],[67,45],[67,22],[67,22],[67,22],[67,22],[67,22]],
    [[35,75],[42,62],[51,68],[61,55],[71,61],[82,51],[85,51],[85,79],[35,79]]
  ],
  // AI: luminous neural constellation, interconnected layers and routes.
  [
    [[10,24],[35,12],[62,26],[88,11],[91,52],[73,79],[46,90],[13,73],[10,24]],
    [[10,24],[38,47],[62,26],[73,79],[38,47],[13,73],[46,90],[91,52],[10,24]],
    [[35,12],[38,47],[62,26],[91,52],[73,79],[46,90],[13,73],[35,12],[35,12]],
    [[10,24],[62,26],[38,47],[88,11],[73,79],[38,47],[46,90],[13,73],[10,24]],
    [[35,12],[88,11],[91,52],[46,90],[10,24],[73,79],[13,73],[62,26],[35,12]]
  ],
  // Apps: retain recognisable phone silhouette and interface.
  [
    [[29,6],[71,6],[77,12],[77,88],[71,94],[29,94],[23,88],[23,12],[29,6]],
    [[42,15],[58,15],[58,15],[58,15],[58,15],[58,15],[58,15],[58,15],[58,15]],
    [[33,32],[67,32],[67,59],[33,59],[33,32],[34,70],[66,70],[66,78],[34,78]],
    [[37,38],[63,38],[63,53],[37,53],[37,38],[37,38],[37,38],[37,38],[37,38]],
    [[40,84],[60,84],[60,84],[60,84],[60,84],[60,84],[60,84],[60,84],[60,84]]
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
