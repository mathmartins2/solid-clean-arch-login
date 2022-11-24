import { Controller, httpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: httpRequest = {
      body: req.body
    }
    const httpReponse = await controller.handle(httpRequest)
    res.status(httpReponse.statusCode).json(httpReponse.body)
  }
}
