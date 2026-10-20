const f=document.getElementById("cf"),out=document.getElementById("cf-out"),btn=f.querySelector("button");
f.addEventListener("submit",async e=>{
 e.preventDefault();out.className="";out.textContent="Sending…";btn.disabled=true;
 try{
  const r=await fetch("https://api.web3forms.com/submit",{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}});
  const j=await r.json();
  if(!j.success)throw new Error();
  f.reset();out.className="ok";out.textContent="Thanks! Your message was sent.";
 }catch{out.className="err";out.textContent="Sorry, that didn’t send. Please try again in a little while."}
 btn.disabled=false;
});
