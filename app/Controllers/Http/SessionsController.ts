import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect().toRoute('posts.index')
    } catch {
      return response.redirect().toRoute('sessions.login')
    }
  }
  public async login({ view }: HttpContextContract) {
    return view.render('users/login')
  }
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home.show')
  }
}
