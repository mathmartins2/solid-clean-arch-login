import { Authentication } from '../../../domain/usecases/authentication'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, httpResponse, httpRequest } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication
  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return await Promise.resolve(badRequest(new MissingParamError('email')))
      }
      if (!password) {
        return await Promise.resolve(badRequest(new MissingParamError('password')))
      }
      if (!this.emailValidator.isValid(email)) {
        return await Promise.resolve(badRequest(new InvalidParamError('email')))
      }
      await this.authentication.auth(email, password)
      return {
        statusCode: 200,
        body: {}
      }
    } catch (error: any) {
      return serverError(error.message)
    }
  }
}
