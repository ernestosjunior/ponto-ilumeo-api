import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

export const loadEnvs = () => {
  const path = process.env.NODE_ENV === 'production' ? '.env' : '.env.development'

  console.log(`🌟 Loaded enviroments from ${path}`)

  const myEnvs = config({ path })

  expand(myEnvs)
}
