import {geoEquirectangular,geoPath,geoContains,geoDistance} from "d3-geo";
import {zoom,zoomIdentity} from "d3-zoom";
import {select,pointer} from "d3-selection";
import {feature} from "topojson-client";
import world from "world-atlas/countries-50m.json";
import {CITIES,EVENTS,SENT} from "./data.js";

// ---------- helpers ----------
const pad=n=>String(n).padStart(2,"0");
const now=new Date(),KEY=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
const hash=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const rng=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const R0=rng(hash(KEY));
const pick=(arr,n)=>{const a=[...arr],o=[];while(n--&&a.length)o.push(a.splice(Math.floor(R0()*a.length),1)[0]);return o};
const km=(a,b)=>geoDistance([a.lon,a.lat],[b.lon,b.lat])*6371;
const score=(d,free,scale)=>d<=free?100:Math.max(0,Math.round(100*Math.exp(-(d-free)/scale)));
const esc=t=>String(t).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const city=c=>({n:c[0],co:c[1],lat:c[2],lon:c[3],pop:c[4],rank:c[5],t:c[6],lang:c[7]});
const ENDO={Japanese:"日本語",Arabic:"العربية",Spanish:"Español",Swahili:"Kiswahili",English:"English",Turkish:"Türkçe",Thai:"ไทย",Russian:"Русский",Afrikaans:"Afrikaans",Indonesian:"Bahasa Indonesia",Portuguese:"Português",Icelandic:"Íslenska",Amharic:"አማርኛ",Vietnamese:"Tiếng Việt",French:"Français",Mongolian:"Монгол хэл"};
const endo=l=>l.split(" and ").map(x=>ENDO[x]||x).join(", ");

// ---------- map ----------
const countries=feature(world,world.objects.countries).features;
const proj=geoEquirectangular().scale(360/(2*Math.PI)).translate([180,90]);
const path=geoPath(proj);
const svg=select("#map");
const view=svg.append("g");
const land=view.append("g");
land.selectAll("path").data(countries).join("path").attr("class","country").attr("d",path).attr("data-name",d=>d.properties.name);
const pins=view.append("g");
let k=1;
const zb=zoom().scaleExtent([1,60]).translateExtent([[0,0],[360,180]]).on("zoom",e=>{k=e.transform.k;view.attr("transform",e.transform);draw()});
svg.call(zb);
const zbtn=(id,f)=>document.getElementById(id).onclick=f;
zbtn("zi",()=>svg.call(zb.scaleBy,2));zbtn("zo",()=>svg.call(zb.scaleBy,.5));zbtn("zr",()=>svg.call(zb.transform,zoomIdentity));

// distance (km) from a point to the nearest border vertex of the named countries; 0 if inside
function distToCountries(g,names){
 const fs=countries.filter(f=>names.includes(f.properties.name));
 if(fs.some(f=>geoContains(f,[g.lon,g.lat])))return 0;
 let best=Infinity;
 const walk=c=>typeof c[0]==="number"?(best=Math.min(best,geoDistance([g.lon,g.lat],c)*6371)):c.forEach(walk);
 fs.forEach(f=>walk(f.geometry.coordinates));
 return best;
}
const centroid=f=>{const[x,y]=proj.invert(path.centroid(f));return{lon:x,lat:y}};

// ---------- today's rounds ----------
const cs=pick(CITIES,3).map(city),ev=pick(EVENTS,1)[0],se=pick(SENT,1)[0];
const A={lat:-cs[1].lat,lon:cs[1].lon>0?cs[1].lon-180:cs[1].lon+180};
const near=CITIES.map(city).sort((a,b)=>km(a,A)-km(b,A))[0],nd=km(near,A);
const rounds=[
 {tag:"Round 1 · Find the city",clue:`<div class="big">${esc(cs[0].n)}, ${esc(cs[0].co)}</div>`,targets:[cs[0]],d:g=>km(g,cs[0]),free:100,scale:2500,rev:`${esc(cs[0].n)}, ${esc(cs[0].co)}.`},
 {tag:`Round 2 · Where in history? (${ev[0]})`,clue:esc(ev[1]),targets:[{lat:ev[3],lon:ev[4]}],d:g=>km(g,{lat:ev[3],lon:ev[4]}),free:ev[5],scale:1500,rev:`<b>${ev[2]}.</b> ${esc(ev[6])}`},
 {tag:"Round 3 · Where is this spoken?",clue:`<div class="big">${esc(se[1])}</div><div class="mono" style="color:var(--mute)">Pin any country where this language is spoken.</div>`,
  hit:se[3],targets:countries.filter(f=>se[3].includes(f.properties.name)).map(centroid),d:g=>distToCountries(g,se[3]),free:0,scale:1200,
  rev:`<b>${esc(se[0])}.</b> “${esc(se[2])}” Highlighted countries speak it.`},
 {tag:"Round 4 · The other side of the world",clue:`<div class="mono">Find the point exactly opposite:</div><div class="big">${esc(cs[1].n)}, ${esc(cs[1].co)}</div>`,
  targets:[A],marks:[{...cs[1],c:"var(--blue)"}],d:g=>km(g,A),free:300,scale:1500,
  rev:`The antipode of ${esc(cs[1].n)} is shown in green. ${nd<1500?`Nearest city in our list: ${esc(near.n)}, ${esc(near.co)} (${Math.round(nd)} km away).`:"It falls in open ocean."}`},
 {tag:"Round 5 · Which city fits?",clue:`<div class="mono">Language: <b>${esc(endo(cs[2].lang))}</b><br>Population: <b>about ${cs[2].pop} million</b> (${cs[2].rank===1?"the largest city":"#"+cs[2].rank+" largest city"} in its country)<br>Average annual temperature: <b>${cs[2].t} °C</b></div>`,
  targets:[cs[2]],d:g=>km(g,cs[2]),free:100,scale:1500,rev:`${esc(cs[2].n)}, ${esc(cs[2].co)}. The language clue was ${esc(cs[2].lang)}.`}];

// ---------- game state ----------
let i=0,scores=[],guess=null,locked=false,R=rounds[0];
const $=id=>document.getElementById(id),go=$("go");
const dot=(p,c,r)=>`<circle cx="${p.lon+180}" cy="${90-p.lat}" r="${r}" fill="${c}" stroke="#fff" stroke-width="${r/4}"/>`;
function draw(){
 const r=2.6/k;let s="";
 if(locked){
  const best=[...R.targets].sort((a,b)=>km(guess,a)-km(guess,b))[0];
  s+=`<line x1="${guess.lon+180}" y1="${90-guess.lat}" x2="${best.lon+180}" y2="${90-best.lat}" stroke="var(--bad)" stroke-width="${r/3}" stroke-dasharray="${r} ${r}"/>`;
  if(!R.hit)R.targets.forEach(t=>s+=dot(t,"var(--good)",r));
  (R.marks||[]).forEach(m=>s+=dot(m,m.c,r));
 }
 if(guess)s+=dot(guess,"var(--bad)",r);
 pins.html(s);
}
svg.on("click",e=>{if(locked)return;const[x,y]=pointer(e,view.node());guess={lon:x-180,lat:90-y};draw();go.disabled=false});
const dots=()=>$("dots").innerHTML=rounds.map((_,n)=>`<div class="dot ${n<scores.length?"done":n===i?"on":""}"></div>`).join("");
function show(){
 R=rounds[i];guess=null;locked=false;land.selectAll("path").classed("hit",false);svg.call(zb.transform,zoomIdentity);dots();
 $("tag").textContent=R.tag;$("clue").innerHTML=R.clue;$("fbwrap").hidden=true;go.textContent="Lock in guess";go.disabled=true;
}
go.onclick=()=>{
 if(!locked){
  const d=R.d(guess),sc=score(d,R.free,R.scale);scores.push(sc);locked=true;
  if(R.hit)land.selectAll("path").classed("hit",f=>R.hit.includes(f.properties.name));
  $("fb").innerHTML=`<b>${sc} / 100</b> · ${d<1?"inside the target area":Math.round(d).toLocaleString()+" km from the target"}<br>${R.rev}`;
  $("fbwrap").hidden=false;draw();dots();go.textContent=i<rounds.length-1?"Next round →":"See my results";
 }else{i++;i<rounds.length?show():finish()}
};

// ---------- results and streaks (localStorage, per device) ----------
const store=(k,v)=>{try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch{return null}};
function finish(){
 const tot=scores.reduce((a,b)=>a+b,0),sq=scores.map(v=>v>=80?"🟩":v>=40?"🟨":"🟥").join(""),share=`Globe Daily ${KEY}\n${sq} ${tot}/500`;
 let s={};try{s=JSON.parse(store("gd-stats")||"{}")}catch{}
 if(s.last!==KEY){const y=new Date(now);y.setDate(y.getDate()-1);const yk=`${y.getFullYear()}-${pad(y.getMonth()+1)}-${pad(y.getDate())}`;
  s.streak=s.last===yk?(s.streak||0)+1:1;s.best=Math.max(s.best||0,tot);s.played=(s.played||0)+1;s.last=KEY;store("gd-stats",JSON.stringify(s))}
 $("tag").textContent="Today’s result";
 $("clue").innerHTML=`<div class="big">${tot} / 500</div><div class="grid">${sq}</div><div class="mono">${scores.map((v,n)=>`Round ${n+1}: ${v}`).join(" · ")}</div>`;
 $("fbwrap").hidden=true;guess=null;locked=false;land.selectAll("path").classed("hit",false);draw();dots();
 $("stats").textContent=`Streak ${s.streak||1} · Best ${s.best||tot} · Played ${s.played||1}`;
 go.disabled=false;go.textContent="Copy result to share";
 go.onclick=()=>navigator.clipboard.writeText(share).then(()=>go.textContent="Copied!",()=>go.textContent=share);
}
$("date").textContent=now.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"})+" · 5 rounds, 500 points";
show();
