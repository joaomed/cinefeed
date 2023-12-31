import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/Country'
import User from 'App/Models/User'
import UserService from 'App/Services/UserService'

export default class UsersController {
  // Listar todos os usuários
  public async index({ view }: HttpContextContract) {
    const users = await User.all()
    return view.render('users/index', { users: users })
  }

  // Página de criar (cadastrar) um Usuário
  public async create({ view }: HttpContextContract) {
    const countries = await Country.all()
    return view.render('users/create', { countries: countries })
  }

  // Salvar (ação de cadastrar) um usuário
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

    return response.redirect().toRoute('users.show', { id: user.id })
  }

  // Detalhar um usuário
  public async show({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const country = await Country.findOrFail(user.countryId)
    const countries = await Country.all()

    return view.render('users/show', { user: user, country: country, countries: countries })
  }

  // Página de atualizar (editar) um usuário
  public async update({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return view.render('users/update', { user: user })
  }

  // Atualizar (editar) um usuário
  public async patch({ params, request, response }: HttpContextContract) {
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

    return response.redirect().toRoute('users.show', { id: user.id })
  }

  // Página de Login do usuário
  public async login({ view }: HttpContextContract) {
    return view.render('users/login')
  }
}
