# React + Vite

## Microsoft Graph quote form

The `/quote` page uses `src/Components/MicrosoftGraphQuoteForm.jsx` and posts to
`/api/quote`. The API sends from and to `info@gfnplants.ca`; the visitor's email
is used only as the Reply-To address.

The API expects a Microsoft Entra application using the client-credentials flow
with the Microsoft Graph `Mail.Send` application permission and administrator
consent. For least privilege, restrict that application to the
`info@gfnplants.ca` mailbox with Exchange Online Application RBAC or an
application access policy.

Copy `.env.example` into the environment-variable settings of the serverless
host and provide the real tenant ID, client ID, and client secret there. Never
place the client secret in a `VITE_` variable or in browser code.

The included `api/quote.js` export follows the Vercel Node Function request and
response convention. If the Vite site is hosted elsewhere, deploy the handler
using that host's serverless adapter and set `VITE_QUOTE_API_URL` to its public
URL. Set `QUOTE_ALLOWED_ORIGINS` to the production website origins.

The form accepts one Excel, CSV, PDF, Word, JPG, or PNG attachment up to 2.5 MB.
The conservative limit keeps the attachment in Microsoft Graph's direct
`sendMail` request path.

### Resend alternative

`src/Components/ResendQuoteForm.jsx` is a separate Resend-backed version of the
same quote UI. It posts to `api/quote-resend.js`, which calls Resend only from
the server and supports the same plant-list attachment.

To use it, replace `MicrosoftGraphQuoteForm` with `ResendQuoteForm` on the quote
page and configure `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME`, and
`QUOTE_RECIPIENT_EMAIL` in the serverless host. The sender domain must be
verified in that website's Resend account. Each website should store only its
own account's API key and fixed sender/recipient values.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
