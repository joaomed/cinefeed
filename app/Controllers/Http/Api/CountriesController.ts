import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Country from 'App/Models/Country'

export default class CountriesController {
  public async index({}: HttpContextContract) {
    const countries = await Country.all()
    return countries
  }

  public async show({ params }: HttpContextContract) {
    const country = await Country.findOrFail(params.id)

    return country
  }
}
