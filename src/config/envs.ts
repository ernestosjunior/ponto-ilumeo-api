import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

export const loadEnvs = () => {
  const path = '.env'

  console.log(`🌟 Loaded enviroments from ${path}`)

  const myEnvs = config({ path })

  expand(myEnvs)
}
