import express from 'express'
import cors from 'cors'
import routes from './routes'

const PORT = process.env.PORT || 3333

export default () => {
  const app = express()

  app.use(express.json())
  app.use(cors({ origin: '*', credentials: false }))
  app.use(routes)

  app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`))
}
