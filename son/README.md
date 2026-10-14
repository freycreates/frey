# BASS BTCH website (concept)

Static site, no build step. Built from BASS BTCH Brand Guide v1.

```
son/
  index.html          public site      → freycreates.nl/son/
  create/index.html   private tool     → freycreates.nl/son/create/
  assets/             photo, icons, share image, brand.css, story fonts
```

All links are relative, so the same folder works at `freycreates.nl/son/` now
and at the root of `bassbtch.com` later, without changes.

## Deploy to freycreates.nl (GitHub Pages)

1. Copy the whole `son` folder into the root of the freycreates.nl repo.
2. Commit and push. Pages serves it at https://freycreates.nl/son/
3. Don't add it to `sitemap.xml` or link to it from the FREY. site.

## Editing

- **Mixes**: in `index.html`, search for `MIXES`. Each `<li class="mix">` has the SoundCloud URL in `data-url`.
- **Agenda**: search for `AGENDA`. Each date is an `<li data-date="YYYY-MM-DD">`. Dates that have passed hide themselves; a month card with no dates left hides too.

## Launch on bassbtch.com

1. Create a new repo, put the contents of `son/` at its root, enable Pages, add a `CNAME` file containing `bassbtch.com`.
2. In `index.html`: change both the `robots` and `googlebot` meta tags to `index, follow`, uncomment the canonical link, and change the `og:image` URL to `https://bassbtch.com/assets/og-image.jpg`.
3. Leave `create/index.html` on `noindex`.
4. Redirect or remove `freycreates.nl/son/`.
