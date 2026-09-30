// Draws the mixes (main page and /dj) and venues (/dj) from assets/mixes.js and assets/venues.js.
// FREYbot edits those two data files; this file only turns them into the cards.
(()=>{
  const esc=value=>String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const DJ_ICONS={"soundcloud": "<svg class=\"media-icon soundcloud\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M1.5 14.4c-.3 0-.5.2-.6.6L.5 17l.4 2c.1.3.3.5.6.5s.5-.2.5-.5l.5-2-.5-2c0-.4-.2-.6-.5-.6Zm2.1-1.8c-.4 0-.6.3-.7.7L2.4 17l.5 3.5c.1.4.3.7.7.7.3 0 .6-.3.7-.7l.5-3.5-.5-3.7c-.1-.4-.4-.7-.7-.7Zm2.3-1.5c-.4 0-.7.3-.8.8L4.7 17l.4 5c.1.5.4.8.8.8s.7-.3.8-.8l.5-5-.5-5.1c-.1-.5-.4-.8-.8-.8Zm10.4 11.7H8.7c-.5 0-.9-.4-.9-.9V8.6c0-.5.2-.8.7-1A6.9 6.9 0 0 1 19 13.4a4.7 4.7 0 1 1-2.7 9.4Z\"/></svg>SoundCloud", "spotify": "<svg class=\"media-icon spotify\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M6.8 9.4c3.7-1.1 7.9-.8 11.2 1M7.5 12.7c3.1-.9 6.8-.6 9.7.9M8.2 15.8c2.7-.7 5.5-.5 8 .7\" fill=\"none\" stroke=\"white\" stroke-width=\"1.35\" stroke-linecap=\"round\"/></svg>Spotify", "apple": "<svg class=\"media-icon apple\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M16.7 12.7c0-2.4 2-3.6 2.1-3.7a4.6 4.6 0 0 0-3.6-1.9c-1.5-.2-3 1-3.8 1s-2-1-3.4-1c-1.8 0-3.4 1-4.3 2.6-1.8 3.1-.5 7.8 1.3 10.4.8 1.3 1.9 2.7 3.3 2.6 1.3-.1 1.8-.8 3.4-.8 1.5 0 2 .8 3.4.8s2.3-1.3 3.2-2.6c1-1.4 1.4-2.9 1.4-3-.1 0-3-1.2-3-4.4Zm-2.5-7.3A4.3 4.3 0 0 0 15.2 2a4.5 4.5 0 0 0-3 1.6 4.1 4.1 0 0 0-1 3.1 3.7 3.7 0 0 0 3-1.3Z\"/></svg>Apple Music"};
  const TILE_ICONS={"soundcloud": "<svg class=\"platform-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M1.5 14.4c-.3 0-.5.2-.6.6L.5 17l.4 2c.1.3.3.5.6.5s.5-.2.5-.5l.5-2-.5-2c0-.4-.2-.6-.5-.6Zm2.1-1.8c-.4 0-.6.3-.7.7L2.4 17l.5 3.5c.1.4.3.7.7.7.3 0 .6-.3.7-.7l.5-3.5-.5-3.7c-.1-.4-.4-.7-.7-.7Zm2.3-1.5c-.4 0-.7.3-.8.8L4.7 17l.4 5c.1.5.4.8.8.8s.7-.3.8-.8l.5-5-.5-5.1c-.1-.5-.4-.8-.8-.8Zm10.4 11.7H8.7c-.5 0-.9-.4-.9-.9V8.6c0-.5.2-.8.7-1A6.9 6.9 0 0 1 19 13.4a4.7 4.7 0 1 1-2.7 9.4Z\"/></svg><span>SoundCloud</span><svg class=\"external-icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M3 13 13 3M6 3h7v7\"/></svg>", "spotify": "<svg class=\"platform-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M6.8 9.4c3.7-1.1 7.9-.8 11.2 1\" fill=\"none\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><path d=\"M7.5 12.7c3.1-.9 6.8-.6 9.7.9M8.2 15.8c2.7-.7 5.5-.5 8 .7\" fill=\"none\" stroke=\"white\" stroke-width=\"1.35\" stroke-linecap=\"round\"/></svg><span>Spotify</span><svg class=\"external-icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M3 13 13 3M6 3h7v7\"/></svg>", "apple": "<svg class=\"platform-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M16.7 12.7c0-2.4 2-3.6 2.1-3.7a4.6 4.6 0 0 0-3.6-1.9c-1.5-.2-3 1-3.8 1s-2-1-3.4-1c-1.8 0-3.4 1-4.3 2.6-1.8 3.1-.5 7.8 1.3 10.4.8 1.3 1.9 2.7 3.3 2.6 1.3-.1 1.8-.8 3.4-.8 1.5 0 2 .8 3.4.8s2.3-1.3 3.2-2.6c1-1.4 1.4-2.9 1.4-3-.1 0-3-1.2-3-4.4Zm-2.5-7.3A4.3 4.3 0 0 0 15.2 2a4.5 4.5 0 0 0-3 1.6 4.1 4.1 0 0 0-1 3.1 3.7 3.7 0 0 0 3-1.3Z\"/></svg><span>Apple Music</span><svg class=\"external-icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M3 13 13 3M6 3h7v7\"/></svg>"};
  const mixes=window.FREY_MIXES||[];
  const venues=window.FREY_VENUES||[];
  const FEATURED_VENUES=6;

  const djMixes=document.getElementById("djMixes");
  if(djMixes){
    djMixes.innerHTML=mixes.map(mix=>{
      const links=(mix.links||[]).map(link=>`<a class="media-link" href="${esc(link.url)}" target="_blank" rel="noopener">${DJ_ICONS[link.platform]||esc(link.platform)}</a>`);
      const linkBlock=links.length>1?`<div class="media-links">\n            ${links.join("\n            ")}\n          </div>`:`<div class="media-links">${links.join("")}</div>`;
      return `\n        <article class="media-card">\n          <img class="${mix.imageStyle==="thumbnail"?"media-thumbnail":"playlist-artwork"}" src="${esc(mix.image)}" alt="${esc(mix.alt)}">\n          <h3>${esc(mix.title)}</h3>\n          <p>${esc(mix.type)}</p>\n          ${linkBlock}\n        </article>`;
    }).join("")+"\n      ";
  }

  const mixTiles=document.getElementById("mixTiles");
  if(mixTiles){
    mixTiles.innerHTML=mixes.map(mix=>{
      const links=(mix.links||[]).map(link=>`<a class="platform-button ${esc(link.platform)}" href="${esc(link.url)}" target="_blank" rel="noopener">${TILE_ICONS[link.platform]||esc(link.platform)}</a>`);
      const linkBlock=links.length>1?`<span class="platform-links">\n              ${links.join("\n              ")}\n            </span>`:`<span class="platform-links">${links.join("")}</span>`;
      const note=mix.note?`\n            <span class="notice" data-en="${esc(mix.note.en)}" data-nl="${esc(mix.note.nl)}">${esc(mix.note.en)}</span>`:"";
      return `\n          <article class="tile">\n            <img class="${mix.imageStyle==="thumbnail"?"mix-thumbnail":"playlist-artwork"}" src="${esc(mix.image)}" alt="${esc(mix.alt)}">\n            <span class="title">${esc(mix.title)}</span><span class="meta">${esc(mix.type)}</span>${note}\n            ${linkBlock}\n          </article>`;
    }).join("")+"\n        ";
  }

  const venueCard=(venue,indent)=>`\n${indent}<a class="venue-card${venue.style?" "+esc(venue.style):""}" href="${esc(venue.url)}" target="_blank" rel="noopener"><span class="venue-card-logo"><img src="${esc(venue.logo)}" alt=""></span><span class="venue-card-name">${esc(venue.name)}</span></a>`;
  const venueGrid=document.getElementById("venueGrid");
  if(venueGrid)venueGrid.innerHTML=venues.slice(0,FEATURED_VENUES).map(venue=>venueCard(venue,"        ")).join("")+"\n      ";
  const venueGridMore=document.getElementById("venueGridMore");
  if(venueGridMore){
    const more=venues.slice(FEATURED_VENUES);
    venueGridMore.innerHTML=more.map(venue=>venueCard(venue,"          ")).join("")+"\n        ";
    const details=venueGridMore.closest("details");
    if(details&&!more.length)details.hidden=true;
  }
})();
