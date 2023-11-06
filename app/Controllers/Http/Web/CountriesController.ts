import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Country from 'App/Models/Country'

export default class CountriesController {
  public async index({ view }: HttpContextContract) {
    const countries = await Country.all()
    return view.render('countries/index', { countries: countries })
  }

  public async show({ params }: HttpContextContract) {
    const country = await Country.findOrFail(params.id)

    return country
  }
}
