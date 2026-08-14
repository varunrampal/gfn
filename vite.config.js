/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import resendQuoteHandler from './api/quote-resend.js'

const localQuoteApi = (mode) => ({
  name: 'local-quote-api',
  configureServer(server) {
    const environment = loadEnv(mode, process.cwd(), '')
    const serverVariables = [
      'RESEND_API_KEY',
      'RESEND_FROM_EMAIL',
      'RESEND_FROM_NAME',
      'QUOTE_RECIPIENT_EMAIL',
      'QUOTE_ALLOWED_ORIGINS',
    ]
    serverVariables.forEach((name) => {
      if (environment[name]) process.env[name] = environment[name]
    })

    server.middlewares.use('/api/quote-resend', (request, response) => {
      let rawBody = ''
      request.on('data', (chunk) => {
        rawBody += chunk
        if (rawBody.length > 4 * 1024 * 1024) request.destroy()
      })
      request.on('end', async () => {
        try {
          request.body = rawBody ? JSON.parse(rawBody) : {}
          response.status = (statusCode) => {
            response.statusCode = statusCode
            return response
          }
          response.json = (payload) => {
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(payload))
          }
          await resendQuoteHandler(request, response)
        } catch (error) {
          console.error('Local quote API failed:', error)
          response.statusCode = 400
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ error: 'The quote request was invalid.' }))
        }
      })
    })

  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), localQuoteApi(mode)],
}))
