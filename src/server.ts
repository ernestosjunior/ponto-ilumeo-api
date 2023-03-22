import express from 'express'

const PORT = process.env.PORT || 3333

export default () => {
  const app = express()

  app.use(express.json())

  app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`))
}
