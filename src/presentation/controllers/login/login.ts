import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, httpResponse, httpRequest } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return await Promise.resolve(badRequest(new MissingParamError('email')))
    }
    if (!password) {
      return await Promise.resolve(badRequest(new MissingParamError('password')))
    }
    this.emailValidator.isValid(email)
    return {
      statusCode: 200,
      body: {}
    }
  }
}
