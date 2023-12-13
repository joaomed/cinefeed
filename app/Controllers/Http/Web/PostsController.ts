import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import PostService from 'App/Services/PostService'
import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostsController {
  // Listar todos os Posts
  public async index({ view, auth }: HttpContextContract) {
    const user = await User.findOrFail(1)

    console.log(auth.user!)
    const posts = await Post.query().preload('user').exec()

    return view.render('posts/index', { posts: posts, user: user })
  }

  // Página de criar Post
  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  // Salvar um post
  public async store({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator)

    console.log(payload.cover)

    //TODO: Pegar o usuario logado
    const user = auth.user

    if (user) {
      const postService = new PostService()
      const post = await postService.create(user, payload)

      return response.redirect().toRoute('posts.show', { id: post.id })
    }
  }

  // Detalhar um post
  public async show({ params, view }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.load('user')

    return view.render('posts/show', { post: post })
  }

  // Página de atualizar (editar) um Post
  public async update({ params, view }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    return view.render('posts/update', { post: post })
  }

  // Atualizar (editar) um post
  public async patch({ params, request, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    const title = request.input('title', undefined)
    const content = request.input('content', undefined)
    const movie = request.input('movie', undefined)
    const genre = request.input('genre', undefined)
    const rate = request.input('rate', undefined)

    post.title = title ? title : post.title
    post.content = content ? content : post.content
    post.movie = movie ? movie : post.movie
    post.genre = genre ? genre : post.genre
    post.rate = rate ? rate : post.rate

    await post.save()

    return response.redirect().toRoute('posts.show', { id: post.id })
  }

  // Deletar um post
  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()

    return null
  }

  // Curtir um post
  public async like({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    const user = await User.findOrFail(1)
    const service = new PostService()
    const liked = await service.like(user, post)

    return { id: post.id, liked: liked }
  }

  // Listar favoritos
  public async favorites({ view, auth }: HttpContextContract) {
    const user = auth.user
    const posts = await Post.query().preload('user').exec()
    const favorites = [] as Post[]

    if (user) {
      for (let post of posts) {
        const liked = await post.liked(user)
        if (liked) favorites.push(post)
      }
    }

    return view.render('posts/favorites', { favorites: favorites })
  }
}
