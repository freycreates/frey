(()=>{
  const key="frey-language";
  const read=()=>{try{return sessionStorage.getItem(key)}catch{return null}};
  const write=value=>{try{sessionStorage.setItem(key,value)}catch{}};
  const loadRewindLogo=img=>{
    img.addEventListener("error",async()=>{
      if(img.dataset.fallbackLoaded)return;
      img.dataset.fallbackLoaded="true";
      try{
        const response=await fetch("assets/dj-rewind-wordmark.b64",{cache:"force-cache"});
        if(response.ok)img.src=`data:image/png;base64,${(await response.text()).trim()}`;
      }catch{}
    },{once:true});
    img.src="assets/dj-rewind-wordmark.png";
  };
  const projectMarkup=copy=>`
    <span class="project-logo"><img alt="DJ Rewind"></span>
    <span class="project-copy">${copy}</span>
  `;
  const addRewindProject=()=>{
    if(document.querySelector(".project-rewind"))return;
    const style=document.createElement("style");
    style.textContent=".project-rewind .project-logo{padding:20px;background:#fff}.project-rewind .project-logo img{width:88%;height:auto;max-width:360px;max-height:78px;object-fit:contain}#creative .project-rewind .project-logo{padding:18px}#creative .project-rewind .project-logo img{width:86%;max-width:330px;max-height:58px}";
    document.head.append(style);
    const homeGrid=document.querySelector("#work .work");
    if(homeGrid){
      const card=document.createElement("a");
      card.className="project project-rewind";
      card.href="https://djrewind.app/";
      card.target="_blank";
      card.rel="noopener";
      card.setAttribute("aria-label","View DJ Rewind");
      card.innerHTML=projectMarkup('<strong>DJ Rewind <svg class="external-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M6 3h7v7"/></svg></strong><span>Listening-history web app for DJs</span><span>2026-now</span>');
      (homeGrid.querySelector(".project:not(.project-rewind)")||homeGrid.firstElementChild)?.after(card);
      loadRewindLogo(card.querySelector("img"));
    }
    const cvGrid=document.querySelector("#creative .project-grid");
    if(cvGrid){
      const card=document.createElement("a");
      card.className="project project-rewind";
      card.href="https://djrewind.app/";
      card.target="_blank";
      card.rel="noopener";
      card.setAttribute("aria-label","View DJ Rewind");
      card.innerHTML=projectMarkup('<strong>DJ Rewind</strong><span data-en="Web app concept, visual identity and build for DJ listening recaps." data-nl="Webapp-concept, visual identity en bouw voor luisterrecaps voor DJs.">Web app concept, visual identity and build for DJ listening recaps.</span><span class="date" data-en="2026-now" data-nl="2026-nu">2026-now</span>');
      (cvGrid.querySelector(".project-world-pride")||cvGrid.firstElementChild)?.after(card);
      loadRewindLogo(card.querySelector("img"));
    }
  };
  const apply=lang=>{
    document.documentElement.lang=lang;
    document.querySelectorAll("[data-en][data-nl]").forEach(el=>{el.textContent=el.dataset[lang]});
    document.querySelectorAll("[data-lang]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.lang===lang)));
    const description=document.querySelector('meta[name="description"]');
    if(description&&document.body.dataset[`description${lang.toUpperCase()}`])description.content=document.body.dataset[`description${lang.toUpperCase()}`];
    if(document.body.dataset[`title${lang.toUpperCase()}`])document.title=document.body.dataset[`title${lang.toUpperCase()}`];
    write(lang);
    window.dispatchEvent(new CustomEvent("languagechange",{detail:{lang}}));
  };
  document.querySelectorAll("[data-lang]").forEach(button=>button.addEventListener("click",()=>apply(button.dataset.lang)));
  window.FREY_LANGUAGE=()=>document.documentElement.lang==="nl"?"nl":"en";
  addRewindProject();
  apply(read()==="nl"?"nl":"en");
})();
