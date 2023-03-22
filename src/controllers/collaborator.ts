import { Request, Response } from 'express'
import * as z from 'zod'
import { prismaClient } from '../config'
import { generateCode } from '../utils/generateCode'
import { BAD_GATEWAY, BAD_REQUEST, CREATED, OK } from 'http-status'

export const create = async (req: Request, res: Response) => {
  const createBody = z.object({ name: z.string().optional() })

  try {
    const code = generateCode()
    const { name } = createBody.parse(req.body)

    if (!code) {
      return res.status(BAD_REQUEST).json({ message: 'BAD_REQUEST', description: 'Generic. Repeat request.' })
    }

    const user = await prismaClient.collaborator.create({ data: { name, code } })

    return res.status(CREATED).json({ message: 'CREATED', data: user })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(BAD_GATEWAY).json({ message: 'BAD_GATWAY', description: error.message })
  }
}

export const get = async (req: Request, res: Response) => {
  try {
    const collaborators = await prismaClient.collaborator.findMany()

    return res.status(OK).json({ message: 'OK', data: collaborators })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(BAD_GATEWAY).json({ message: 'BAD_GATWAY', description: error.message })
  }
}
