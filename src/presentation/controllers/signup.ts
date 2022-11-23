
import { httpResponse, httpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
export class SignUpController {
  handle (httpRequest: httpRequest): httpResponse | undefined {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        body: new MissingParamError('password')
      }
    }
    if (!httpRequest.body.passwordConfirmation) {
      return {
        statusCode: 400,
        body: new MissingParamError('passwordConfirmation')
      }
    }
  }
}
