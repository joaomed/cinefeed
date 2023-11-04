import User from 'App/Models/User'
import Post from 'App/Models/Post'

export default class UsersController {
  constructor() {}

  public async create(
    user: User,
    data: {
      title: string
      content: string
      movie: string
      genre: string
      rate: number
    }
  ) {
    const post = new Post()
    post.title = data.title
    post.content = data.content
    post.movie = data.movie
    post.genre = data.genre
    post.rate = data.rate
    post.userId = user.id

    await post.save()

    return post
  }
}
