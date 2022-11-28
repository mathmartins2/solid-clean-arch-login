import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, httpResponse, httpRequest } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    return await Promise.resolve(badRequest(new MissingParamError('email')))
  }
}
