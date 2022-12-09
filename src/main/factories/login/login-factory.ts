import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import env from '../../config/env'

export const makeLoginController = (): Controller => {
  const salt = env.salt
  const secret = env.jwtSecret
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(secret)
  const accountByEmailRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountByEmailRepository, bcryptAdapter, jwtAdapter, accountByEmailRepository)
  return new LoginController(makeLoginValidation(), dbAuthentication)
}
