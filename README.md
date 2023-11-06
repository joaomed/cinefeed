# Cinefeed

Rede Social de filmes desenvolvida na disciplina de Programação Web 2023-2

## Entrega Parcial


Criar uma conta
Login
Editar profile
Criar Post
Listar Post
Detalhar Post

browser-sync start --proxy "127.0.0.1:3333" --files "resources/views/**/*"

USER
  public id: number
  public email: string
  public password: string
  public name: string
  public lastName: string
  public countryId: number
  public createdAt: DateTime
  public updatedAt: DateTime

POST
  public id: number
  public title: string
  public movie: string
  public genre: string
  public rate: number
  public content: string
  public userId: number
  public createdAt: DateTime
  public updatedAt: DateTime
