import { LogControllerDecorator } from './log'
import { Controller, httpRequest, httpResponse } from '../../presentation/protocols'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: httpRequest): Promise<any> {
      const httpResponse: httpResponse = {
        body: {
          name: 'any_name'
        },
        statusCode: 200
      }
      return await Promise.resolve(httpResponse)
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut } = makeSut()
    const handleSpy = jest.spyOn(sut, 'handle')
    const httpRequest: httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should call controller handle', async () => {
    const { sut } = makeSut()
    const handleSpy = jest.spyOn(sut, 'handle')
    const httpRequest: httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
