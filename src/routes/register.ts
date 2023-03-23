import { registerController } from '../controllers'
import { Router } from 'express'

export const registerRoutes = Router()

registerRoutes.post('/', registerController.create)
registerRoutes.get('/:code', registerController.getByCode)
