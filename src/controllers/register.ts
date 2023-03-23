import { Request, Response } from 'express'
import * as z from 'zod'
import { prismaClient } from '../config'
import { BAD_GATEWAY, BAD_REQUEST, CREATED, OK } from 'http-status'
import { getCurrentDate } from '../utils/getCurrentDate'

export const create = async (req: Request, res: Response) => {
  const createBody = z.object({ code: z.string() })

  try {
    const { code } = createBody.parse(req.body)

    const user = await prismaClient.collaborator.findFirst({ where: { code } })

    if (!user) return res.status(BAD_REQUEST).json({ message: 'BAD_REQUEST', description: 'Collaborator not found.' })

    const [currentDate, currentHour] = getCurrentDate()

    const query = await prismaClient.register.findMany({
      where: { collaboratorId: user.id, date: { equals: currentDate } }
    })

    const register = query.at(0)

    if (!register) {
      const entry = await prismaClient.register.create({
        data: { date: currentDate, entryHour: currentHour, collaboratorId: user.id }
      })

      return res.status(CREATED).json({ message: 'CREATED', data: entry })
    } else if (register && !register.exitHour) {
      const exit = await prismaClient.register.update({
        where: { id: register.id },
        data: { exitHour: currentHour }
      })

      return res.status(CREATED).json({ message: 'CREATED', data: exit })
    }

    return res.status(BAD_REQUEST).json({ message: 'BAD_REQUEST', description: 'Finalized daily point' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(BAD_GATEWAY).json({ message: 'BAD_GATWAY', description: error.message })
  }
}

export const getByCode = async (req: Request, res: Response) => {
  const params = z.object({ code: z.string() })
  try {
    const { code } = params.parse(req.params)

    const collaborators = await prismaClient.collaborator.findFirst({
      where: { code },
      include: { registers: { orderBy: { createdAt: 'desc' } } }
    })

    if (!collaborators)
      return res.status(BAD_REQUEST).json({ message: 'BAD_REQUEST', description: 'Collaborator not found' })

    const [currentDate] = getCurrentDate()

    const currentRegister = collaborators.registers.at(0)
    const shouldReturnCurrent = currentRegister?.date === currentDate
    const current = shouldReturnCurrent ? currentRegister : {}
    const others = collaborators.registers.slice(shouldReturnCurrent ? 1 : 0)

    return res.status(OK).json({ message: 'OK', data: { ...collaborators, registers: { current, others } } })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(BAD_GATEWAY).json({ message: 'BAD_GATWAY', description: error.message })
  }
}
