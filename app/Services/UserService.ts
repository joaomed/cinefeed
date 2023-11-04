import User from 'App/Models/User'

export default class UsersController {
  constructor() {}

  public async create(data: {
    email: string
    password: string
    name: string
    lastName: string
    countryId: number
  }) {
    const user = new User()
    user.email = data.email
    user.password = data.password
    user.name = data.name
    user.lastName = data.lastName
    user.countryId = data.countryId

    await user.save()

    return user
  }
}
