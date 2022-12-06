import { AccountModel } from '../../../domain/models/account'

export interface LoadAccounByEmailRepository {
  load (email: string): Promise<AccountModel | undefined>
}
