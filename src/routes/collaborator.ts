import { collaboratorController } from '../controllers'
import { Router } from 'express'

export const collaboratorRoutes = Router()

collaboratorRoutes.post('/', collaboratorController.create)
