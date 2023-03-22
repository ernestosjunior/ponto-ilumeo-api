import { collaboratorController } from '../controllers'
import { Router } from 'express'

export const collaboratorRoutes = Router()

collaboratorRoutes.get('/', collaboratorController.get)
collaboratorRoutes.post('/', collaboratorController.create)
