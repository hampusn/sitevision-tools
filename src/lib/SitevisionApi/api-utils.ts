import https from 'https'

export const getDefaultTransporterOptions = (site, { rejectUnauthorized = false }) => ({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  auth: {
    username: site.user,
    password: site.pass,
  },
  httpsAgent: rejectUnauthorized ? new https.Agent({ rejectUnauthorized: false }) : null
})
