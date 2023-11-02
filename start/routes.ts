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

Route.get('/docs/', async ({ view }) => {
  return 1
})
Route.get('/', async ({ view }) => {
  return view.render('pages/home/solange')
})
// Route.get('/solange/', async ({ view }) => {
//   const data = {}
//   data.alunos = ['João', 'Tati']
//   data.materias = ['Ciencias', 'Matematica']
//   return view.render('index', { users: data.alunos })
// })
// Route.get('/teste/', async ({ view }) => {
//   const data = {}
//   data.alunos = ['João', 'Tati']
//   data.materias = ['Ciencias', 'Matematica']

//   return data
// })
