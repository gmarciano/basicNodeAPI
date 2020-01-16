import expressJwt from 'express-jwt'

function jwt() {
  const secret = process.env.SECRET_KEY
  
  return expressJwt({ secret }).unless({
    path: [
      '/users/signIn',
      '/users/signUp'
    ]
  })
}

export default jwt