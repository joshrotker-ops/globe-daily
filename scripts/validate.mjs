import {SENT,CITIES,EVENTS} from "../src/data.js";
import fs from "fs";
const t=JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-50m.json","utf8"));
const names=new Set(t.objects.countries.geometries.map(g=>g.properties.name));
let bad=0;
for(const s of SENT)for(const c of s[3])if(!names.has(c)){console.log("Unknown country in",s[0],":",c);bad++}
for(const c of CITIES)if(c[2]<-90||c[2]>90||c[3]<-180||c[3]>180){console.log("Bad coords:",c[0]);bad++}
for(const e of EVENTS)if(!e[6]||!e[5]){console.log("Event missing fact/tolerance:",e[1]);bad++}
console.log(bad?bad+" problem(s)":"All content valid: "+CITIES.length+" cities, "+EVENTS.length+" events, "+SENT.length+" sentences");
process.exit(bad?1:0);
