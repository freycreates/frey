/* Booking request form for freycreates.nl.
   Any link with data-booking opens it. Without JavaScript the link is a normal mailto: link, so nobody is locked out.
   The form posts to the FREY. form server (forms-server/ in the FREYbot project). Change ENDPOINT if the address changes. */
(()=>{
  const ENDPOINT="https://api.freycreates.nl/booking";
  const MAIL="hello@freycreates.nl";
  const T={
    en:{title:"Booking request",intro:"Tell me briefly what you have in mind. I usually reply within a few days.",name:"Name",email:"Email",club:"Club or event",city:"City",date:"Date",from:"From",to:"Until",message:"Message",optional:" (optional)",send:"Send request",sending:"Sending…",mail:"Prefer email?",privacy:"I only use your details to reply.",close:"Close",doneTitle:"Thank you.",done:"Your request is in. I'll get back to you as soon as I can.",doneMail:"A confirmation is also on its way to your inbox.",fail:"That didn't work. Please try again, or email me at",invalid:"Please check the highlighted fields."},
    nl:{title:"Boekingsaanvraag",intro:"Vertel kort wat je plan is. Ik reageer meestal binnen een paar dagen.",name:"Naam",email:"E-mail",club:"Club of event",city:"Stad",date:"Datum",from:"Vanaf",to:"Tot",message:"Bericht",optional:" (optioneel)",send:"Verstuur aanvraag",sending:"Versturen…",mail:"Liever mailen?",privacy:"Je gegevens gebruik ik alleen om te reageren.",close:"Sluiten",doneTitle:"Bedankt.",done:"Je aanvraag is binnen. Ik reageer zo snel mogelijk.",doneMail:"Er staat ook een bevestiging in je mailbox.",fail:"Dat is niet gelukt. Probeer het nog eens, of mail me via",invalid:"Controleer de gemarkeerde velden."}
  };
  const lang=()=>document.documentElement.lang==="nl"?"nl":"en";
  const css=`
  dialog.bk{width:min(560px,calc(100vw - 24px));max-height:calc(100vh - 24px);padding:0;border:1.5px solid #151316;border-radius:22px;background:#eae8e7;color:#151316;font-family:"Inter Tight","Open Sauce",system-ui,sans-serif;overflow:auto}
  dialog.bk::backdrop{background:rgba(15,13,16,.62)}
  html[data-theme="dark"] dialog.bk{background:#171317;color:#f5f0f3;border-color:#5a4b57}
  .bk-in{padding:26px 26px 24px}
  .bk h2{margin:0 36px 6px 0;font-size:1.9rem;font-weight:900;line-height:1.05;letter-spacing:-.02em}
  .bk .bk-intro{margin:0 0 18px;font-size:.95rem;line-height:1.45;opacity:.78;font-weight:500}
  .bk .bk-x{position:absolute;top:16px;right:16px;width:38px;height:38px;border:1.5px solid currentColor;border-radius:50%;background:transparent;color:inherit;font-size:1.2rem;line-height:1;cursor:pointer}
  .bk .bk-row{display:grid;gap:12px;grid-template-columns:1fr 1fr}
  .bk .bk-row.three{grid-template-columns:1.3fr 1fr 1fr}
  .bk label{display:block;margin:0 0 6px;font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase}
  .bk label i{font-style:normal;font-weight:500;text-transform:none;letter-spacing:0;opacity:.7}
  .bk .bk-f{margin-bottom:14px;min-width:0}
  .bk input,.bk textarea{width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #151316;border-radius:16px;background:#f4f2f1;color:#151316;font:500 1rem/1.3 "Open Sauce",system-ui,sans-serif}
  html[data-theme="dark"] .bk input,html[data-theme="dark"] .bk textarea{background:#211920;color:#f5f0f3;border-color:#7a6676}
  .bk input{display:block;min-width:0;max-width:100%;height:50px;-webkit-appearance:none;appearance:none}
  .bk input[type="date"],.bk input[type="time"]{text-align:left}
  .bk input::-webkit-date-and-time-value{text-align:left;min-height:1.3em;margin:0}
  .bk input::-webkit-datetime-edit{padding:0}
  .bk textarea{min-height:92px;resize:vertical}
  .bk input[aria-invalid="true"]{border-color:#e61482;box-shadow:0 0 0 2px rgba(230,20,130,.25)}
  .bk input:focus-visible,.bk textarea:focus-visible,.bk .bk-send:focus-visible,.bk .bk-x:focus-visible{outline:3px solid #e61482;outline-offset:2px}
  .bk .bk-send{display:block;width:100%;margin-top:4px;padding:17px;border:1.5px solid #151316;border-radius:20px;background:#e61482;color:#fff;font:900 1.1rem "Inter Tight",system-ui,sans-serif;cursor:pointer}
  .bk .bk-send[disabled]{opacity:.7;cursor:wait}
  .bk .bk-small{margin:12px 0 0;font-size:.78rem;line-height:1.45;opacity:.75}
  .bk .bk-small a{color:inherit;font-weight:700}
  .bk .bk-msg{margin:0 0 12px;font-size:.9rem;font-weight:700;color:#c0105f}
  html[data-theme="dark"] .bk .bk-msg{color:#ff6fb0}
  .bk .bk-trap{position:absolute!important;left:-9999px;width:1px;height:1px;overflow:hidden}
  .bk .bk-done h2{font-size:2.6rem}
  .bk .bk-rule{width:56px;height:4px;margin:14px 0;border-radius:2px;background:#e61482}
  @media(max-width:520px){.bk .bk-row{grid-template-columns:1fr}.bk .bk-row.three{grid-template-columns:1fr 1fr}.bk .bk-row.three .bk-f:first-child{grid-column:1/-1}.bk-in{padding:22px 18px 20px}}`;
  let dialog,form;
  const el=(tag,attrs={},html="")=>{const n=document.createElement(tag);for(const k in attrs)n.setAttribute(k,attrs[k]);n.innerHTML=html;return n};
  const field=(id,key,type,extra="")=>`<div class="bk-f"><label for="bk-${id}" data-k="${key}"></label><input id="bk-${id}" name="${id}" type="${type}" ${extra}></div>`;
  function build(){
    document.head.append(el("style",{},css));
    dialog=el("dialog",{class:"bk","aria-labelledby":"bk-title"});
    dialog.innerHTML=`<div class="bk-in">
      <button type="button" class="bk-x" aria-label="Close">×</button>
      <form novalidate>
        <h2 id="bk-title" data-k="title"></h2><p class="bk-intro" data-k="intro"></p>
        <p class="bk-msg" role="alert" hidden></p>
        <div class="bk-row">${field("name","name","text",'autocomplete="name" maxlength="80" required')}${field("email","email","email",'autocomplete="email" maxlength="120" required')}</div>
        <div class="bk-row">${field("club","club","text",'maxlength="100" required')}${field("city","city","text",'maxlength="60" required')}</div>
        <div class="bk-row three">${field("date","date","date","required")}${field("from","from","time")}${field("to","to","time")}</div>
        <div class="bk-f"><label for="bk-message"><span data-k="message"></span><i data-k="optional"></i></label><textarea id="bk-message" name="message" maxlength="1500"></textarea></div>
        <div class="bk-trap" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></div>
        <button type="submit" class="bk-send"></button>
        <p class="bk-small"><span data-k="mail"></span> <a href="mailto:${MAIL}">${MAIL}</a>. <span data-k="privacy"></span></p>
      </form>
      <div class="bk-done" hidden><h2 data-k="doneTitle"></h2><div class="bk-rule"></div><p data-k="done"></p><p data-k="doneMail" class="bk-small"></p></div>
    </div>`;
    document.body.append(dialog);
    form=dialog.querySelector("form");
    dialog.querySelector(".bk-x").addEventListener("click",()=>dialog.close());
    dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
    form.date.min=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
    form.addEventListener("submit",submit);
    window.addEventListener("languagechange",paint);
    paint();
  }
  function paint(){
    if(!dialog)return;
    const t=T[lang()];
    dialog.querySelectorAll("[data-k]").forEach(n=>{n.textContent=t[n.dataset.k]});
    dialog.querySelector(".bk-x").setAttribute("aria-label",t.close);
    const send=dialog.querySelector(".bk-send");if(!send.disabled)send.textContent=t.send;
    dialog.querySelector(".bk-small a").previousElementSibling&&0;
  }
  function message(text,mail){
    const m=dialog.querySelector(".bk-msg");
    m.hidden=!text;m.textContent=text||"";
    if(text&&mail){m.append(" ");const a=el("a",{href:"mailto:"+MAIL},MAIL);a.style.color="inherit";m.append(a)}
  }
  async function submit(e){
    e.preventDefault();
    const t=T[lang()],data=Object.fromEntries(new FormData(form));
    const bad=["name","email","club","city","date"].filter(k=>!String(data[k]||"").trim()||(k==="email"&&!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(data[k])));
    ["name","email","club","city","date"].forEach(k=>form[k].setAttribute("aria-invalid",String(bad.includes(k))));
    if(bad.length){message(t.invalid);form[bad[0]].focus();return}
    data.lang=lang();
    const send=dialog.querySelector(".bk-send");send.disabled=true;send.textContent=t.sending;message("");
    try{
      const response=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      const result=await response.json().catch(()=>({}));
      if(response.ok&&result.ok){
        form.hidden=true;dialog.querySelector(".bk-done").hidden=false;form.reset();return;
      }
      if(response.status===400&&result.field&&form[result.field]){form[result.field].setAttribute("aria-invalid","true");message(t.invalid);}
      else message(t.fail,true);
    }catch{message(t.fail,true)}
    send.disabled=false;send.textContent=t.send;
  }
  function open(){
    if(!dialog)build();
    form.hidden=false;dialog.querySelector(".bk-done").hidden=true;message("");
    paint();
    if(typeof dialog.showModal==="function")dialog.showModal();else dialog.setAttribute("open","");
    form.name.focus();
  }
  document.addEventListener("click",e=>{
    const link=e.target.closest("[data-booking]");
    if(!link||e.metaKey||e.ctrlKey||e.shiftKey)return;
    e.preventDefault();open();
  });
})();
