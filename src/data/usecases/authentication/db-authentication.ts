import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccounByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccounByEmailRepository
  constructor (loadAccountByEmailRepository: LoadAccounByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return ''
  }
}
