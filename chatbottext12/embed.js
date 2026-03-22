(function(){
  const host = ""; // use relative paths (same host as page). If chatbot runs on another domain, put its URL here.
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = host + "/chatbot/style.css";
  document.head.appendChild(link);
  fetch(host + "/chatbot/ui.html")
    .then(r=>r.text())
    .then(html=>{ document.body.insertAdjacentHTML("beforeend", html); })
    .then(()=>attachHandlers());

  function attachHandlers(){
    const form=document.getElementById("cb-form");
    const input=document.getElementById("cb-input");
    const msgs=document.getElementById("cb-messages");
    form.addEventListener("submit",e=>{e.preventDefault(); const txt=input.value.trim(); if(!txt) return; add('user',txt); input.value=''; fetch(host+"/chatbot/api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:txt})}).then(r=>r.json()).then(d=>add('bot',d.answer||"Je suis hors ligne.")).catch(()=>add('bot','Erreur de connexion.'));});
  }
  function add(author,text){ const el=document.createElement('div'); el.className='cb-msg cb-'+author; el.textContent=text; document.getElementById('cb-messages').appendChild(el); document.getElementById('cb-messages').scrollTop=document.getElementById('cb-messages').scrollHeight; }
})();