import { collaboratorController } from '../controllers'
import { Router } from 'express'

export const collaboratorRoutes = Router()

collaboratorRoutes.get('/:code', collaboratorController.getByCode)
collaboratorRoutes.post('/', collaboratorController.create)
