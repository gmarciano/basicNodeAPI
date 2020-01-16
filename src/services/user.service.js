import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import db from '../../helpers/db'

const { User } = db

async function signIn(params) {
  const user = await User.findOne({ email: params.email })

  if (user && bcrypt.compareSync(params.senha, user.senha)) {
    const lastLogin = new Date(user.ultimo_login).getTime(),
      timeDiff = (new Date().getTime() - lastLogin) / 60000

    if (timeDiff > 30) {
      const token = jwt.sign({ sub: user._id }, process.env.SECRET_KEY)
      user.token = token
    }

    user.ultimo_login = Date.now()
    user.save()

    const data = {
      id: user._id,
      token: user.token,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login
    }
  
    return data
  }
  
  throw { message: 'Usuário e/ou senha inválidos', status: 401, force: true }
}

async function signUp(params) {
  if (await User.findOne({ email: params.email })) {
    throw { message: 'E-mail já existente', status: 400, force: true }
  }

  const { numero, ddd } = params.telefones

  const user = new User(params)

  const token = jwt.sign({ sub: user._id }, process.env.SECRET_KEY)
  
  user.senha = bcrypt.hashSync(params.senha, 10)
  user.numero = numero
  user.ddd = ddd
  user.token = token
  await user.save()

  const data = {
    id: user._id,
    token: user.token,
    data_criacao: user.data_criacao,
    data_atualizacao: user.data_atualizacao,
    ultimo_login: user.ultimo_login
  }

  return data
}

async function getMyProfile(token, id) {
  const tokenExists = await User.findOne({ token })

  if (! tokenExists) throw { message: 'Não autorizado', status: 403, force: true }

  const user = await User.findById(id).select('-senha')
  
  if (user.token !== token) throw { message: 'Não autorizado', status: 403, force: true }

  const lastLogin = new Date(user.ultimo_login).getTime(),
    timeDiff = (new Date().getTime() - lastLogin) / 60000

  if (timeDiff > 30) throw { message: 'Sessão inválida', status: 403, force: true }

  return user
}

async function find(id) {
  return await User.findById(id).select('-senha')
}

export default {
  signIn,
  signUp,
  getMyProfile,
  find
}