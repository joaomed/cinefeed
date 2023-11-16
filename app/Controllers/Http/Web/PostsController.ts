import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import PostService from 'App/Services/PostService'
import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostsController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    console.log(auth.user!)
    const posts = await Post.query().preload('user').exec()

    return view.render('posts/index', { posts: posts })
  }

  public async create({ auth, view }: HttpContextContract) {
    await auth.use('web').authenticate()
    return view.render('posts/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator)

    //TODO: Pegar o usuario logado
    const user = await User.findOrFail(1)

    const postService = new PostService()
    const post = await postService.create(user, payload)

    return response.redirect().toRoute('posts.show', { id: post.id })
  }

  public async show({ auth, params, view }: HttpContextContract) {
    await auth.use('web').authenticate()

    const post = await Post.findOrFail(params.id)

    await post.load('user')

    return view.render('posts/show', { post: post })
  }

  public async update({}: HttpContextContract) {}

  public async patch({}: HttpContextContract) {}
}
