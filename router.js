import userController from './src/controllers/user.controller'

const router = ((app) => {
  app.use('/users', userController)

  return app
})

export default router