import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccounByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel | null>
}
