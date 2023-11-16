import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserService from 'App/Services/UserService'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()
    return users
  }

  public async store({ request, response }: HttpContextContract) {
    const email = request.input('email', undefined)
    const password = request.input('password', undefined)
    const name = request.input('name', undefined)
    const lastName = request.input('lastName', undefined)
    const countryId = request.input('countryId', undefined)

    if (!(email && password && name && lastName && countryId)) {
      response.status(400)
      return response
    }

    const userService = new UserService()
    const user = await userService.create({ email, password, name, lastName, countryId })

    return user
  }

  public async update({ request, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const email = request.input('email', undefined)
    const password = request.input('password', undefined)
    const name = request.input('name', undefined)
    const lastName = request.input('lastName', undefined)
    const countryId = request.input('countryId', undefined)

    user.email = email ? email : user.email
    user.password = password ? password : user.password
    user.name = name ? name : user.name
    user.lastName = lastName ? lastName : user.lastName
    user.countryId = countryId ? countryId : user.countryId

    await user.save()

    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return null
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return user
  }

  public async login({ view }: HttpContextContract) {
    return view.render('users/login')
  }
}
