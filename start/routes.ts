/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('/', async ({ auth, view }: HttpContextContract) => {
  return view.render('home/show')
}).as('home.show')

Route.get('/login', 'SessionsController.login').as('sessions.login')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.logout').as('sessions.logout')

// Route.group(() => {
//   Route.group(() => {
//     Route.get('/', 'PostsController.index')
//     Route.get('/id', 'PostsController.show')
//     Route.delete('/:id', 'PostsController.destroy')
//     Route.patch('/:id', 'PostsController.update')
//     Route.post('/', 'PostsController.store').as('posts.store')
//   }).prefix('/posts')

//   Route.group(() => {
//     Route.get('/', 'UsersController.index')
//     Route.get('/:id', 'UsersController.show')
//     Route.delete('/:id', 'UsersController.destroy')
//     Route.patch('/:id', 'UsersController.update')
//     Route.post('/', 'UsersController.store')
//   }).prefix('/users')
// })
//   .prefix('/api')
//   .namespace('App/Controllers/Http/Api')

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'UsersController.index').as('index') // listar todos usuários
      Route.patch('/:id', 'UsersController.patch').as('patch') // editar usuário
      Route.get('/:id/update', 'UsersController.update').as('update') // listar página de editar usuário
    }).middleware('auth')

    Route.get('/new', 'UsersController.create').as('create') // listar página de cadastro de usuário
    Route.get('/login', 'UsersController.login').as('login') // listar página de login de usuário
    Route.post('/', 'UsersController.store').as('store') // cadastrar usuário
    Route.get('/:id', 'UsersController.show').as('show') // detalhar usuário
  })
    .prefix('/users')
    .as('users')

  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'PostsController.index').as('index') // listar todos posts

      Route.get('/like/:id', 'PostsController.like').as('like') // listar posts curtidos

      Route.get('/new', 'PostsController.create').as('create') // listar página de criar post

      Route.post('/', 'PostsController.store').as('store') // criar post

      Route.patch('/:id', 'PostsController.patch').as('patch') // editar post

      Route.delete('/:id', 'PostsController.delete').as('delete') // deletar post
    }).middleware('auth')

    Route.get('/:id/update', 'PostsController.update').as('update') // listar página de editar post
    Route.get('/:id', 'PostsController.show').as('show') // detalhar post
  })
    .prefix('/posts')
    .as('posts')

  Route.get('/file/:id', 'FilesController.show').as('files.show')
}).namespace('App/Controllers/Http/Web')
