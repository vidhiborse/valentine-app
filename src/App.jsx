import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════
   THEME SYSTEM — 5 colour palettes
════════════════════════════════════════════════════════ */
const THEMES = {
  rose:   { name:"Rose & Gold",    p1:"#ff4d8d", p2:"#e91e8c", p3:"#9b30d9", a1:"#ffd700", bg1:"#07000d", bg2:"#110020", orb1:"rgba(255,107,157,0.18)", orb2:"rgba(168,85,247,0.15)", glow:"rgba(255,77,141,0.38)" },
  ocean:  { name:"Ocean Dream",    p1:"#0ea5e9", p2:"#6366f1", p3:"#8b5cf6", a1:"#67e8f9", bg1:"#00040f", bg2:"#001830", orb1:"rgba(14,165,233,0.18)",  orb2:"rgba(99,102,241,0.15)",  glow:"rgba(14,165,233,0.38)" },
  forest: { name:"Emerald Forest",  p1:"#10b981", p2:"#059669", p3:"#7c3aed", a1:"#fbbf24", bg1:"#000d07", bg2:"#001a10", orb1:"rgba(16,185,129,0.18)", orb2:"rgba(124,58,237,0.15)",  glow:"rgba(16,185,129,0.38)" },
  sunset: { name:"Golden Sunset",   p1:"#f97316", p2:"#ef4444", p3:"#ec4899", a1:"#fcd34d", bg1:"#0d0400", bg2:"#1a0800", orb1:"rgba(249,115,22,0.18)",  orb2:"rgba(239,68,68,0.15)",   glow:"rgba(249,115,22,0.38)" },
  sakura: { name:"Sakura Night",    p1:"#f472b6", p2:"#e879f9", p3:"#a78bfa", a1:"#fff1f2", bg1:"#09000f", bg2:"#170520", orb1:"rgba(244,114,182,0.18)", orb2:"rgba(232,121,249,0.15)",  glow:"rgba(244,114,182,0.38)" },
};

/* ════════════════════════════════════════════════════════
   GLOBAL CSS — theme-aware via CSS variables
════════════════════════════════════════════════════════ */
function buildCSS(t){
  return `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  :root{
    --p1:${t.p1};--p2:${t.p2};--p3:${t.p3};--a1:${t.a1};
    --bg1:${t.bg1};--bg2:${t.bg2};
    --orb1:${t.orb1};--orb2:${t.orb2};
    --glow:${t.glow};
  }
  /* Light mode overrides */
  body.light-mode{
    --surface:rgba(255,255,255,0.92);
    --surface2:rgba(255,255,255,0.75);
    --border:rgba(0,0,0,0.1);
    --text:rgba(20,10,30,0.88);
    --text2:rgba(20,10,30,0.5);
    --input-bg:rgba(0,0,0,0.04);
    --input-border:rgba(0,0,0,0.14);
  }
  body.light-mode .glass-deep{background:rgba(255,255,255,0.88)!important;border-color:rgba(200,150,200,0.25)!important;box-shadow:0 8px 40px rgba(180,100,180,0.12)!important;}
  body.light-mode .glass{background:rgba(255,255,255,0.75)!important;border-color:rgba(200,150,200,0.2)!important;}
  body.light-mode .glass-card{background:rgba(255,255,255,0.7)!important;border-color:rgba(200,150,200,0.18)!important;}
  body.light-mode .glass-rose{background:rgba(255,220,235,0.55)!important;border-color:rgba(255,107,157,0.3)!important;}
  body.light-mode .glass-gold{background:rgba(255,245,210,0.65)!important;border-color:rgba(200,160,0,0.25)!important;}
  body.light-mode .glass-letter{background:rgba(255,250,230,0.85)!important;border-color:rgba(200,160,0,0.22)!important;}
  body.light-mode .rom-input{background:rgba(0,0,0,0.045)!important;border-color:rgba(0,0,0,0.12)!important;color:rgba(20,10,30,0.88)!important;}
  body.light-mode .rom-input::placeholder{color:rgba(20,10,30,0.28)!important;}
  body.light-mode .rom-input:focus{border-color:rgba(255,77,141,0.55)!important;}
  body.light-mode select{background:rgba(0,0,0,0.04)!important;color:rgba(20,10,30,0.88)!important;}

  /* ── Light mode: ALL text turns dark automatically ── */
  body.light-mode *{color:rgba(20,10,30,0.82);}

  /* Exceptions — gradient text and buttons keep their colour */
  body.light-mode span[style*="WebkitTextFillColor"]{color:transparent!important;}
  body.light-mode .pill-yes,
  body.light-mode .pill-no{color:#fff!important;}

  /* Subtle text levels */
  body.light-mode p[style*="0.27"],
  body.light-mode p[style*="0.28"],
  body.light-mode p[style*="0.26"],
  body.light-mode p[style*="0.32"],
  body.light-mode p[style*="0.38"],
  body.light-mode p[style*="0.40"],
  body.light-mode p[style*="0.4)"],
  body.light-mode p[style*="0.35"],
  body.light-mode p[style*="0.3)"],
  body.light-mode p[style*="0.2)"]{color:rgba(20,10,30,0.48)!important;}

  body.light-mode p[style*="0.5)"],
  body.light-mode p[style*="0.55"],
  body.light-mode p[style*="0.58"],
  body.light-mode p[style*="0.6)"],
  body.light-mode p[style*="0.65"],
  body.light-mode p[style*="0.7)"],
  body.light-mode p[style*="0.72"],
  body.light-mode p[style*="0.75"],
  body.light-mode p[style*="0.76"]{color:rgba(20,10,30,0.72)!important;}

  /* Labels */
  body.light-mode label{color:rgba(20,10,30,0.58)!important;}

  /* Step name + counter in progress bar */
  body.light-mode .progress-label{color:rgba(20,10,30,0.5)!important;}

  /* Gold accent text stays readable */
  body.light-mode p[style*="ffd700"],
  body.light-mode span[style*="ffd700"]{color:#8a6800!important;}

  /* Pink accent text stays readable */
  body.light-mode p[style*="ffb3c8"],
  body.light-mode span[style*="ffb3c8"],
  body.light-mode strong[style*="ffb3c8"]{color:#c0005a!important;}

  /* Pink subtle text */
  body.light-mode p[style*="ff6b9d"],
  body.light-mode span[style*="ff6b9d"]{color:#c0005a!important;}

  /* Ghost buttons in light mode */
  body.light-mode button:not(.pill-yes):not(.pill-no):not(.theme-toggle-btn){color:rgba(20,10,30,0.65)!important;border-color:rgba(0,0,0,0.15)!important;background:rgba(0,0,0,0.05)!important;}
  body.light-mode button:not(.pill-yes):not(.pill-no):not(.theme-toggle-btn):hover{background:rgba(0,0,0,0.09)!important;}
  /* Toggle button keeps its own style always */
  .theme-toggle-btn{all:unset;cursor:pointer;}

  /* Headings */
  body.light-mode h1,body.light-mode h2{color:rgba(20,10,30,0.88)!important;}

  /* Divider lines */
  body.light-mode div[style*="rgba(255,255,255,0.07)"]{background:rgba(0,0,0,0.07)!important;}

  /* Background body in light mode */
  body.light-mode{background:#f0eaf8!important;}

  /* Scrollbar in light */
  body.light-mode ::-webkit-scrollbar-thumb{background:rgba(180,100,180,0.3);}

  @keyframes toggleSlide{from{transform:translateX(0);}to{transform:translateX(22px);}}
  body{font-family:'DM Sans',sans-serif;background:var(--bg1);color:#fff;min-height:100vh;overflow-x:hidden;}
  *{cursor:inherit;}
  button,a{cursor:pointer;}
  input,textarea,select{cursor:text;}
  img{cursor:default;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-thumb{background:rgba(255,107,157,0.45);border-radius:3px;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.85) translateY(14px);}to{opacity:1;transform:scale(1) translateY(0);}}
  @keyframes shimmer{0%{background-position:200% center;}100%{background-position:-200% center;}}
  @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.06);}}
  @keyframes floatBob{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  @keyframes heartBeat{0%,100%{transform:scale(1);}14%{transform:scale(1.3);}28%{transform:scale(1);}42%{transform:scale(1.15);}70%{transform:scale(1);}}
  @keyframes confettiFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1;}100%{transform:translateY(110vh) rotate(800deg);opacity:0;}}
  @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
  @keyframes countNum{from{transform:scale(3) rotate(-12deg);opacity:0;}to{transform:scale(1) rotate(0);opacity:1;}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px var(--glow),0 6px 28px rgba(168,85,247,0.22);}50%{box-shadow:0 0 50px var(--glow),0 8px 60px rgba(168,85,247,0.48);}}
  @keyframes glowPurple{0%,100%{box-shadow:0 0 20px rgba(124,58,237,0.38);}50%{box-shadow:0 0 50px rgba(124,58,237,0.72);}}
  @keyframes celebBounce{0%,100%{transform:translateY(0) rotate(0);}25%{transform:translateY(-22px) rotate(-5deg);}75%{transform:translateY(-10px) rotate(5deg);}}
  @keyframes rainbow{0%,100%{filter:hue-rotate(0deg);}50%{filter:hue-rotate(180deg);}}
  @keyframes rotateSlow{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes noSlide{0%,100%{transform:translate(-50%,-50%) rotate(0) scale(1);}25%{transform:translate(-50%,-50%) rotate(-6deg) scale(1.04);}75%{transform:translate(-50%,-50%) rotate(6deg) scale(1.04);}}
  @keyframes orb1{0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(40px,-30px) scale(1.08);}66%{transform:translate(-25px,20px) scale(0.94);}}
  @keyframes orb2{0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(-35px,25px) scale(1.06);}66%{transform:translate(30px,-20px) scale(0.96);}}
  @keyframes orb3{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(20px,30px) scale(1.1);}}
  @keyframes borderGlow{0%,100%{border-color:rgba(255,107,157,0.22);}50%{border-color:rgba(255,107,157,0.55);}}
  @keyframes starPulse{0%,100%{opacity:0.12;transform:scale(1);}50%{opacity:0.35;transform:scale(1.4);}}
  @keyframes quizPop{from{opacity:0;transform:scale(0.9);}to{opacity:1;transform:scale(1);}}
  @keyframes pledgeLine{from{opacity:0;transform:translateX(-16px);}to{opacity:1;transform:translateX(0);}}
  @keyframes galleryIn{from{opacity:0;transform:scale(0.88);}to{opacity:1;transform:scale(1);}}
  @keyframes datePop{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
  @keyframes letterFloat{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-8px) rotate(1deg);}}
  @keyframes sealPop{from{transform:scale(0) rotate(-20deg);}to{transform:scale(1) rotate(0deg);}}
  @keyframes scratchReveal{from{opacity:0;transform:scale(0.9);}to{opacity:1;transform:scale(1);}}
  @keyframes pageFlip{from{transform:rotateY(-90deg);opacity:0;}to{transform:rotateY(0deg);opacity:1;}}
  @keyframes inkDrop{from{opacity:0;transform:translateY(-4px);}to{opacity:1;transform:translateY(0);}}
  @keyframes sealRotate{from{transform:scale(0) rotate(180deg);}to{transform:scale(1) rotate(0deg);}}
  @keyframes envelopeOpen{from{transform:scaleY(0) translateY(-20px);opacity:0;}to{transform:scaleY(1) translateY(0);opacity:1;}}

  .glass{background:linear-gradient(135deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.025) 100%);backdrop-filter:blur(28px) saturate(190%);-webkit-backdrop-filter:blur(28px) saturate(190%);border:1px solid rgba(255,255,255,0.1);border-radius:24px;box-shadow:0 8px 32px rgba(0,0,0,0.38),inset 0 1px 0 rgba(255,255,255,0.08);}
  .glass-rose{background:linear-gradient(135deg,rgba(255,107,157,0.1) 0%,rgba(168,85,247,0.055) 100%);backdrop-filter:blur(24px) saturate(175%);-webkit-backdrop-filter:blur(24px) saturate(175%);border:1px solid rgba(255,107,157,0.22);border-radius:24px;box-shadow:0 8px 36px rgba(255,107,157,0.11),inset 0 1px 0 rgba(255,255,255,0.07);animation:borderGlow 3.5s ease infinite;}
  .glass-deep{background:linear-gradient(145deg,rgba(18,0,35,0.65) 0%,rgba(38,4,65,0.55) 100%);backdrop-filter:blur(32px) saturate(210%);-webkit-backdrop-filter:blur(32px) saturate(210%);border:1px solid rgba(255,107,157,0.16);border-radius:28px;box-shadow:0 20px 60px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.09);}
  .glass-gold{background:linear-gradient(135deg,rgba(255,215,0,0.07) 0%,rgba(255,165,0,0.04) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,215,0,0.18);border-radius:20px;box-shadow:0 4px 22px rgba(255,215,0,0.07);}
  .glass-card{background:linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(255,107,157,0.04) 50%,rgba(168,85,247,0.04) 100%);backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%);border:1px solid rgba(255,255,255,0.09);border-radius:20px;box-shadow:0 6px 28px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.07);}
  .glass-date{background:linear-gradient(145deg,rgba(255,215,0,0.06) 0%,rgba(255,107,157,0.05) 100%);backdrop-filter:blur(18px);border:1px solid rgba(255,215,0,0.14);border-radius:18px;transition:all 0.3s ease;}
  .glass-date:hover{border-color:rgba(255,215,0,0.4);transform:translateY(-3px);}
  .glass-date.picked{border-color:rgba(255,107,157,0.55);background:linear-gradient(135deg,rgba(255,107,157,0.15) 0%,rgba(168,85,247,0.1) 100%);}
  .glass-quiz{background:linear-gradient(135deg,rgba(168,85,247,0.1) 0%,rgba(255,107,157,0.07) 100%);backdrop-filter:blur(18px);border:1px solid rgba(168,85,247,0.2);border-radius:16px;transition:all 0.25s ease;}
  .glass-quiz:hover{border-color:rgba(255,107,157,0.45);transform:translateY(-2px);}
  .glass-quiz.correct{background:linear-gradient(135deg,rgba(52,211,153,0.2) 0%,rgba(16,185,129,0.1) 100%);border-color:rgba(52,211,153,0.5);}
  .glass-quiz.wrong{background:linear-gradient(135deg,rgba(248,113,113,0.2) 0%,rgba(239,68,68,0.1) 100%);border-color:rgba(248,113,113,0.5);}
  .glass-letter{background:linear-gradient(145deg,rgba(255,215,0,0.05) 0%,rgba(255,107,157,0.06) 50%,rgba(168,85,247,0.04) 100%);backdrop-filter:blur(24px);border:1px solid rgba(255,215,0,0.2);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,215,0,0.1);}
  .theme-btn{background:rgba(255,255,255,0.06);border:2px solid rgba(255,255,255,0.12);border-radius:14px;padding:0.6rem 0.5rem;transition:all 0.25s ease;text-align:center;}
  .theme-btn:hover{transform:translateY(-2px);}
  .theme-btn.active{border-color:rgba(255,107,157,0.7);background:rgba(255,107,157,0.12);}

  .rom-input:focus{border-color:rgba(255,107,157,0.55)!important;box-shadow:0 0 0 3px rgba(255,107,157,0.1)!important;outline:none;}
  .rom-input::placeholder{color:rgba(255,255,255,0.22);}
  .pill-yes{background:linear-gradient(135deg,var(--p1),var(--p2),var(--p3));border:none;color:#fff;border-radius:50px;font-weight:700;letter-spacing:0.04em;transition:all 0.3s ease;box-shadow:0 8px 28px var(--glow);}
  .pill-no{background:linear-gradient(135deg,#4a0080,#6b21a8,#7c3aed);border:none;color:#fff;border-radius:50px;font-weight:700;letter-spacing:0.04em;transition:all 0.3s ease;box-shadow:0 8px 28px rgba(124,58,237,0.42);}
  .pill-yes:hover{transform:translateY(-2px);}
  .pill-no:hover{transform:translateY(-2px);}
  @media(max-width:520px){.wpad{padding:1.4rem 1.1rem!important;border-radius:20px!important;}.htitle{font-size:clamp(1.5rem,7vw,2rem)!important;}}
`;}

/* ── URL encode/decode ── */
function enc(d){
  try{
    // Compact: base64 of UTF-8 JSON — no encodeURIComponent bloat (~40% shorter URLs)
    const json=JSON.stringify(d);
    const bytes=new TextEncoder().encode(json);
    let bin="";bytes.forEach(b=>bin+=String.fromCharCode(b));
    return btoa(bin);
  }catch{return null;}
}
function dec(h){
  try{
    // Try new compact format first
    const bin=atob(h);
    const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    const json=new TextDecoder().decode(bytes);
    return JSON.parse(json);
  }catch{
    // Fallback: try old encodeURIComponent format (backwards compatibility)
    try{return JSON.parse(decodeURIComponent(atob(h)));}catch{return null;}
  }
}
function getHash(){const h=window.location.hash.slice(1);return h?dec(h):null;}

/* ════════════════════════════════════════════════════════
   ROMANTIC BACKGROUND
════════════════════════════════════════════════════════ */
function RomanticBg({theme}){
  const t=THEMES[theme||"rose"];
  return(
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`linear-gradient(160deg,${t.bg1} 0%,${t.bg2} 40%,${t.bg1} 100%)`}}/>
      <div style={{position:"absolute",top:"8%",left:"12%",width:"clamp(200px,35vw,420px)",height:"clamp(200px,35vw,420px)",borderRadius:"50%",background:`radial-gradient(circle at 35% 35%,${t.orb1} 0%,transparent 70%)`,animation:"orb1 18s ease-in-out infinite"}}/>
      <div style={{position:"absolute",bottom:"10%",right:"8%",width:"clamp(180px,30vw,380px)",height:"clamp(180px,30vw,380px)",borderRadius:"50%",background:`radial-gradient(circle at 60% 40%,${t.orb2} 0%,transparent 70%)`,animation:"orb2 22s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"45%",right:"25%",width:"clamp(120px,20vw,260px)",height:"clamp(120px,20vw,260px)",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,215,0,0.07) 0%,transparent 70%)",animation:"orb3 14s ease-in-out infinite"}}/>
      {[15,35,55,75,88].map((top,i)=>(
        <div key={i} style={{position:"absolute",top:`${top}%`,left:0,right:0,height:"1px",background:`linear-gradient(90deg,transparent,${t.orb1} 50%,transparent)`}}/>
      ))}
      {Array.from({length:24},(_,i)=>(
        <div key={i} style={{position:"absolute",left:`${(i*4.2+3).toFixed(1)}%`,top:`${(i*4.1+2).toFixed(1)}%`,width:`${2+(i%3)}px`,height:`${2+(i%3)}px`,borderRadius:"50%",background:`rgba(255,${150+i*4},${180+i*3},0.35)`,animation:`starPulse ${2.5+i%5}s ${i*0.28}s ease infinite`}}/>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CONFETTI
════════════════════════════════════════════════════════ */
function Confetti({active}){
  if(!active)return null;
  const p=Array.from({length:120},(_,i)=>({id:i,left:`${Math.random()*100}%`,color:["#ff6b9d","#ffd700","#a855f7","#34d399","#f87171","#60a5fa","#fb923c","#f472b6","#fff","#c084fc"][i%10],delay:`${(Math.random()*2).toFixed(2)}s`,dur:`${(2.5+Math.random()*3).toFixed(1)}s`,w:`${4+(i%6)*2}px`,h:`${7+(i%5)*3}px`,shape:i%3===0?"50%":"3px"}));
  return(<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:1000,overflow:"hidden"}}>{p.map(x=>(<div key={x.id} style={{position:"absolute",left:x.left,top:"-20px",width:x.w,height:x.h,background:x.color,borderRadius:x.shape,animation:`confettiFall ${x.dur} ${x.delay} ease-in forwards`}}/>))}</div>);
}

/* ════════════════════════════════════════════════════════
   TYPEWRITER
════════════════════════════════════════════════════════ */
function Typewriter({text,speed=28,onDone}){
  const [s,setS]=useState("");const idx=useRef(0);
  useEffect(()=>{idx.current=0;setS("");const iv=setInterval(()=>{idx.current++;setS(text.slice(0,idx.current));if(idx.current>=text.length){clearInterval(iv);onDone?.();}},speed);return()=>clearInterval(iv);},[text,speed]);
  return <span>{s}<span style={{animation:"blink 0.8s step-end infinite"}}>|</span></span>;
}

/* ════════════════════════════════════════════════════════
   SHARED UI
════════════════════════════════════════════════════════ */
const GT={fontFamily:"'Cormorant Garamond',serif",fontWeight:700,background:"linear-gradient(135deg,#ff6b9d 0%,#ffb3c8 28%,#ffd700 58%,#c084fc 88%,#ff6b9d 100%)",backgroundSize:"300% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 6s linear infinite"};
function GradText({children,style={}}){return <span style={{...GT,...style}}>{children}</span>;}
const IB={width:"100%",display:"block",background:"rgba(255,255,255,0.055)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"14px",color:"#fff",padding:"0.8rem 1rem",fontSize:"0.94rem",transition:"border 0.25s,box-shadow 0.25s"};
const LB={color:"rgba(255,210,238,0.72)",fontSize:"0.75rem",display:"block",marginBottom:"0.38rem",fontWeight:500,letterSpacing:"0.03em"};
// Light-aware text helper
function lc(light,dark="rgba(255,255,255,0.65)"){return document.body.classList.contains("light-mode")?light:dark;}
function PBtn({children,onClick,style={},disabled=false}){
  return(<button onClick={onClick} disabled={disabled} className="pill-yes" style={{padding:"0.9rem 2.1rem",fontSize:"0.97rem",opacity:disabled?0.5:1,animation:disabled?"none":"glow 2.5s ease infinite",...style,cursor:disabled?"not-allowed":"pointer"}}>{children}</button>);
}
function GBtn({children,onClick,style={}}){
  return(<button onClick={onClick} style={{background:"rgba(255,255,255,0.045)",border:"1px solid rgba(255,255,255,0.14)",color:"rgba(255,255,255,0.58)",borderRadius:"50px",fontSize:"0.86rem",fontWeight:500,padding:"0.72rem 1.3rem",transition:"all 0.25s ease",...style}}>{children}</button>);
}

/* ── Light/Dark Toggle ── */
function ThemeToggle({light,setLight}){
  function toggle(){
    const next=!light;
    setLight(next);
    document.body.classList.toggle("light-mode",next);
  }
  return(
    <button onClick={toggle} className="theme-toggle-btn" title={light?"Switch to Dark":"Switch to Light"}
      style={{position:"fixed",top:"1rem",right:"1rem",zIndex:9999,
        background:light?"rgba(255,255,255,0.95)":"rgba(20,5,40,0.82)",
        border:`1.5px solid ${light?"rgba(180,100,180,0.25)":"rgba(255,107,157,0.35)"}`,
        borderRadius:"50px",padding:"0.4rem 0.8rem",display:"flex",alignItems:"center",
        gap:"0.5rem",cursor:"pointer!important",backdropFilter:"blur(16px)",
        boxShadow:light?"0 2px 16px rgba(0,0,0,0.1),0 0 0 1px rgba(180,100,180,0.12)":"0 2px 16px rgba(255,107,157,0.2)",
        transition:"all 0.3s ease",
        // Override light mode button rule for this specific button
        color:`${light?"rgba(20,10,30,0.8)":"rgba(255,255,255,0.85)"}!important`,
        backgroundColor:`${light?"rgba(255,255,255,0.95)":"rgba(20,5,40,0.82)"}!important`,
      }}>
      {/* Track */}
      <div style={{width:"36px",height:"20px",borderRadius:"20px",background:light?"linear-gradient(135deg,#ffd700,#ff6b9d)":"linear-gradient(135deg,#1a0030,#3a0060)",border:`1px solid ${light?"rgba(255,150,0,0.3)":"rgba(255,107,157,0.3)"}`,position:"relative",transition:"all 0.3s ease",flexShrink:0}}>
        {/* Thumb */}
        <div style={{position:"absolute",top:"2px",left:light?"18px":"2px",width:"14px",height:"14px",borderRadius:"50%",background:light?"#fff":"linear-gradient(135deg,#ff6b9d,#c084fc)",boxShadow:"0 1px 4px rgba(0,0,0,0.3)",transition:"left 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}/>
      </div>
      <span style={{fontSize:"0.85rem"}}>{light?"☀️":"🌙"}</span>
      <span style={{fontSize:"0.72rem",fontWeight:600,color:light?"rgba(20,10,30,0.75)":"rgba(255,255,255,0.7)",letterSpacing:"0.02em",userSelect:"none"}}>{light?"Light":"Dark"}</span>
    </button>
  );
}
function Field({label,value,onChange,placeholder,small}){
  return(<div style={{marginBottom:"1rem"}}>{label&&<label style={LB}>{label}</label>}<input className="rom-input" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{...IB,...(small?{fontSize:"0.85rem",padding:"0.65rem 0.9rem"}:{})}}/></div>);
}
function TArea({label,value,onChange,placeholder,rows=3}){
  return(<div style={{marginBottom:"1rem"}}>{label&&<label style={LB}>{label}</label>}<textarea className="rom-input" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{...IB,resize:"vertical",lineHeight:1.7}}/></div>);
}
function ImgUp({value,onChange,hint,height="clamp(120px,35vw,160px)"}){
  const r=useRef();
  function handle(e){const f=e.target.files[0];if(!f)return;const img=new Image(),u=URL.createObjectURL(f);img.onload=()=>{const M=600,c=document.createElement("canvas");let w=img.width,h=img.height;if(w>h){if(w>M){h=h*(M/w);w=M;}}else{if(h>M){w=w*(M/h);h=M;}}c.width=Math.round(w);c.height=Math.round(h);c.getContext("2d").drawImage(img,0,0,c.width,c.height);onChange(c.toDataURL("image/jpeg",0.62));URL.revokeObjectURL(u);};img.src=u;}
  return(
    <div onClick={()=>r.current.click()} className="glass" style={{width:"100%",minHeight:"90px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden",position:"relative",transition:"all 0.3s",borderColor:value?"rgba(255,107,157,0.35)":"rgba(255,255,255,0.08)"}}>
      {value?(<><img src={value} alt="" style={{width:"100%",height,objectFit:"cover",display:"block"}}/><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity 0.2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}><span style={{color:"#fff",fontSize:"0.78rem",background:"rgba(0,0,0,0.5)",padding:"4px 14px",borderRadius:"20px"}}>Change</span></div></>):(
        <div style={{textAlign:"center",padding:"1.3rem 1rem"}}>
          <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"rgba(255,107,157,0.15)",border:"1px solid rgba(255,107,157,0.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 0.5rem",fontSize:"1.1rem",color:"rgba(255,107,157,0.7)"}}>+</div>
          <p style={{color:"rgba(255,255,255,0.3)",fontSize:"0.77rem"}}>{hint||"Tap to add photo"}</p>
        </div>
      )}
      <input ref={r} type="file" accept="image/*" onChange={handle} style={{display:"none"}}/>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   DEFAULTS
════════════════════════════════════════════════════════ */
const DEF_MEMS=[
  {key:"m1",emoji:"👋",title:"We first met",note:"That awkward first hello that changed everything.",imgHint:"Photo from when you first met"},
  {key:"m2",emoji:"😂",title:"First inside joke",note:"You know the one. We still laugh about it.",imgHint:"A funny memory photo"},
  {key:"m3",emoji:"🤝",title:"Became inseparable",note:"People started confusing us for siblings.",imgHint:"Photo of you two together"},
  {key:"m4",emoji:"🌧",title:"You were there",note:"When everything fell apart, you stayed.",imgHint:"A meaningful photo"},
  {key:"m5",emoji:"🚀",title:"Made memories",note:"Late nights, road trips, and terrible decisions.",imgHint:"A fun adventure photo"},
  {key:"m6",emoji:"💌",title:"This moment",note:"This is me telling you how much you mean to me.",imgHint:"Your favourite photo of them"},
];
const DEF_REASONS=["Your laugh is my favourite sound in the whole world","You always know exactly what I need without me saying a word","You make every ordinary day feel like an adventure","You're the first person I want to call with good news or bad","Being around you feels like coming home"];
const DEF_PLEDGES=["I promise to always be there for you, no matter what","I promise to make you laugh even on the hardest days","I promise to be your safe place, always","I promise to love every version of you"];
const DEF_DATES=[{icon:"🎬",label:"Movie night in",desc:"Blankets, snacks, your pick"},{icon:"🌅",label:"Sunrise walk",desc:"Just us and the morning light"},{icon:"🍕",label:"Cook together",desc:"Messy kitchen, best memories"},{icon:"🎡",label:"Theme park day",desc:"Screaming together on rides"},{icon:"🌊",label:"Beach day",desc:"Waves, sand, and cold drinks"},{icon:"⭐",label:"Stargazing night",desc:"Find constellations together"}];
const DEF_QUIZ=[{q:"What is my go-to comfort food?",opts:["Pizza","Noodles","Ice Cream","Chocolate"],ans:0},{q:"If we could travel anywhere, where would I pick?",opts:["Paris","Maldives","Tokyo","New York"],ans:1},{q:"What do I always say when I'm happy?",opts:["Let's go!","Aww yay!","Finally!","Oh my god!"],ans:2}];

/* ════════════════════════════════════════════════════════
   SETUP WIZARD  (14 steps)
════════════════════════════════════════════════════════ */
function SetupWizard({onComplete}){
  const [ws,setWs]=useState(0);
  const [yourName,setYN]=useState("");
  const [friendName,setFN]=useState("");
  const [coupleDate,setCD]=useState("");
  const [nickname,setNick]=useState("");      // couple nickname
  const [theme,setTheme]=useState("rose");    // colour theme
  const [personalMsg,setPM]=useState("");
  const [songTitle,setST]=useState("");
  const [songArtist,setSA]=useState("");
  const [songNote,setSN]=useState("");
  const [reasons,setReasons]=useState([...DEF_REASONS]);
  const [pledges,setPledges]=useState([...DEF_PLEDGES]);
  const [scratchMsg,setScratch]=useState(""); // scratch card hidden message
  const [letterLines,setLetterLines]=useState(["","","",""]); // love letter lines
  const [futureDate,setFDate]=useState("");   // "letter from future" date
  const [futureLetter,setFLetter]=useState(""); // letter from future text
  const [proposalQ,setPQ]=useState("");
  const [proposalPoem,setPPoem]=useState("");
  const [celebMsg,setCM]=useState("");
  const [quizQs,setQuiz]=useState(DEF_QUIZ.map(q=>({...q})));
  const [mems,setMems]=useState(DEF_MEMS.map(m=>({...m,img:"",userNote:""})));
  const [galleryImgs,setGallery]=useState(["","","",""]);
  const [galleryCaption,setGCaption]=useState("");
  const [err,setErr]=useState("");
  const [gen,setGen]=useState(false);

  const TOTAL=13;
  const pct=(ws/TOTAL)*100;

  function uMem(i,f,v){setMems(p=>{const a=[...p];a[i]={...a[i],[f]:v};return a;});}
  function uLetterLine(i,v){setLetterLines(p=>{const a=[...p];a[i]=v;return a;});}
  function next(){if(ws===0&&(!yourName.trim()||!friendName.trim())){setErr("Please enter both names");return;}setErr("");setWs(s=>s+1);window.scrollTo({top:0,behavior:"smooth"});}
  function back(){setErr("");setWs(s=>s-1);window.scrollTo({top:0,behavior:"smooth"});}
  function generate(){
    setGen(true);
    const payload={yourName:yourName.trim(),friendName:friendName.trim(),coupleDate,nickname,theme,personalMsg,songTitle,songArtist,songNote,reasons,pledges,scratchMsg,letterLines,futureDate,futureLetter,proposalQ,proposalPoem,celebMsg,quizQs,mems,galleryImgs:galleryImgs.filter(Boolean),galleryCaption};
    setTimeout(()=>{onComplete(payload,enc(payload));setGen(false);},900);
  }

  const stepNames=["Names & Theme","Memory 1","Memory 2","Memory 3","Memory 4","Memory 5","Memory 6","Reasons & Song","Love Pledges","Quiz & Gallery","Scratch Card","Love Letter & Future","Proposal & Celebration"];


  const [lightMode,setLightMode]=useState(false);

  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1}}>
      <ThemeToggle light={lightMode} setLight={setLightMode}/>
      <div style={{width:"100%",maxWidth:"860px",marginBottom:"1.2rem",zIndex:2}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.38rem"}}>
          <p style={{color:lightMode?"rgba(20,10,30,0.45)":"rgba(255,255,255,0.32)",fontSize:"0.7rem"}}>{stepNames[ws]||""}</p>
          <p style={{color:lightMode?"rgba(20,10,30,0.3)":"rgba(255,255,255,0.18)",fontSize:"0.67rem"}}>{ws+1}/{TOTAL+1}</p>
        </div>
        <div style={{height:"2px",background:lightMode?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.07)",borderRadius:"2px"}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,#ff6b9d,#c084fc,#ffd700)",width:`${pct}%`,transition:"width 0.5s ease",borderRadius:"2px",boxShadow:"0 0 8px rgba(255,107,157,0.5)"}}/>
        </div>
      </div>

      <div className="glass-deep wpad" style={{width:"100%",maxWidth:"860px",padding:"2.2rem 2.2rem",zIndex:2}}>

        {/* Step 0 — Names + Theme — 2-col on desktop */}
        {ws===0&&(
          <div style={{animation:"scaleIn 0.4s ease"}}>
            <div style={{textAlign:"center",marginBottom:"1.6rem"}}>
              <div style={{width:"52px",height:"52px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,107,157,0.25),rgba(168,85,247,0.2))",border:"1px solid rgba(255,107,157,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 0.9rem",fontSize:"1.3rem"}}>+</div>
              <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.5rem,5vw,1.85rem)",fontWeight:700,color:lightMode?"rgba(20,10,30,0.88)":"inherit"}}><GradText>Create Your Proposal</GradText></h1>
            </div>
            {/* 2-col grid on desktop */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
              {/* Left — names */}
              <div>
                <Field label="Your Name" value={yourName} onChange={setYN} placeholder="e.g. Rohan"/>
                <Field label="Your Partner's Name" value={friendName} onChange={setFN} placeholder="e.g. Priya"/>
                <Field label="Couple Nickname (optional)" value={nickname} onChange={setNick} placeholder="e.g. Ro & Priya, Team Forever…"/>
                <Field label="A Special Date (optional)" value={coupleDate} onChange={setCD} placeholder="e.g. 14th February 2025"/>
              </div>
              {/* Right — theme */}
              <div>
                <label style={{...LB,color:lightMode?"rgba(20,10,30,0.55)":undefined}}>Colour Theme</label>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"0.5rem",marginBottom:"1rem"}}>
                  {Object.entries(THEMES).map(([k,v])=>(
                    <button key={k} onClick={()=>setTheme(k)} className={`theme-btn${theme===k?" active":""}`} style={{borderColor:lightMode&&theme!==k?"rgba(0,0,0,0.1)":undefined}}>
                      <div style={{display:"flex",gap:"3px",justifyContent:"center",marginBottom:"4px"}}>
                        {[v.p1,v.p2,v.a1].map((c,i)=><div key={i} style={{width:"10px",height:"10px",borderRadius:"50%",background:c}}/>)}
                      </div>
                      <p style={{color:lightMode?"rgba(20,10,30,0.6)":"rgba(255,255,255,0.6)",fontSize:"0.6rem",lineHeight:1.2}}>{v.name}</p>
                    </button>
                  ))}
                </div>
                {/* Theme preview swatch */}
                <div style={{borderRadius:"14px",overflow:"hidden",border:"1px solid rgba(255,255,255,0.1)",marginTop:"0.5rem"}}>
                  <div style={{height:"48px",background:`linear-gradient(135deg,${THEMES[theme].p1},${THEMES[theme].p2},${THEMES[theme].p3})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{color:"#fff",fontSize:"0.75rem",fontWeight:600,letterSpacing:"0.04em"}}>{THEMES[theme].name}</span>
                  </div>
                </div>
              </div>
            </div>
            {err&&<p style={{color:"#fb7185",fontSize:"0.77rem",textAlign:"center",marginTop:"0.5rem"}}>{err}</p>}
            <PBtn onClick={next} style={{width:"100%",marginTop:"1.4rem",padding:"0.98rem",fontSize:"1rem"}}>Let's build something magical</PBtn>
          </div>
        )}


        {/* Memory Steps — 2-col on desktop */}
        {ws>=1&&ws<=6&&(()=>{
          const mi=ws-1,m=mems[mi];
          return(
            <div style={{animation:"fadeUp 0.38s ease"}} key={m.key}>
              <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
                <span style={{fontSize:"2rem"}}>{m.emoji}</span>
                <p style={{color:lightMode?"rgba(20,10,30,0.45)":"rgba(255,255,255,0.26)",fontSize:"0.73rem",marginTop:"0.28rem"}}>Memory {ws} of 6</p>
              </div>
              {/* 2-col: photo | fields */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.4rem"}}>
                <div>
                  <ImgUp value={m.img} onChange={v=>uMem(mi,"img",v)} hint={m.imgHint} height="clamp(180px,35vw,280px)"/>
                </div>
                <div>
                  <Field label="Memory Title" value={m.title} onChange={v=>uMem(mi,"title",v)} placeholder="e.g. We first met"/>
                  <TArea label="Personal note" value={m.userNote} onChange={v=>uMem(mi,"userNote",v)} placeholder={m.note} rows={5}/>
                </div>
              </div>
              <div style={{display:"flex",gap:"0.6rem",marginTop:"1rem"}}>
                <GBtn onClick={back}>Back</GBtn>
                <PBtn onClick={next} style={{flex:1}}>{ws===6?"Almost there!":"Next"}</PBtn>
              </div>
            </div>
          );
        })()}

        {/* Step 8 — Reasons & Song */}
        {ws===7&&(
          <div style={{animation:"fadeUp 0.38s ease"}}>
            <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.3rem,5vw,1.5rem)",fontWeight:700}}><GradText>Reasons & Song</GradText></h2>
            </div>
            <label style={LB}>Reasons I love you</label>
            <div style={{maxHeight:"200px",overflowY:"auto",paddingRight:"3px",marginBottom:"0.55rem"}}>
              {reasons.map((rv,i)=>(
                <div key={i} style={{display:"flex",gap:"0.45rem",marginBottom:"0.42rem",alignItems:"center"}}>
                  <input className="rom-input" value={rv} onChange={e=>{const a=[...reasons];a[i]=e.target.value;setReasons(a);}} placeholder={`Reason ${i+1}…`} style={{...IB,flex:1,padding:"0.62rem 0.88rem",fontSize:"0.86rem"}}/>
                  {reasons.length>1&&<button onClick={()=>setReasons(p=>p.filter((_,j)=>j!==i))} style={{background:"rgba(255,80,80,0.13)",border:"1px solid rgba(255,80,80,0.2)",color:"rgba(255,160,160,0.8)",borderRadius:"8px",padding:"0.36rem 0.52rem",fontSize:"0.7rem",flexShrink:0}}>✕</button>}
                </div>
              ))}
            </div>
            {reasons.length<10&&<GBtn onClick={()=>setReasons(p=>[...p,""])} style={{marginBottom:"0.9rem",fontSize:"0.78rem",padding:"0.38rem 0.85rem"}}>+ Add</GBtn>}
            <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:"0.85rem"}}>
              <Field label="Song Title" value={songTitle} onChange={setST} placeholder="e.g. Perfect — Ed Sheeran"/>
              <Field label="Artist" value={songArtist} onChange={setSA} placeholder="e.g. Ed Sheeran"/>
              <TArea label="Why this song?" value={songNote} onChange={setSN} placeholder="This song reminds me of you because…" rows={2}/>
            </div>
            <div style={{display:"flex",gap:"0.6rem"}}>
              <GBtn onClick={back}>Back</GBtn>
              <PBtn onClick={next} style={{flex:1}}>Next</PBtn>
            </div>
          </div>
        )}

        {/* Step 9 — Love Pledges */}
        {ws===8&&(
          <div style={{animation:"fadeUp 0.38s ease"}}>
            <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.3rem,5vw,1.5rem)",fontWeight:700}}><GradText>Love Pledges</GradText></h2>
            </div>
            <div style={{maxHeight:"250px",overflowY:"auto",paddingRight:"3px",marginBottom:"0.55rem"}}>
              {pledges.map((pv,i)=>(
                <div key={i} style={{display:"flex",gap:"0.45rem",marginBottom:"0.42rem",alignItems:"center"}}>
                  <input className="rom-input" value={pv} onChange={e=>{const a=[...pledges];a[i]=e.target.value;setPledges(a);}} placeholder={`Promise ${i+1}…`} style={{...IB,flex:1,padding:"0.62rem 0.88rem",fontSize:"0.86rem"}}/>
                  {pledges.length>1&&<button onClick={()=>setPledges(p=>p.filter((_,j)=>j!==i))} style={{background:"rgba(255,80,80,0.13)",border:"1px solid rgba(255,80,80,0.2)",color:"rgba(255,160,160,0.8)",borderRadius:"8px",padding:"0.36rem 0.52rem",fontSize:"0.7rem",flexShrink:0}}>✕</button>}
                </div>
              ))}
            </div>
            {pledges.length<8&&<GBtn onClick={()=>setPledges(p=>[...p,""])} style={{marginBottom:"0.9rem",fontSize:"0.78rem",padding:"0.38rem 0.85rem"}}>+ Add</GBtn>}
            <div style={{display:"flex",gap:"0.6rem"}}>
              <GBtn onClick={back}>Back</GBtn>
              <PBtn onClick={next} style={{flex:1}}>Next</PBtn>
            </div>
          </div>
        )}

        {/* Step 10 — Quiz + Gallery */}
        {ws===9&&(
          <div style={{animation:"fadeUp 0.38s ease"}}>
            <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.3rem,5vw,1.5rem)",fontWeight:700}}><GradText>Quiz & Gallery</GradText></h2>
              <p style={{color:"rgba(255,255,255,0.27)",fontSize:"0.73rem",marginTop:"0.25rem"}}>{quizQs.length} question{quizQs.length!==1?"s":""} · tap pink dot = correct answer</p>
            </div>

            {/* Questions list */}
            <div style={{maxHeight:"420px",overflowY:"auto",paddingRight:"2px",marginBottom:"0.7rem"}}>
              {quizQs.map((q,qi)=>(
                <div key={qi} className="glass-card" style={{padding:"0.9rem 0.95rem",marginBottom:"0.7rem",position:"relative"}}>
                  {/* Question header row */}
                  <div style={{display:"flex",gap:"0.5rem",alignItems:"center",marginBottom:"0.55rem"}}>
                    <div style={{flexShrink:0,width:"22px",height:"22px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,107,157,0.25),rgba(168,85,247,0.2))",border:"1px solid rgba(255,107,157,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",color:"rgba(255,107,157,0.9)",fontWeight:700}}>Q{qi+1}</div>
                    <input className="rom-input" value={q.q} onChange={e=>{const a=[...quizQs];a[qi]={...a[qi],q:e.target.value};setQuiz(a);}} style={{...IB,flex:1,fontSize:"0.84rem",padding:"0.5rem 0.75rem",marginBottom:0}} placeholder={`Question ${qi+1}…`}/>
                    {/* Delete question button — only if more than 1 */}
                    {quizQs.length>1&&(
                      <button onClick={()=>setQuiz(p=>p.filter((_,j)=>j!==qi))} style={{flexShrink:0,width:"26px",height:"26px",borderRadius:"8px",background:"rgba(255,80,80,0.13)",border:"1px solid rgba(255,80,80,0.22)",color:"rgba(255,160,160,0.85)",fontSize:"0.75rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                    )}
                  </div>

                  {/* Options grid */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem",marginBottom:"0.45rem"}}>
                    {q.opts.map((o,oi)=>(
                      <div key={oi} style={{display:"flex",gap:"0.3rem",alignItems:"center"}}>
                        <button onClick={()=>{const a=[...quizQs];a[qi]={...a[qi],ans:oi};setQuiz(a);}} title="Mark as correct" style={{flexShrink:0,width:"16px",height:"16px",borderRadius:"50%",background:q.ans===oi?"linear-gradient(135deg,#ff6b9d,#c084fc)":"rgba(255,255,255,0.09)",border:`1px solid ${q.ans===oi?"rgba(255,107,157,0.7)":"rgba(255,255,255,0.18)"}`}}/>
                        <input className="rom-input" value={o} onChange={e=>{const a=[...quizQs];const opts=[...a[qi].opts];opts[oi]=e.target.value;a[qi]={...a[qi],opts};setQuiz(a);}} style={{...IB,flex:1,fontSize:"0.79rem",padding:"0.4rem 0.6rem"}} placeholder={`Option ${oi+1}`}/>
                      </div>
                    ))}
                  </div>
                  <p style={{color:"rgba(255,107,157,0.4)",fontSize:"0.63rem"}}>● = correct answer</p>
                </div>
              ))}
            </div>

            {/* Add question button */}
            {quizQs.length<8&&(
              <GBtn onClick={()=>setQuiz(p=>[...p,{q:"",opts:["","","",""],ans:0}])} style={{width:"100%",marginBottom:"0.9rem",fontSize:"0.82rem",padding:"0.55rem 1rem",border:"1px dashed rgba(255,107,157,0.3)",background:"rgba(255,107,157,0.05)"}}>
                + Add Question
              </GBtn>
            )}
            {quizQs.length>=8&&(
              <p style={{color:"rgba(255,255,255,0.2)",fontSize:"0.72rem",textAlign:"center",marginBottom:"0.9rem"}}>Maximum 8 questions reached</p>
            )}

            {/* Gallery */}
            <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:"0.85rem"}}>
              <label style={LB}>Photo Gallery (up to 4)</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.5rem",marginBottom:"0.7rem"}}>
                {galleryImgs.map((g,i)=>(
                  <ImgUp key={i} value={g} onChange={v=>{const a=[...galleryImgs];a[i]=v;setGallery(a);}} hint="Add photo" height="clamp(80px,25vw,110px)"/>
                ))}
              </div>
              <Field label="Gallery caption" value={galleryCaption} onChange={setGCaption} placeholder="Our favourite moments…" small/>
            </div>

            <div style={{display:"flex",gap:"0.6rem"}}>
              <GBtn onClick={back}>Back</GBtn>
              <PBtn onClick={next} style={{flex:1}}>Next</PBtn>
            </div>
          </div>
        )}

        {/* Step 11 — Scratch Card */}
        {ws===10&&(
          <div style={{animation:"fadeUp 0.38s ease"}}>
            <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.3rem,5vw,1.5rem)",fontWeight:700}}><GradText>Scratch Card Secret</GradText></h2>
              <p style={{color:"rgba(255,255,255,0.27)",fontSize:"0.73rem",marginTop:"0.25rem"}}>Your partner scratches away a panel to reveal your hidden message</p>
            </div>
            <div className="glass-gold" style={{padding:"1rem",marginBottom:"1rem",textAlign:"center"}}>
              <p style={{color:"rgba(255,215,0,0.7)",fontSize:"0.75rem",marginBottom:"0.5rem"}}>Preview of scratch card panel:</p>
              <div style={{background:"linear-gradient(135deg,#c0a020,#f0c040,#c0a020)",borderRadius:"12px",padding:"0.7rem",fontSize:"0.8rem",color:"#1a1000",fontWeight:600}}>✨ Scratch to reveal your secret ✨</div>
            </div>
            <TArea label="Hidden message (revealed after scratching)" value={scratchMsg} onChange={setScratch} placeholder={`${friendName||"You"}, I have a secret just for you… You are the most wonderful person I have ever met!`} rows={4}/>
            <div style={{display:"flex",gap:"0.6rem"}}>
              <GBtn onClick={back}>Back</GBtn>
              <PBtn onClick={next} style={{flex:1}}>Next</PBtn>
            </div>
          </div>
        )}

        {/* Step 12 — Love Letter + Letter from Future */}
        {ws===11&&(
          <div style={{animation:"fadeUp 0.38s ease"}}>
            <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.3rem,5vw,1.5rem)",fontWeight:700}}><GradText>Love Letter & Future</GradText></h2>
            </div>
            <label style={LB}>Animated Love Letter (4 lines — each line animates in like ink)</label>
            {letterLines.map((l,i)=>(
              <input key={i} className="rom-input" value={l} onChange={e=>uLetterLine(i,e.target.value)} placeholder={["My dearest darling,","Every day with you is a gift I never stop being grateful for.","You are the first thought in my morning and the last smile at night.","Yours, always and completely."][i]} style={{...IB,marginBottom:"0.5rem",fontSize:"0.87rem",fontFamily:"'Dancing Script',cursive"}}/>
            ))}
            <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:"0.85rem",marginTop:"0.3rem"}}>
              <label style={LB}>Letter from the Future</label>
              <Field label="Future year / date (e.g. 2035, Our 10th anniversary)" value={futureDate} onChange={setFDate} placeholder="e.g. February 14th, 2035"/>
              <TArea label="Write as your future self — what will you say?" value={futureLetter} onChange={setFLetter} placeholder={`My love, it's ${futureDate||"10 years from now"} and I'm writing to tell you that every single day has been even more beautiful than the last…`} rows={5}/>
            </div>
            <div style={{display:"flex",gap:"0.6rem"}}>
              <GBtn onClick={back}>Back</GBtn>
              <PBtn onClick={next} style={{flex:1}}>Next</PBtn>
            </div>
          </div>
        )}

        {/* Step 13 — Proposal & Celebration */}
        {ws===12&&(
          <div style={{animation:"fadeUp 0.38s ease"}}>
            <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.3rem,5vw,1.5rem)",fontWeight:700}}><GradText>Proposal & Celebration</GradText></h2>
            </div>
            <TArea label="Personal message (typewriter reveal)" value={personalMsg} onChange={setPM} placeholder={`Hey ${friendName||"you"}, you mean everything to me…`} rows={4}/>
            <Field label="Your proposal question" value={proposalQ} onChange={setPQ} placeholder={`Will you be my Valentine, ${friendName||""}?`}/>
            <TArea label="Poem / note inside proposal card" value={proposalPoem} onChange={setPPoem} placeholder={"Every moment with you feels like home…"} rows={3}/>
            <TArea label="Celebration message (shown after YES)" value={celebMsg} onChange={setCM} placeholder={`You are my favourite notification, my best reason to smile, and the greatest adventure of my life. Happy Valentine's Day, ${friendName||""}!`} rows={3}/>
            <div style={{display:"flex",gap:"0.6rem",marginTop:"0.4rem"}}>
              <GBtn onClick={back}>Back</GBtn>
              <PBtn onClick={generate} disabled={gen} style={{flex:1,fontSize:"1rem"}}>{gen?"Generating…":"Generate Proposal Link"}</PBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   SHARE SCREEN
════════════════════════════════════════════════════════ */
function ShareScreen({data,encoded}){
  const [copied,setCopied]=useState(false);
  const [toast,setToast]=useState(false);
  const url=`${window.location.origin}${window.location.pathname}#${encoded}`;

  // Display: just show domain + short hash snippet — NEVER show full link in UI
  const domain=window.location.origin.replace(/https?:\/\//,"");
  const line1=domain;
  const line2=encoded?"/#"+encoded.slice(0,12)+"…"+encoded.slice(-8)+" ("+Math.round(encoded.length/1024*10)/10+"kb)":"";

  function copyLink(){
    try{navigator.clipboard.writeText(url);}catch(e){
      const ta=document.createElement("textarea");
      ta.value=url;ta.style.cssText="position:fixed;opacity:0;top:0;left:0;";
      document.body.appendChild(ta);ta.focus();ta.select();
      try{document.execCommand("copy");}catch{}
      document.body.removeChild(ta);
    }
    setCopied(true);setToast(true);
    setTimeout(()=>setCopied(false),3000);
    setTimeout(()=>setToast(false),2500);
  }

  function openPreview(){
    window.location.hash=encoded;
    window.location.reload();
  }

  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1}}>
      <ThemeToggle light={false} setLight={()=>{}}/>

      {/* Floating toast — appears top-center on copy */}
      {toast&&(
        <div style={{position:"fixed",top:"4.5rem",left:"50%",transform:"translateX(-50%)",zIndex:9999,background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",padding:"0.6rem 1.4rem",borderRadius:"50px",fontSize:"0.85rem",fontWeight:600,boxShadow:"0 4px 20px rgba(16,185,129,0.45)",animation:"fadeUp 0.3s ease",whiteSpace:"nowrap"}}>
          ✓ Link copied to clipboard!
        </div>
      )}

      <div className="glass-deep wpad" style={{width:"100%",maxWidth:"640px",padding:"2.4rem 2.2rem",zIndex:2,textAlign:"center"}}>
        <div style={{width:"56px",height:"56px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,107,157,0.25),rgba(168,85,247,0.2))",border:"1px solid rgba(255,107,157,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem",fontSize:"1.4rem"}}>✓</div>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.5rem,5vw,1.9rem)",fontWeight:700}}><GradText>Proposal Ready!</GradText></h1>
        <p style={{color:"rgba(255,255,255,0.38)",fontSize:"0.84rem",marginTop:"0.45rem",lineHeight:1.75}}>Send this to <strong style={{color:"#ffb3c8"}}>{data.friendName}</strong> — the full experience plays instantly.</p>
        {data.nickname&&<p style={{color:"rgba(255,215,0,0.5)",fontSize:"0.78rem",marginTop:"0.3rem",fontStyle:"italic"}}>"{data.nickname}"</p>}

        {/* Link box — max 2 lines, no overflow */}
        <div className="glass-rose" style={{padding:"1.1rem 1.2rem",marginTop:"1.5rem",textAlign:"left"}}>
          <p style={{color:"rgba(255,200,230,0.5)",fontSize:"0.65rem",marginBottom:"0.6rem",letterSpacing:"0.06em",fontWeight:600}}>SHAREABLE LINK</p>

          {/* 2-line link preview — strictly contained, no wrapping */}
          <div style={{background:"rgba(0,0,0,0.22)",border:"1px solid rgba(255,107,157,0.18)",borderRadius:"10px",padding:"0.55rem 0.85rem",marginBottom:"0.7rem"}}>
            <p style={{color:"rgba(255,255,255,0.65)",fontSize:"0.75rem",fontFamily:"monospace",fontWeight:500,lineHeight:1.5,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{line1}</p>
            <p style={{color:"rgba(255,255,255,0.3)",fontSize:"0.68rem",fontFamily:"monospace",lineHeight:1.5,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{line2}</p>
          </div>

          {/* Buttons */}
          <div style={{display:"flex",gap:"0.6rem"}}>
            <PBtn onClick={copyLink} style={{flex:1,padding:"0.7rem",fontSize:"0.88rem",animation:"none",boxShadow:"none",background:copied?"linear-gradient(135deg,#10b981,#059669)":undefined}}>
              {copied?"✓ Copied!":"📋 Copy Link"}
            </PBtn>
            <PBtn onClick={openPreview} style={{flex:1,padding:"0.7rem",fontSize:"0.88rem",animation:"none",background:"linear-gradient(135deg,#6b21a8,#7c3aed)",boxShadow:"none"}}>
              👁 Preview
            </PBtn>
          </div>
          <p style={{color:"rgba(255,255,255,0.18)",fontSize:"0.65rem",marginTop:"0.45rem",textAlign:"center"}}>Paste in WhatsApp · Instagram · SMS · Email</p>
        </div>

        {/* How it works */}
        <div className="glass-gold" style={{padding:"0.85rem 1rem",marginTop:"0.75rem",textAlign:"left"}}>
          <p style={{color:"#ffd700",fontSize:"0.72rem",fontWeight:600,marginBottom:"0.35rem"}}>How to share</p>
          {["Copy the link above","Open WhatsApp / Instagram / SMS","Paste and send to "+data.friendName,"They tap it — proposal opens instantly ✓"].map((s,i)=>(
            <p key={i} style={{color:"rgba(255,255,255,0.37)",fontSize:"0.7rem",lineHeight:1.7}}><span style={{color:"#ff6b9d",marginRight:"0.3rem"}}>—</span>{s}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   COUNTDOWN
════════════════════════════════════════════════════════ */
function Countdown({data,onDone}){
  const [n,setN]=useState(3);
  useEffect(()=>{if(n<=0){setTimeout(onDone,900);return;}const t=setTimeout(()=>setN(c=>c-1),1200);return()=>clearTimeout(t);},[n]);
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",zIndex:1,gap:"1.4rem",padding:"2rem"}}>
      {data.nickname&&<p style={{color:"rgba(255,215,0,0.55)",fontSize:"0.82rem",fontStyle:"italic",marginBottom:"-0.5rem"}}>{data.nickname}</p>}
      <p style={{color:"rgba(255,255,255,0.32)",fontSize:"clamp(0.85rem,3.5vw,1rem)",animation:"fadeIn 0.5s ease",textAlign:"center"}}>
        Something beautiful is waiting for you, <span style={{color:"#ffb3c8",fontStyle:"italic"}}>{data.friendName}</span>…
      </p>
      {n>0?(
        <div key={n} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(80px,22vw,140px)",fontWeight:900,lineHeight:1,background:"linear-gradient(135deg,#ff6b9d,#ffd700,#c084fc)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"countNum 0.85s cubic-bezier(0.34,1.56,0.64,1)"}}>{n}</div>
      ):(
        <div style={{width:"72px",height:"72px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,107,157,0.25),rgba(168,85,247,0.2))",border:"1px solid rgba(255,107,157,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.8rem",animation:"heartBeat 0.9s ease"}}>♡</div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   TIMELINE
════════════════════════════════════════════════════════ */
function Timeline({data,onNext}){
  const [visible,setVisible]=useState(0);
  useEffect(()=>{if(visible<data.mems.length){const t=setTimeout(()=>setVisible(v=>v+1),680);return()=>clearTimeout(t);}},[visible]);
  return(
    <div style={{minHeight:"100vh",padding:"5rem 1.2rem 3rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"540px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"2.5rem",animation:"fadeUp 0.6s ease"}}>
          <h2 className="htitle" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,7vw,2.5rem)",fontWeight:700}}><GradText>Our Story</GradText></h2>
          <p style={{color:"rgba(255,255,255,0.27)",fontSize:"0.84rem",marginTop:"0.35rem"}}>{data.nickname||`${data.yourName} & ${data.friendName}`}</p>
          {data.coupleDate&&<p style={{color:"rgba(255,107,157,0.48)",fontSize:"0.76rem",marginTop:"0.18rem"}}>Since {data.coupleDate}</p>}
        </div>
        <div style={{position:"relative",paddingLeft:"2.2rem"}}>
          <div style={{position:"absolute",left:"0.65rem",top:"8px",bottom:"8px",width:"2px",background:"linear-gradient(to bottom,#ff6b9d,#c084fc,#ffd700,transparent)",borderRadius:"2px",boxShadow:"0 0 8px rgba(255,107,157,0.28)"}}/>
          {data.mems.map((m,i)=>{
            const txt=m.userNote||m.note;const vis=i<visible;
            return(
              <div key={m.key} style={{marginBottom:"1.3rem",position:"relative",opacity:vis?1:0,transform:vis?"translateX(0)":"translateX(-24px)",transition:`opacity 0.55s ease ${i*0.07}s,transform 0.55s ease ${i*0.07}s`}}>
                <div style={{position:"absolute",left:"-2.33rem",top:"1.1rem",width:"14px",height:"14px",borderRadius:"50%",background:"linear-gradient(135deg,#ff6b9d,#c084fc)",border:"2.5px solid var(--bg1)",boxShadow:"0 0 10px rgba(255,107,157,0.75)"}}/>
                <div className="glass" style={{overflow:"hidden"}}>
                  {m.img&&<img src={m.img} alt={m.title} style={{width:"100%",height:"clamp(130px,40vw,190px)",objectFit:"cover",display:"block"}}/>}
                  <div style={{padding:"0.92rem 1.05rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.48rem",marginBottom:"0.28rem"}}>
                      <span style={{fontSize:"1.15rem"}}>{m.emoji}</span>
                      <span style={{color:"#ffb3c8",fontWeight:600,fontSize:"0.94rem",fontFamily:"'Cormorant Garamond',serif"}}>{m.title}</span>
                    </div>
                    <p style={{color:"rgba(255,255,255,0.44)",fontSize:"0.8rem",lineHeight:1.65}}>{txt}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {visible>=data.mems.length&&(
          <div style={{textAlign:"center",marginTop:"2.5rem",animation:"fadeUp 0.7s ease"}}>
            <PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>There's more…</PBtn>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   GALLERY PAGE
════════════════════════════════════════════════════════ */
function GalleryPage({data,onNext}){
  const imgs=data.galleryImgs||[];
  const [shown,setShown]=useState(false);
  useEffect(()=>{if(!imgs.length){onNext();return;}setTimeout(()=>setShown(true),200);},[]);
  if(!imgs.length)return null;
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"520px",width:"100%",textAlign:"center"}}>
        <div style={{animation:"fadeUp 0.6s ease"}}>
          <h2 className="htitle" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,7vw,2.3rem)",fontWeight:700,marginBottom:"0.4rem"}}><GradText>Us, in Pictures</GradText></h2>
          <p style={{color:"rgba(255,255,255,0.27)",fontSize:"0.82rem",marginBottom:"1.8rem"}}>{data.galleryCaption||"Captured moments, forever ours"}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:imgs.length===1?"1fr":"repeat(2,1fr)",gap:"0.55rem",marginBottom:"2rem"}}>
          {imgs.map((img,i)=>(
            <div key={i} className="glass" style={{overflow:"hidden",borderRadius:"18px",animation:`galleryIn 0.5s ease ${i*0.12}s both`,opacity:shown?1:0}}>
              <img src={img} alt="" style={{width:"100%",height:"clamp(120px,35vw,200px)",objectFit:"cover",display:"block"}}/>
            </div>
          ))}
        </div>
        <PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>And there's even more…</PBtn>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   REASONS PAGE
════════════════════════════════════════════════════════ */
function ReasonsPage({data,onNext}){
  const [shown,setShown]=useState(0);
  const filled=(data.reasons||[]).filter(r=>r.trim());
  useEffect(()=>{if(shown<filled.length){const t=setTimeout(()=>setShown(v=>v+1),480);return()=>clearTimeout(t);}},[shown]);
  return(
    <div style={{minHeight:"100vh",padding:"5rem 1.2rem 3rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"520px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"2.5rem",animation:"fadeUp 0.6s ease"}}>
          <h2 className="htitle" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,7vw,2.4rem)",fontWeight:700}}><GradText>Why I Love You</GradText></h2>
          <p style={{color:"rgba(255,255,255,0.27)",fontSize:"0.82rem",marginTop:"0.35rem"}}>…let me count the ways</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
          {filled.map((rv,i)=>(
            <div key={i} className="glass-card" style={{padding:"0.95rem 1.15rem",display:"flex",gap:"0.82rem",alignItems:"flex-start",opacity:i<shown?1:0,transform:i<shown?"translateX(0)":"translateX(-20px)",transition:`opacity 0.5s ease ${i*0.05}s,transform 0.5s ease ${i*0.05}s`}}>
              <div style={{flexShrink:0,width:"25px",height:"25px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,107,157,0.3),rgba(168,85,247,0.2))",border:"1px solid rgba(255,107,157,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.69rem",color:"rgba(255,107,157,0.9)"}}>{i+1}</div>
              <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.85rem,3.2vw,0.95rem)",lineHeight:1.7,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300}}>{rv}</p>
            </div>
          ))}
        </div>
        {shown>=filled.length&&(
          <div style={{textAlign:"center",marginTop:"2.5rem",animation:"fadeUp 0.7s ease"}}>
            <PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>And there's more…</PBtn>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   PLEDGE PAGE
════════════════════════════════════════════════════════ */
function PledgePage({data,onNext}){
  const [shown,setShown]=useState(0);
  const [accepted,setAccepted]=useState(false);
  const filled=(data.pledges||[]).filter(p=>p.trim());
  useEffect(()=>{if(shown<filled.length){const t=setTimeout(()=>setShown(v=>v+1),600);return()=>clearTimeout(t);}},[shown]);
  return(
    <div style={{minHeight:"100vh",padding:"5rem 1.2rem 3rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"520px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"2.5rem",animation:"fadeUp 0.6s ease"}}>
          <h2 className="htitle" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,7vw,2.3rem)",fontWeight:700}}><GradText>My Promises to You</GradText></h2>
          <p style={{color:"rgba(255,255,255,0.27)",fontSize:"0.82rem",marginTop:"0.35rem"}}>from {data.yourName}, with all my heart</p>
        </div>
        <div className="glass-deep" style={{padding:"1.6rem 1.4rem",marginBottom:"1.8rem"}}>
          {filled.map((pv,i)=>(
            <div key={i} style={{display:"flex",gap:"0.85rem",alignItems:"flex-start",marginBottom:i<filled.length-1?"1.1rem":0,opacity:i<shown?1:0,transform:i<shown?"translateX(0)":"translateX(-16px)",transition:`opacity 0.5s ease ${i*0.1}s,transform 0.5s ease ${i*0.1}s`}}>
              <div style={{flexShrink:0,width:"26px",height:"26px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,107,157,0.22),rgba(168,85,247,0.15))",border:"1px solid rgba(255,107,157,0.28)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.7rem",color:"rgba(255,215,0,0.8)"}}>♡</div>
              <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.88rem,3.3vw,0.97rem)",lineHeight:1.72,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300}}>I promise {pv.toLowerCase().replace(/^i promise /,"")}</p>
            </div>
          ))}
        </div>
        {shown>=filled.length&&!accepted&&(
          <div style={{textAlign:"center",animation:"fadeUp 0.6s ease"}}>
            <p style={{color:"rgba(255,255,255,0.3)",fontSize:"0.8rem",marginBottom:"1rem",fontStyle:"italic"}}>Do you accept these promises?</p>
            <PBtn onClick={()=>setAccepted(true)} style={{fontSize:"1rem",padding:"0.95rem 2.4rem"}}>I accept, always</PBtn>
          </div>
        )}
        {accepted&&(
          <div style={{textAlign:"center",animation:"scaleIn 0.5s ease"}}>
            <div className="glass-rose" style={{padding:"1.2rem",marginBottom:"1.4rem"}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",color:"rgba(255,255,255,0.7)",fontSize:"1rem",fontStyle:"italic",lineHeight:1.7}}>And I promise to keep every single one, every single day.</p>
            </div>
            <PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>There's still more…</PBtn>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   SONG PAGE
════════════════════════════════════════════════════════ */
function SongPage({data,onNext}){
  const [done,setDone]=useState(false);
  const hasSong=!!(data.songTitle?.trim());
  useEffect(()=>{if(!hasSong)onNext();},[]);
  if(!hasSong)return null;
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"480px",width:"100%",textAlign:"center",animation:"fadeUp 0.6s ease"}}>
        <div style={{width:"66px",height:"66px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,107,157,0.2),rgba(168,85,247,0.15))",border:"1px solid rgba(255,107,157,0.28)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.2rem",fontSize:"1.6rem",animation:"floatBob 3s ease infinite"}}>♪</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.6rem,6vw,2.2rem)",fontWeight:700,marginBottom:"0.5rem"}}><GradText>Our Song</GradText></h2>
        <div className="glass-rose" style={{padding:"1.7rem",marginTop:"1.4rem"}}>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.2rem,5vw,1.5rem)",fontWeight:600,color:"#fff",marginBottom:"0.28rem"}}>{data.songTitle}</p>
          {data.songArtist&&<p style={{color:"rgba(255,255,255,0.42)",fontSize:"0.86rem",marginBottom:"1rem"}}>by {data.songArtist}</p>}
          {data.songNote&&<p style={{color:"rgba(255,255,255,0.6)",fontSize:"clamp(0.85rem,3.2vw,0.91rem)",lineHeight:1.85,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}><Typewriter text={`"${data.songNote}"`} speed={25} onDone={()=>setDone(true)}/></p>}
          {!data.songNote&&<p style={{color:"rgba(255,107,157,0.48)",fontSize:"0.8rem"}}>This song makes me think of you every time.</p>}
        </div>
        {(done||!data.songNote)&&<div style={{marginTop:"1.9rem",animation:"fadeUp 0.6s ease"}}><PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>Almost there…</PBtn></div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ANIMATED LOVE LETTER — ink drop animation, wax seal
════════════════════════════════════════════════════════ */
function LoveLetterPage({data,onNext}){
  const [lineIdx,setLineIdx]=useState(-1);
  const [sealed,setSealed]=useState(false);
  const [opened,setOpened]=useState(false);
  const lines=(data.letterLines||[]).filter(l=>l.trim());
  const defLines=["My dearest darling,","Every day with you is a gift I never stop being grateful for.","You are the first thought in my morning and the last smile at night.","Yours, always and completely."];
  const displayLines=lines.length?lines:defLines;

  useEffect(()=>{
    if(!opened)return;
    const t=setTimeout(()=>{
      setLineIdx(i=>{
        if(i<displayLines.length-1)return i+1;
        setTimeout(()=>setSealed(true),600);
        return i;
      });
    },lineIdx===-1?800:900);
    return()=>clearTimeout(t);
  },[lineIdx,opened]);

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"500px",width:"100%",textAlign:"center"}}>
        <div style={{animation:"fadeUp 0.6s ease",marginBottom:"1.5rem"}}>
          <h2 className="htitle" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,7vw,2.3rem)",fontWeight:700}}><GradText>A Letter for You</GradText></h2>
          <p style={{color:"rgba(255,255,255,0.27)",fontSize:"0.82rem",marginTop:"0.35rem"}}>written with every heartbeat</p>
        </div>

        {/* Envelope (before open) */}
        {!opened&&(
          <div style={{animation:"letterFloat 3s ease infinite"}}>
            <div className="glass-letter" style={{padding:"2.5rem 2rem",marginBottom:"1.5rem",position:"relative"}}>
              {/* Envelope flap */}
              <div style={{position:"absolute",top:0,left:0,right:0,height:"60px",background:"linear-gradient(135deg,rgba(255,215,0,0.12),rgba(255,107,157,0.1))",borderRadius:"16px 16px 0 0",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{width:"0",height:"0",borderLeft:"120px solid transparent",borderRight:"120px solid transparent",borderTop:"45px solid rgba(255,215,0,0.15)"}}/>
              </div>
              <div style={{marginTop:"40px"}}>
                <p style={{fontFamily:"'Dancing Script',cursive",fontSize:"clamp(1.1rem,4vw,1.4rem)",color:"rgba(255,255,255,0.65)",lineHeight:1.8}}>To: {data.friendName}</p>
                <p style={{fontFamily:"'Dancing Script',cursive",fontSize:"0.9rem",color:"rgba(255,107,157,0.5)",marginTop:"0.3rem"}}>with love from {data.yourName}</p>
                {/* Wax seal */}
                <div style={{width:"52px",height:"52px",borderRadius:"50%",background:"linear-gradient(135deg,#c0392b,#e74c3c)",border:"3px solid rgba(255,215,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",margin:"1rem auto 0",fontSize:"1.2rem",boxShadow:"0 4px 14px rgba(192,57,43,0.4)",animation:"sealPop 0.5s cubic-bezier(0.34,1.56,0.64,1)"}}>♡</div>
              </div>
            </div>
            <PBtn onClick={()=>setOpened(true)} style={{fontSize:"1rem",padding:"0.95rem 2.4rem"}}>Open the letter</PBtn>
          </div>
        )}

        {/* Opened letter */}
        {opened&&(
          <div style={{animation:"envelopeOpen 0.5s ease"}}>
            <div className="glass-letter" style={{padding:"2rem 1.8rem",textAlign:"left",minHeight:"200px",position:"relative",marginBottom:"1.5rem"}}>
              {/* Paper lines background */}
              {Array.from({length:8},(_,i)=>(
                <div key={i} style={{position:"absolute",left:"1.8rem",right:"1.8rem",top:`${3.5+i*1.75}rem`,height:"1px",background:"rgba(255,215,0,0.07)"}}/>
              ))}
              <div style={{position:"relative",zIndex:1}}>
                {displayLines.map((line,i)=>(
                  <p key={i} style={{
                    fontFamily:"'Dancing Script',cursive",
                    fontSize:`clamp(${i===0?"1rem":"0.95rem"},3.5vw,${i===0?"1.25rem":"1.1rem"})`,
                    color:i===0?"rgba(255,215,0,0.85)":i===displayLines.length-1?"rgba(255,107,157,0.8)":"rgba(255,255,255,0.75)",
                    lineHeight:1.9,
                    marginBottom:"0.35rem",
                    opacity:i<=lineIdx?1:0,
                    transform:i<=lineIdx?"translateY(0)":"translateY(-4px)",
                    transition:`opacity 0.6s ease,transform 0.6s ease`,
                    animation:i<=lineIdx?`inkDrop 0.5s ease ${i*0.05}s`:"none",
                  }}>{line}</p>
                ))}
              </div>
              {/* Closing wax seal */}
              {sealed&&(
                <div style={{textAlign:"center",marginTop:"0.8rem",animation:"sealRotate 0.6s cubic-bezier(0.34,1.56,0.64,1)"}}>
                  <div style={{width:"40px",height:"40px",borderRadius:"50%",background:"linear-gradient(135deg,#c0392b,#e74c3c)",border:"2px solid rgba(255,215,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",fontSize:"1rem",boxShadow:"0 3px 10px rgba(192,57,43,0.4)"}}>♡</div>
                </div>
              )}
            </div>
            {sealed&&<div style={{animation:"fadeUp 0.6s ease"}}><PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>I have even more for you…</PBtn></div>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   SCRATCH CARD PAGE
════════════════════════════════════════════════════════ */
function ScratchPage({data,onNext}){
  const canvasRef=useRef();
  const [revealed,setRevealed]=useState(false);
  const [pct,setPct]=useState(0);
  const isDrawing=useRef(false);
  const msg=data.scratchMsg||`${data.friendName}, I have a secret just for you — you are the most wonderful, beautiful person, and I am the luckiest to have you in my life!`;

  useEffect(()=>{
    const c=canvasRef.current;if(!c)return;
    const ctx=c.getContext("2d");
    c.width=c.offsetWidth;c.height=c.offsetHeight;
    // Gold scratch layer
    const g=ctx.createLinearGradient(0,0,c.width,c.height);
    g.addColorStop(0,"#b8860b");g.addColorStop(0.3,"#ffd700");g.addColorStop(0.6,"#daa520");g.addColorStop(1,"#b8860b");
    ctx.fillStyle=g;ctx.fillRect(0,0,c.width,c.height);
    // Scratch text
    ctx.fillStyle="rgba(100,60,0,0.55)";ctx.font="bold 14px DM Sans";ctx.textAlign="center";
    ctx.fillText("✨ Scratch here to reveal your secret ✨",c.width/2,c.height/2-8);
    ctx.font="12px DM Sans";ctx.fillText("Use mouse or finger",c.width/2,c.height/2+14);
  },[]);

  function scratch(x,y){
    const c=canvasRef.current;if(!c)return;
    const ctx=c.getContext("2d");
    const r=c.getBoundingClientRect();
    const cx=x-r.left,cy=y-r.top;
    ctx.globalCompositeOperation="destination-out";
    ctx.beginPath();ctx.arc(cx,cy,22,0,Math.PI*2);ctx.fill();
    // Check % scratched
    const d=ctx.getImageData(0,0,c.width,c.height).data;
    let t=0;for(let i=3;i<d.length;i+=4)if(d[i]<128)t++;
    const p=Math.round(t/(c.width*c.height)*100);
    setPct(p);
    if(p>60&&!revealed)setRevealed(true);
  }
  function onMouse(e){if(!isDrawing.current)return;scratch(e.clientX,e.clientY);}
  function onTouch(e){e.preventDefault();const t=e.touches[0];scratch(t.clientX,t.clientY);}

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"480px",width:"100%",textAlign:"center"}}>
        <div style={{animation:"fadeUp 0.6s ease",marginBottom:"1.8rem"}}>
          <h2 className="htitle" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,7vw,2.3rem)",fontWeight:700}}><GradText>Your Secret Reveal</GradText></h2>
          <p style={{color:"rgba(255,255,255,0.27)",fontSize:"0.82rem",marginTop:"0.35rem"}}>{data.yourName} left a secret just for you</p>
        </div>

        <div style={{position:"relative",borderRadius:"20px",overflow:"hidden",marginBottom:"1.5rem",boxShadow:"0 12px 40px rgba(0,0,0,0.5)"}}>
          {/* Hidden message behind */}
          <div className="glass-rose" style={{padding:"2rem 1.5rem",borderRadius:"20px",minHeight:"140px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(0.95rem,3.5vw,1.1rem)",color:"rgba(255,255,255,0.8)",lineHeight:1.85,fontStyle:"italic",fontWeight:300,animation:revealed?"scratchReveal 0.6s ease":"none"}}>
              "{msg}"
            </p>
          </div>
          {/* Scratch canvas on top */}
          <canvas ref={canvasRef} onMouseDown={()=>isDrawing.current=true} onMouseUp={()=>isDrawing.current=false} onMouseMove={onMouse} onTouchStart={()=>isDrawing.current=true} onTouchEnd={()=>isDrawing.current=false} onTouchMove={onTouch}
            style={{position:"absolute",inset:0,width:"100%",height:"100%",borderRadius:"20px",touchAction:"none",opacity:revealed?0:1,transition:"opacity 0.8s ease",cursor:"crosshair"}}/>
        </div>

        <p style={{color:"rgba(255,255,255,0.28)",fontSize:"0.75rem",marginBottom:"1.2rem"}}>
          {revealed?"✨ Secret revealed! ✨":`${pct}% scratched — keep going!`}
        </p>

        {revealed&&(
          <div style={{animation:"fadeUp 0.6s ease"}}>
            <PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>There's even more waiting…</PBtn>
          </div>
        )}
        {!revealed&&<GBtn onClick={()=>{setRevealed(true);const c=canvasRef.current;if(c){const ctx=c.getContext("2d");ctx.clearRect(0,0,c.width,c.height);}}} style={{fontSize:"0.78rem",padding:"0.42rem 1rem"}}>Reveal all</GBtn>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   LETTER FROM THE FUTURE
════════════════════════════════════════════════════════ */
function FuturePage({data,onNext}){
  const [open,setOpen]=useState(false);
  const [done,setDone]=useState(false);
  const hasLetter=!!(data.futureLetter?.trim());
  useEffect(()=>{if(!hasLetter)onNext();},[]);
  if(!hasLetter)return null;

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"500px",width:"100%",textAlign:"center"}}>
        <div style={{animation:"fadeUp 0.6s ease",marginBottom:"1.8rem"}}>
          <h2 className="htitle" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,7vw,2.3rem)",fontWeight:700}}><GradText>A Letter from the Future</GradText></h2>
          {data.futureDate&&<p style={{color:"rgba(255,215,0,0.55)",fontSize:"0.82rem",marginTop:"0.35rem",fontStyle:"italic"}}>{data.futureDate}</p>}
        </div>

        {!open?(
          <div style={{animation:"letterFloat 4s ease infinite"}}>
            <div className="glass-letter" style={{padding:"2rem",marginBottom:"1.5rem",position:"relative",overflow:"hidden"}}>
              {/* Aged paper texture lines */}
              {Array.from({length:6},(_,i)=><div key={i} style={{position:"absolute",left:0,right:0,top:`${15+i*14}%`,height:"1px",background:"rgba(255,215,0,0.06)"}}/>)}
              <div style={{position:"relative"}}>
                <div style={{width:"48px",height:"48px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,215,0,0.2),rgba(255,107,157,0.15))",border:"1px solid rgba(255,215,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem",fontSize:"1.2rem"}}>⏳</div>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1rem,4vw,1.2rem)",color:"rgba(255,255,255,0.6)",fontStyle:"italic",lineHeight:1.75}}>
                  This letter was written by a future version of {data.yourName}.<br/>
                  <span style={{color:"rgba(255,215,0,0.6)",fontSize:"0.9rem"}}>Are you ready to read it?</span>
                </p>
              </div>
            </div>
            <PBtn onClick={()=>setOpen(true)} style={{fontSize:"1rem",padding:"0.95rem 2.4rem"}}>Open the time capsule</PBtn>
          </div>
        ):(
          <div style={{animation:"pageFlip 0.6s ease"}}>
            <div className="glass-letter" style={{padding:"2rem 1.7rem",textAlign:"left",marginBottom:"1.6rem",position:"relative"}}>
              {Array.from({length:10},(_,i)=><div key={i} style={{position:"absolute",left:"1.7rem",right:"1.7rem",top:`${2.5+i*1.9}rem`,height:"1px",background:"rgba(255,215,0,0.06)"}}/>)}
              <div style={{position:"relative"}}>
                <p style={{fontFamily:"'Dancing Script',cursive",color:"rgba(255,215,0,0.7)",fontSize:"clamp(0.85rem,3vw,0.95rem)",marginBottom:"1rem",fontStyle:"italic"}}>
                  {data.futureDate||"From the future"} · a letter to {data.friendName}
                </p>
                <p style={{fontFamily:"'Cormorant Garamond',serif",color:"rgba(255,255,255,0.75)",fontSize:"clamp(0.9rem,3.5vw,1rem)",lineHeight:1.9,fontStyle:"italic",fontWeight:300,whiteSpace:"pre-line"}}>
                  <Typewriter text={data.futureLetter} speed={20} onDone={()=>setDone(true)}/>
                </p>
              </div>
            </div>
            {done&&<div style={{animation:"fadeUp 0.6s ease"}}><PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>I'm ready for what's next…</PBtn></div>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   QUIZ PAGE
════════════════════════════════════════════════════════ */
function QuizPage({data,onNext}){
  const [qi,setQi]=useState(0);const [score,setScore]=useState(0);const [chosen,setChosen]=useState(null);const [done,setDone]=useState(false);
  const qs=data.quizQs||[];
  if(!qs.length){onNext();return null;}
  function pick(oi){if(chosen!==null)return;setChosen(oi);if(oi===qs[qi].ans)setScore(s=>s+1);setTimeout(()=>{if(qi+1<qs.length){setQi(q=>q+1);setChosen(null);}else setDone(true);},1000);}
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"480px",width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:"2rem",animation:"fadeUp 0.5s ease"}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.6rem,6vw,2.1rem)",fontWeight:700}}><GradText>Friendship Quiz</GradText></h2>
          <p style={{color:"rgba(255,255,255,0.28)",fontSize:"0.8rem",marginTop:"0.28rem"}}>How well do you know {data.yourName}?</p>
        </div>
        {!done?(
          <div style={{animation:"quizPop 0.4s ease"}} key={qi}>
            <div className="glass-deep" style={{padding:"1.5rem 1.35rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
                <span style={{color:"rgba(255,107,157,0.6)",fontSize:"0.73rem",fontWeight:600}}>Q{qi+1}/{qs.length}</span>
                <div style={{display:"flex",gap:"4px"}}>{qs.map((_,i)=><div key={i} style={{width:"7px",height:"7px",borderRadius:"50%",background:i<qi?"linear-gradient(135deg,#ff6b9d,#c084fc)":i===qi?"rgba(255,107,157,0.5)":"rgba(255,255,255,0.1)"}}/>)}</div>
              </div>
              <p style={{color:"#fff",fontSize:"clamp(0.95rem,3.8vw,1.08rem)",fontFamily:"'Cormorant Garamond',serif",fontWeight:600,lineHeight:1.5,marginBottom:"1.25rem"}}>{qs[qi].q}</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem"}}>
                {qs[qi].opts.map((o,oi)=>{let cls="glass-quiz";if(chosen!==null&&oi===qs[qi].ans)cls+=" correct";else if(chosen===oi&&oi!==qs[qi].ans)cls+=" wrong";
                  return(<button key={oi} onClick={()=>pick(oi)} className={cls} style={{padding:"0.72rem 0.65rem",color:chosen!==null&&oi===qs[qi].ans?"#34d399":chosen===oi?"#f87171":"rgba(255,255,255,0.72)",fontSize:"clamp(0.78rem,2.8vw,0.86rem)",textAlign:"center",lineHeight:1.4,border:"none",width:"100%"}}>{o}</button>);
                })}
              </div>
            </div>
          </div>
        ):(
          <div style={{textAlign:"center",animation:"scaleIn 0.5s ease"}}>
            <div className="glass-rose" style={{padding:"2rem 1.5rem",marginBottom:"1.8rem"}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,7vw,2.5rem)",fontWeight:700,color:"#fff",marginBottom:"0.38rem"}}>{score}/{qs.length}</p>
              <p style={{color:"rgba(255,255,255,0.58)",fontSize:"1rem",lineHeight:1.7}}>{score===qs.length?"Perfect score!":score>qs.length/2?"You know them well!":"Room to learn more!"}</p>
            </div>
            <PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>Something special is next…</PBtn>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   DATE PLANNER
════════════════════════════════════════════════════════ */
function DatePlannerPage({data,onNext}){
  const [picked,setPicked]=useState(null);const [confirmed,setConfirmed]=useState(false);
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"520px",width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:"2rem",animation:"fadeUp 0.6s ease"}}>
          <h2 className="htitle" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,7vw,2.3rem)",fontWeight:700}}><GradText>Plan Our Date</GradText></h2>
          <p style={{color:"rgba(255,255,255,0.27)",fontSize:"0.82rem",marginTop:"0.35rem"}}>{data.friendName}, pick what sounds perfect</p>
        </div>
        {!confirmed?(
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"0.7rem",marginBottom:"1.5rem"}}>
              {DEF_DATES.map((d,i)=>(
                <button key={i} onClick={()=>setPicked(i)} className={`glass-date${picked===i?" picked":""}`} style={{padding:"1rem 0.9rem",textAlign:"center",border:"none",background:"inherit",animation:`datePop 0.4s ease ${i*0.07}s both`}}>
                  <div style={{fontSize:"1.7rem",marginBottom:"0.35rem"}}>{d.icon}</div>
                  <p style={{color:picked===i?"#ffb3c8":"rgba(255,255,255,0.75)",fontSize:"0.88rem",fontWeight:600,marginBottom:"0.18rem"}}>{d.label}</p>
                  <p style={{color:"rgba(255,255,255,0.35)",fontSize:"0.72rem"}}>{d.desc}</p>
                </button>
              ))}
            </div>
            {picked!==null&&<div style={{textAlign:"center",animation:"fadeUp 0.4s ease"}}><PBtn onClick={()=>setConfirmed(true)} style={{fontSize:"1rem",padding:"0.95rem 2.4rem"}}>Yes, let's do this!</PBtn></div>}
          </>
        ):(
          <div style={{textAlign:"center",animation:"scaleIn 0.5s ease"}}>
            <div className="glass-rose" style={{padding:"1.6rem",marginBottom:"1.6rem"}}>
              <div style={{fontSize:"2.5rem",marginBottom:"0.7rem"}}>{DEF_DATES[picked].icon}</div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.2rem,5vw,1.4rem)",color:"#fff",fontWeight:600,marginBottom:"0.4rem"}}>{DEF_DATES[picked].label}</p>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:"0.85rem",lineHeight:1.7}}>It's a date! {data.yourName} is going to love this.</p>
            </div>
            <PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>One last thing…</PBtn>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MESSAGE REVEAL
════════════════════════════════════════════════════════ */
function MessageReveal({data,onNext}){
  const [done,setDone]=useState(false);
  const msg=data.personalMsg||`${data.friendName}, you are not just my best friend — you are my home. The person I call at 2am, the one who knows every secret. You are the reason I smile for no reason at all.`;
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"520px",width:"100%",textAlign:"center"}}>
        <div style={{width:"54px",height:"54px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,107,157,0.22),rgba(168,85,247,0.15))",border:"1px solid rgba(255,107,157,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem",animation:"floatBob 3s ease infinite",fontSize:"1.2rem"}}>♡</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.5rem,6vw,1.9rem)",fontWeight:700,marginBottom:"1.5rem"}}><GradText>Hey {data.friendName}…</GradText></h2>
        <div className="glass-rose" style={{padding:"1.8rem 1.5rem"}}>
          <p style={{fontSize:"clamp(0.95rem,3.5vw,1.05rem)",lineHeight:2,color:"rgba(255,255,255,0.76)",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",fontWeight:300,minHeight:"80px"}}>
            <Typewriter text={`"${msg}"`} speed={26} onDone={()=>setDone(true)}/>
          </p>
        </div>
        {done&&<div style={{marginTop:"2.2rem",animation:"fadeUp 0.7s ease"}}><PBtn onClick={onNext} style={{fontSize:"1rem",padding:"1rem 2.6rem"}}>I have something to ask you…</PBtn></div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   VALENTINE PROPOSAL — NO same style pill as YES (purple)
════════════════════════════════════════════════════════ */
const NO_MSGS=["No","Please think again…","I love you the most","Seriously, say yes!","My heart is breaking…","You're my favourite person","I made this whole thing for you!","Last chance… flying away!"];

function ValentineProposal({data,onYes}){
  const [attempt,setAttempt]=useState(0);
  const [noPos,setNoPos]=useState({x:50,y:82});
  const [noGone,setNoGone]=useState(false);
  const [yesClicked,setYesClicked]=useState(false);
  const [flyOff,setFlyOff]=useState(false);
  function rnd(){return{x:7+Math.random()*80,y:12+Math.random()*75};}
  function handleNo(){if(noGone||flyOff)return;const next=attempt+1;setAttempt(next);if(next>=8){setFlyOff(true);setNoPos({x:130,y:130});setTimeout(()=>setNoGone(true),900);return;}setNoPos(rnd());}
  function handleYes(){setYesClicked(true);setTimeout(onYes,700);}
  const yesScale=Math.min(1+attempt*0.12,1.9);
  const question=data.proposalQ||`Will you be my Valentine, ${data.friendName}?`;
  const poem=data.proposalPoem||"Every moment with you feels like a dream I never want to wake up from. You make everything brighter, warmer, and more beautiful.";
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem 1.2rem",position:"relative",zIndex:1,overflow:"hidden"}}>
      <div style={{maxWidth:"520px",width:"100%",textAlign:"center",position:"relative",zIndex:2}}>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,7vw,3rem)",fontWeight:900,lineHeight:1.2,background:"linear-gradient(135deg,#ff6b9d 0%,#ffb3c8 25%,#ffd700 55%,#c084fc 85%)",backgroundSize:"300% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 5s linear infinite",marginBottom:"0.55rem"}}>{question}</h1>
        <p style={{color:"rgba(255,255,255,0.35)",fontSize:"clamp(0.85rem,3.5vw,0.96rem)",marginBottom:"1.7rem",lineHeight:1.7}}>From {data.yourName}, with every piece of my heart</p>
        <div className="glass-rose" style={{padding:"1.6rem 1.4rem",marginBottom:"2.1rem"}}>
          <p style={{color:"rgba(255,255,255,0.58)",fontSize:"clamp(0.85rem,3.2vw,0.91rem)",lineHeight:1.9,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{poem}</p>
        </div>
        <button onClick={handleYes} disabled={yesClicked} className="pill-yes" style={{padding:`${0.88*Math.min(yesScale,1.55)}rem ${2.2*Math.min(yesScale,1.65)}rem`,fontSize:`clamp(1rem,4.5vw,${1.05+attempt*0.1}rem)`,animation:yesClicked?"none":"glow 2s ease infinite, pulse 2.2s ease infinite",transform:yesClicked?"scale(1.08)":`scale(${Math.min(yesScale,1.72)})`,display:"block",margin:"0 auto",background:yesClicked?"linear-gradient(135deg,#34d399,#10b981)":undefined,boxShadow:yesClicked?"0 12px 40px rgba(52,211,153,0.4)":undefined,cursor:yesClicked?"default":"pointer"}}>
          {yesClicked?"Yes!!! Always!!":"Yes, Always!!"}
        </button>
        {attempt===0&&!noGone&&<p style={{color:"rgba(255,255,255,0.15)",fontSize:"0.65rem",marginTop:"1rem",fontStyle:"italic"}}>(there's also a No button somewhere on screen…)</p>}
        {attempt>0&&!noGone&&<p style={{color:"rgba(255,107,157,0.44)",fontSize:"0.69rem",marginTop:"0.85rem",fontStyle:"italic",animation:"fadeIn 0.4s ease"}}>{attempt===7?"One more hover and No escapes forever…":`Ran away ${attempt} time${attempt>1?"s":""}…`}</p>}
        {noGone&&<p style={{color:"rgba(255,215,0,0.55)",fontSize:"0.71rem",marginTop:"0.85rem",fontStyle:"italic",animation:"fadeUp 0.5s ease"}}>The No button has left. Only Yes remains.</p>}
      </div>
      {!noGone&&(
        <button onMouseEnter={handleNo} onClick={handleNo} className="pill-no" style={{position:"fixed",left:`${noPos.x}%`,top:`${noPos.y}%`,transform:"translate(-50%,-50%)",transition:flyOff?"left 0.8s cubic-bezier(0.55,0,1,0.45),top 0.8s cubic-bezier(0.55,0,1,0.45),opacity 0.8s ease":"left 0.42s cubic-bezier(0.34,1.56,0.64,1),top 0.42s cubic-bezier(0.34,1.56,0.64,1)",fontSize:`${Math.max(0.95-attempt*0.07,0.5)}rem`,padding:`${Math.max(0.75-attempt*0.04,0.45)}rem ${Math.max(1.6-attempt*0.08,0.9)}rem`,opacity:flyOff?0:Math.max(0.88-attempt*0.09,0.25),zIndex:50,userSelect:"none",pointerEvents:flyOff?"none":"auto",animation:attempt>0&&!flyOff?"noSlide 0.5s ease":"glowPurple 2.5s ease infinite"}}>
          {NO_MSGS[Math.min(attempt,NO_MSGS.length-1)]}
        </button>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CELEBRATION — editable + avatars
════════════════════════════════════════════════════════ */
function Celebration({data}){
  const [confetti,setConfetti]=useState(true);
  useEffect(()=>{const t=setTimeout(()=>setConfetti(false),8000);return()=>clearTimeout(t);},[]);
  const imgs=data.mems.map(m=>m.img).filter(Boolean);
  const celebMsg=data.celebMsg?.trim()||`You are my favourite notification, my best reason to smile, and the greatest adventure of my life. Happy Valentine's Day, ${data.friendName}.`;
  return(
    <>
      <Confetti active={confetti}/>
      <div style={{minHeight:"100vh",padding:"3rem 1.2rem",position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{maxWidth:"540px",width:"100%",textAlign:"center",position:"relative",zIndex:2}}>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,10vw,3.8rem)",fontWeight:900,lineHeight:1.1,background:"linear-gradient(135deg,#ffd700,#ff6b9d,#c084fc,#34d399)",backgroundSize:"400% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 3s linear infinite, rainbow 8s linear infinite",marginTop:"0.8rem"}}>She Said Yes!!</h1>
          {data.nickname&&<p style={{color:"rgba(255,215,0,0.6)",fontSize:"clamp(0.9rem,3.5vw,1.1rem)",fontWeight:600,marginTop:"0.5rem",fontStyle:"italic"}}>{data.nickname}</p>}
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:"clamp(0.82rem,3vw,0.9rem)",marginTop:"0.3rem",lineHeight:1.85}}>Valentines & Best Friends — now and forever</p>
          {imgs.length>0&&(
            <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(imgs.length,3)},1fr)`,gap:"0.42rem",marginTop:"1.7rem",borderRadius:"18px",overflow:"hidden",border:"1px solid rgba(255,107,157,0.2)"}}>
              {imgs.slice(0,3).map((img,i)=><img key={i} src={img} alt="" style={{width:"100%",height:"clamp(75px,24vw,108px)",objectFit:"cover",display:"block"}}/>)}
            </div>
          )}
          <div className="glass-rose" style={{padding:"1.5rem",marginTop:"1.6rem"}}>
            <p style={{color:"rgba(255,255,255,0.65)",fontSize:"clamp(0.85rem,3.2vw,0.93rem)",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:2}}>"{celebMsg}"</p>
            <p style={{color:"rgba(255,107,157,0.58)",fontSize:"0.75rem",marginTop:"0.72rem"}}>— {data.yourName}</p>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:"0.45rem",marginTop:"1.4rem"}}>
            {Array.from({length:5},(_,i)=><div key={i} style={{width:"7px",height:"7px",borderRadius:"50%",background:"linear-gradient(135deg,#ff6b9d,#c084fc)",opacity:0.5+i*0.1,animation:`starPulse ${1.5+i*0.3}s ${i*0.2}s ease infinite`}}/>)}
          </div>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════════════════ */
export default function App(){
  const [mode,setMode]=useState(null);
  const [phase,setPhase]=useState("setup");
  const [data,setData]=useState(null);
  const [encoded,setEncoded]=useState(null);

  useEffect(()=>{
    const hd=getHash();
    if(hd){setData(hd);setMode("viewer");setPhase("countdown");}
    else{setMode("creator");setPhase("setup");}
  },[]);

  function go(p){setPhase(p);window.scrollTo({top:0,behavior:"smooth"});}

  if(!mode)return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#07000d"}}>
      <div style={{width:"46px",height:"46px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,107,157,0.25),rgba(168,85,247,0.2))",border:"1px solid rgba(255,107,157,0.3)",animation:"pulse 1s ease infinite"}}/>
      <style>{buildCSS(THEMES.rose)}</style>
    </div>
  );

  const t=data?.theme||"rose";
  const hasReasons=data?.reasons?.filter(r=>r?.trim()).length>0;
  const hasSong=!!(data?.songTitle?.trim());
  const hasQuiz=!!(data?.quizQs?.length);
  const hasGallery=!!(data?.galleryImgs?.filter(Boolean).length);
  const hasPledges=!!(data?.pledges?.filter(p=>p?.trim()).length);
  const hasLetter=!!(data?.letterLines?.filter(l=>l?.trim()).length);
  const hasFuture=!!(data?.futureLetter?.trim());
  const hasScratch=!!(data?.scratchMsg?.trim());

  // Build viewer flow dynamically
  const flow=["countdown","timeline"];
  if(hasGallery)flow.push("gallery");
  if(hasReasons)flow.push("reasons");
  if(hasPledges)flow.push("pledges");
  if(hasSong)flow.push("song");
  if(hasLetter)flow.push("letter");
  if(hasScratch)flow.push("scratch");
  if(hasFuture)flow.push("future");
  if(hasQuiz)flow.push("quiz");
  flow.push("date","message","propose","celebrate");

  function nextPhase(){
    const idx=flow.indexOf(phase);
    if(idx<flow.length-1)go(flow[idx+1]);
  }

  return(
    <div style={{minHeight:"100vh",color:"#fff",overflowX:"hidden",position:"relative"}}>
      <style>{buildCSS(THEMES[t]||THEMES.rose)}</style>
      <RomanticBg theme={t}/>

      {mode==="creator"&&phase==="setup"&&(
        <SetupWizard onComplete={(d,e)=>{setData(d);setEncoded(e);setPhase("share");}}/>
      )}
      {mode==="creator"&&phase==="share"&&data&&encoded&&(
        <ShareScreen data={data} encoded={encoded}/>
      )}

      {mode==="viewer"&&data&&(
        <>
          {phase==="countdown" &&<Countdown    data={data}   onDone={nextPhase}/>}
          {phase==="timeline"  &&<Timeline     data={data}   onNext={nextPhase}/>}
          {phase==="gallery"   &&<GalleryPage  data={data}   onNext={nextPhase}/>}
          {phase==="reasons"   &&<ReasonsPage  data={data}   onNext={nextPhase}/>}
          {phase==="pledges"   &&<PledgePage   data={data}   onNext={nextPhase}/>}
          {phase==="song"      &&<SongPage     data={data}   onNext={nextPhase}/>}
          {phase==="letter"    &&<LoveLetterPage data={data} onNext={nextPhase}/>}
          {phase==="scratch"   &&<ScratchPage  data={data}   onNext={nextPhase}/>}
          {phase==="future"    &&<FuturePage   data={data}   onNext={nextPhase}/>}
          {phase==="quiz"      &&<QuizPage     data={data}   onNext={nextPhase}/>}
          {phase==="date"      &&<DatePlannerPage data={data} onNext={nextPhase}/>}
          {phase==="message"   &&<MessageReveal data={data}  onNext={nextPhase}/>}
          {phase==="propose"   &&<ValentineProposal data={data} onYes={nextPhase}/>}
          {phase==="celebrate" &&<Celebration  data={data}/>}
        </>
      )}
    </div>
  );
}