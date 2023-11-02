import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gentilico: string

  @column()
  public nome_pais: string

  @column()
  public nome_pais_int: string

  @column()
  public sigla: string
}
