import { Request, Response } from 'express'
import * as z from 'zod'
import * as codeGenerator from 'voucher-code-generator'
import { prismaClient } from 'config'
import { BAD_GATEWAY, BAD_REQUEST, CREATED } from 'http-status'

const generateCode = () => {
  return codeGenerator
    .generate({ length: 7, charset: codeGenerator.charset('alphanumeric'), count: 1 })
    ?.at(0)
    ?.toUpperCase()
}

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
