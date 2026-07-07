(()=>{
  const key="frey-language";
  const apply=lang=>{
    document.documentElement.lang=lang;
    document.querySelectorAll("[data-en][data-nl]").forEach(el=>{el.textContent=el.dataset[lang]});
    document.querySelectorAll("[data-lang]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.lang===lang)));
    const description=document.querySelector('meta[name="description"]');
    if(description&&document.body.dataset[`description${lang.toUpperCase()}`])description.content=document.body.dataset[`description${lang.toUpperCase()}`];
    if(document.body.dataset[`title${lang.toUpperCase()}`])document.title=document.body.dataset[`title${lang.toUpperCase()}`];
    localStorage.setItem(key,lang);
    window.dispatchEvent(new CustomEvent("languagechange",{detail:{lang}}));
  };
  document.querySelectorAll("[data-lang]").forEach(button=>button.addEventListener("click",()=>apply(button.dataset.lang)));
  window.FREY_LANGUAGE=()=>document.documentElement.lang==="nl"?"nl":"en";
  apply(localStorage.getItem(key)==="nl"?"nl":"en");
})();
