import { Router } from 'express'
import { collaboratorRoutes } from './collaborator'
import { registerRoutes } from './register'

const routes = Router()

routes.use('/collaborator', collaboratorRoutes)
routes.use('/register', registerRoutes)

export default routes
