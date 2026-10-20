import {neighbors} from "topojson-client";
// Disputed or non-sovereign areas: never used as clues or answers, to keep the game neutral.
const BLOCK=new Set(["Palestine","Kosovo","N. Cyprus","Somaliland","W. Sahara","Antarctica"]);
const NAME={"Dem. Rep. Congo":"DR Congo","Congo":"Republic of the Congo","Bosnia and Herz.":"Bosnia and Herzegovina","Central African Rep.":"Central African Republic","Eq. Guinea":"Equatorial Guinea","Dominican Rep.":"Dominican Republic","S. Sudan":"South Sudan","eSwatini":"Eswatini","Czechia":"Czechia"};
export const dn=n=>NAME[n]||n;
// Picks a hidden country, then 2-3 of its neighbours as clues. Every country bordering ALL clues is a valid answer.
export function makeBorderPuzzle({world,countries,path,pick}){
 const NB=neighbors(world.objects.countries.geometries),nm=countries.map(f=>f.properties.name),area=countries.map(f=>path.area(f));
 const ok=k=>!BLOCK.has(nm[k]),all=countries.map((_,k)=>k).filter(ok);
 const cand=pick(all.filter(k=>NB[k].filter(ok).length>=3),60);
 for(const x of cand){
  const ns=NB[x].filter(ok);
  for(const size of [3,2]){
   const combos=[];(function rec(st,cur){if(cur.length===size){combos.push(cur.slice());return}for(let t=st;t<ns.length;t++){cur.push(ns[t]);rec(t+1,cur);cur.pop()}})(0,[]);
   for(const c of pick(combos,combos.length)){
    const V=all.filter(k=>!c.includes(k)&&c.every(j=>NB[j].includes(k)));
    if(V.length<=3&&V.some(k=>area[k]>=6))return{clues:c,valid:V};
   }
  }
 }
 throw new Error("no border puzzle found");
}
