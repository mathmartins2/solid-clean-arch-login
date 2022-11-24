import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const findAccount = await accountCollection.findOne(result.insertedId)
    const account: AccountModel = {
      id: findAccount?._id as unknown as string,
      name: findAccount?.name,
      email: findAccount?.email,
      password: findAccount?.password
    }
    return account
  }
}
