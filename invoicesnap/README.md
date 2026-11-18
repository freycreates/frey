# Invoice Snap

Plain HTML, CSS and JavaScript, no build step. Lives at `freycreates.nl/invoicesnap`. Private tool: `noindex`, not in the sitemap.

## Turning on "Doorgaan met Google" (backup on any device)

The Google buttons stay hidden until a client ID is set. The client ID is public (it is not a secret) and goes in `index.html`:

1. Go to https://console.cloud.google.com and create a project (free), for example "Invoice Snap".
2. APIs and services, then Library: enable **Google Drive API**.
3. APIs and services, then OAuth consent screen: user type **External**. App name `Invoice Snap`, a support email, your logo (optional).
   Authorised domain `freycreates.nl`. Privacy policy link `https://freycreates.nl/invoicesnap/privacy/`.
4. Scopes: `.../auth/drive.appdata` and `.../auth/userinfo.email`. These are non-sensitive scopes.
5. **Publish the app** (status "In production"). If it stays in "Testing", only listed test users can log in.
6. Credentials, then Create credentials, then **OAuth client ID**, type **Web application**.
   Authorised JavaScript origins: `https://freycreates.nl`. Nothing under redirect URIs is needed.
7. Copy the client ID and paste it in `index.html`: `var GOOGLE_CLIENT_ID='...';`

Data stored: one file `invoicesnap-data.json` in the hidden `appDataFolder` of the user's own Drive.
