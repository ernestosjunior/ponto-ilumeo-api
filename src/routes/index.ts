import { Router } from 'express'
import { collaboratorRoutes } from './collaborator'

const routes = Router()

routes.use('/collaborator', collaboratorRoutes)

export default routes
